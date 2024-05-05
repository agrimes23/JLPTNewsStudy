"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const initialInputValue = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  // const [loginUser] = useMutation(LOGIN_USER, {
  //   errorPolicy: "all",
  //   onCompleted: (res: any) => {
  //     console.log("login res: ", res);
  //   },
  //   onError: (error: any) => {
  //     console.error("GraphQL error:", error);
  //   },
  // });

  // const router = useRouter();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("oo submitted: email: ", email + ", Password: " + password);
    try {
      // const { data } = await loginUser({ variables: { input: inputValue } });
      setInputValue(initialInputValue);
      // router.push("/");
    } catch (error) {
      console.log("Login error: " + error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center">
      <Navbar />
      <div className="flex items-center h-screen w-full justify-center">
        <div className="bg-purple-200 pt-16 pb-20 w-4/12 rounded border border-purple-600">
            <h2 className="text-4xl font-semibold mb-16 text-center">Login to JLPT News Study</h2>
          <form onSubmit={handleSubmit}>
            <div className="m-7 flex justify-center items-center ">
              <input
                className="p-3 w-8/12 rounded border border-purple-600"
                type="email"
                name="email"
                value={email}
                placeholder="Please enter your email"
                onChange={handleOnChange}
              />
            </div>

            <div className="m-7 flex justify-center items-center ">
              <input
                className="p-3 w-8/12 rounded border border-purple-600"
                type="password"
                name="password"
                value={password}
                placeholder="Please enter your password"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex justify-center mt-16 mx-7">
                <button className="p-3 w-8/12 rounded bg-blue-700 text-white font-semibold text-lg " type="submit">
                Login
                </button>
            </div>
            <br />
            <br />
            <div className="text-center font-input text-lightGray">
              New to our app?{" "}
              <a className="underline" href="/signup">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
