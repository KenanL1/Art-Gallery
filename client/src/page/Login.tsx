import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { login } from "../store/Reducers/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
