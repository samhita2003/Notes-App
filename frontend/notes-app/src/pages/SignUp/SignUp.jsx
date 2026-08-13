import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { useState } from "react";
import validate from "../../utils/helper";
import axiosInstance from "../../utils/axios";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.mail.value;
    const password = e.target.password.value;

    const isValid = validate({
      name,
      mail: email,
      pwd: password,
    });

    if (name === "") {
      setError("Please enter name");
      return;
    }

    if (email === "") {
      setError("Please enter email");
      return;
    }

    if (password === "") {
      setError("Please enter password");
      return;
    }

    if (!isValid) {
      setError("Invalid name or email or password");
      return;
    }

    setError("");

    try {
      const res = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      if (res.data && res.data.error) {
        setError(res.data.error);
        return;
      }

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-6">

      <div className="border border-gray-200 rounded-md p-5 sm:p-6 flex flex-col w-full max-w-md shadow-sm">

        <h2 className="text-xl sm:text-2xl font-bold">
          Sign Up
        </h2>

        <form
          className="flex flex-col gap-3 items-stretch p-2 sm:p-4"
          onSubmit={handleSignUp}
        >

          <InputField fieldName="name" />

          <InputField fieldName="mail" />

          <InputField fieldName="password" />

          {error && (
            <p className="text-red-500 text-sm wrap-break-word">
              {error}
            </p>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-sm cursor-pointer w-full"
            type="submit"
          >
            Create Account
          </button>

          <div className="flex flex-wrap justify-center gap-2 mt-2 text-sm sm:text-base">

            <p>Already have an account?</p>

            <Link
              to="/"
              className="text-blue-500 hover:underline underline-offset-2"
            >
              Login
            </Link>

          </div>

        </form>
      </div>

    </div>
  );
}

export default SignUp;