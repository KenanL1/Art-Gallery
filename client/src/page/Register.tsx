import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            username: username,
            password: password,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        navigate("/login");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-extrabold text-[#222328] text-4xl text-center mt-8 mb-8">
        Register
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            className="w-full border rounded-lg p-3"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            className="w-full border rounded-lg p-3"
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            className="w-full border rounded-lg p-3"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <button
            className="block mx-auto bg-blue-500 text-white py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p>
        Have an account?{" "}
        <Link className="text-blue-500" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
