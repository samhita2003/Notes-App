import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function InputField({ fieldName }) {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    fieldName === "name" && (
      
      <div className="border border-gray-200 rounded-sm p-2">
        <input
          name="name"
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }}
          type="text"
          placeholder="Full Name"
          className="outline-none border-none"
        />
      </div>
      
      
      
    ) ||
    fieldName === "mail" && (
      
      <div className="border border-gray-200 rounded-sm p-2">
        <input
          name="mail"
          value={mail}
          onChange={(e)=>{
            setMail(e.target.value)
          }}
          type="email"
          placeholder="Email"
          className="outline-none border-none"
        />
      </div>
      
      
      
    ) ||
    fieldName === "password" && (
      <>
      <div className="relative border border-gray-200 rounded-sm p-2">
  <input
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="outline-none border-none"
  />

  {showPassword ? (
    <FaEye
      className="text-blue-500 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => setShowPassword(false)}
    />
  ) : (
    <FaEyeSlash
      className="text-blue-500 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => setShowPassword(true)}
    />
  )}
</div>
      
      </>
      
    )
  );
}

export default InputField;