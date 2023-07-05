import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Submit form to register a new account
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/v1/auth/register",
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
      } else {
        setError(result.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  // Handle input changes
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
    <div className="flex flex-col justify-start items-center">
      <h1>Register</h1>
      {error.length > 0 && <span className="text-red-600 mb-2">{error}</span>}
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700" type="submit">
            Register
          </button>
        </div>
      </form>
      <p className="mt-8">
        Have an account?{" "}
        <Link className="text-blue-500 hover:opacity-80" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
