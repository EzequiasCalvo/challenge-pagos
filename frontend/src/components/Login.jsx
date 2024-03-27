import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password }
      );
      login(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        className="flex flex-col bg-white shadow-2xl rounded px-8 pt-8 pb-8 mb-12"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          id="email"
          className="w-80"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          id="password"
          className="w-80"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log in
        </button>
      </form>
      <button
        onClick={() => navigate("/register")}
        className="mt-2 text-blue-500 italic"
      >
        Do you want to register?
      </button>
    </div>
  );
}

export default Login;
