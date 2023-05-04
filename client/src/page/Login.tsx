import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { login } from "../store/Reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  // Send a request to login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(login({ ...result }));
        navigate("/");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className="font-extrabold text-[#222328] text-4xl mt-8 mb-8">
        Login
      </h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            className="border rounded-lg w-full p-3"
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            className="border rounded-lg w-full p-3"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-8 text-gray-600">
        Don't have an account?{" "}
        <Link
          className="text-blue-500 hover:text-blue-700 font-bold"
          to="/register"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
