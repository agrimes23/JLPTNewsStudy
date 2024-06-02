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
    <div className="flex flex-col h-screen w-screen items-center bg-[#FFF2D8]">
      <Navbar />


      <div className="flex flex-col justify-center items-center h-full w-full">
        <form className="flex h-[500px] flex-col items-center justify-center bg-white w-[400px] gap-10 rounded border-[1px] border-black" onSubmit={handleSubmit}>
        <h2 className="text-2xl">Login</h2>
          <input
            className="py-2 pl-2 rounded border-2 border-gray"
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Email"
          />
          <input
            className="py-2 pl-2 rounded border-2 border-gray"
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
          />
          <button className="flex justfy-center items-center bg-[#113946] w-[230px] justify-center py-2 rounded text-white" type="submit">Login</button>
          <div className="text-center font-input text-lightGray">
                New to our app? <a className="underline" href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;