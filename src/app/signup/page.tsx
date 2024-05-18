"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { register } from '@/api/authentication';
import Navbar from '@/components/Navbar';

const initialInputValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

const Signup: React.FC = () => {
    const [inputValue, setInputValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        });

    const { firstName, lastName, email, password } = inputValue;

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

            register(inputValue.firstName, inputValue.lastName, inputValue.email, inputValue.password)
            .then(responseData => {
                setInputValue(initialInputValue);
            })
            setInputValue(initialInputValue)

        } catch (error) {
            console.log("Registration error: " + error)
        }
    }

    return (
        
        <div className="flex flex-col min-h-screen min-w-screen items-center">
            <Navbar/>
            <div className="flex items-center h-screen">

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-10">

                    <input className=""
                        type="name"
                        name="firstName"
                        value={firstName}
                        placeholder="Please enter your first name"
                        onChange={handleOnChange}
                    />
                    <input className=""
                        type="name"
                        name="lastName"
                        value={lastName}
                        placeholder="Please enter your last name"
                        onChange={handleOnChange}
                    />
                    <input className=""
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Please enter your email"
                        onChange={handleOnChange}
                        required
                    />
                    {/* for email error */}
                    <div className=""></div>

                    <input className=""
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Please enter your password"
                        onChange={handleOnChange}
                        required
                    />
                    {/* for password error */}
                    <div className=""></div>
                </div>
                <button className="" type="submit">Sign Up</button><br /><br />
                <div className="text-center font-input text-lightGray">
                Already have an account? <a className="underline" href="/login">Login</a>
                </div>
            </form>
            </div>
        </div>
    );
    };

export default Signup;