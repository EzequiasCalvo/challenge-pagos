import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        { name, email, password }
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          id="text"
          className="bg-[#E8F0FE] w-80"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          id="email"
          className="bg-[#E8F0FE] w-80"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          id="password"
          className="bg-[#E8F0FE] w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>

      <button
        onClick={() => navigate("/login")}
        className="mt-2 text-blue-500 italic"
      >
        Already a user?
      </button>
    </div>
  );
}

export default Register;
