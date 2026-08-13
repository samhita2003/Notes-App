import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import validate from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

function LogIn() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.mail.value;
    const password = e.target.password.value;

    const isValid = validate({
      mail: email,
      pwd: password,
    });

    if (email === "") {
      setError("Please enter email");
      return;
    }

    if (password === "") {
      setError("Please enter password");
      return;
    }

    if (!isValid) {
      setError("Invalid email or password");
      return;
    }

    setError("");

    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
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
          Login
        </h2>

        <form
          className="flex flex-col gap-3 items-stretch p-2 sm:p-4"
          onSubmit={handleLogin}
        >

          <InputField fieldName="mail" />

          <InputField fieldName="password" />

          {error && (
            <p className="text-red-500 text-sm wrap-break-word">
              {error}
            </p>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-sm cursor-pointer p-2.5 w-full"
            type="submit"
          >
            Login
          </button>

          <div className="flex flex-wrap justify-center gap-2 mt-2 text-sm sm:text-base">

            <p>Don't have an account?</p>

            <Link
              to="/signup"
              className="text-blue-500 hover:underline underline-offset-2"
            >
              Register
            </Link>

          </div>

        </form>
      </div>

    </div>
  );
}

export default LogIn;