"use client"
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const initialInputValue = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const router = useRouter()
  const { email, password } = inputValue;
  const { login } = useAuth();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      // Handle successful login
      setInputValue(initialInputValue);
      router.push('/dashboard');
    } catch (error: any) {
      // Handle login error
      console.error("Login error oops: ", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center ">
      <Navbar />
        <h2 className="text-center pt-24 h-2/12">Login</h2>


      <div className="flex flex-col mt-44 items-center h-full w-full">
        <form className="flex h-2/5 flex-col items-center justify-center bg-gray-300 w-80 gap-10 rounded border-[2px] border-black" onSubmit={handleSubmit}>
          <input
            className="py-2 pl-2 rounded"
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Email"
          />
          <input
            className="py-2 pl-2 rounded"
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
          />
          <button className="flex justfy-center items-center bg-purple-400 w-[230px] justify-center py-2 rounded" type="submit">Login</button>
          <div className="text-center font-input text-lightGray">
                New to our app? <a className="underline" href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;