"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

const initialInputValue = {
    name: "",
    email: "",
    password: "",
  };

const Signup: React.FC = () => {
    // const [registerUser] = useMutation(REGISTER_USER, {
    //     errorPolicy: "all",
    //     onCompleted: (res: any) => {   
    //       console.log("registration res: ", res)
    //     },
    //     onError: (error: any) => {
    //       console.error("GraphQL error:", error);
    //     },
    // });
    // const router = useRouter()
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: "",
        });

    const { name, email, password } = inputValue;

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("oo submitted: email: ", email + ", Password: " + password)
        try {
            // const { data } = await registerUser({ variables: { input: inputValue } });
            setInputValue(initialInputValue)
            // router.push('/')
        } catch (error) {
            console.log("Registration error: " + error)
        }
    }

    return (
        
        <div className="flex flex-col min-h-screen min-w-screen items-center">
            {/* <Navbar/> */}
            <div className="flex items-center h-screen">

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-10">

                    <input className=""
                        type="name"
                        name="name"
                        value={name}
                        placeholder="Please enter your name"
                        onChange={handleOnChange}
                    />
                    <input className=""
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Please enter your email"
                        onChange={handleOnChange}
                    />

                    <input className=""
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Please enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <button className="" type="submit">Sign Up</button><br /><br />
                <div className="text-center font-input text-lightGray">
                New to our app? <a className="underline" href="/login">Login</a>
                </div>
            </form>
            </div>
        </div>
    );
    };

export default Signup;