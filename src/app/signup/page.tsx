"use client"
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { register } from '@/api/authentication';
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useNavigation } from '@/context/NavigationContext';



const initialInputValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

const Signup: React.FC = () => {
    const { user, login, accessToken } = useAuth();
    const router = useRouter()

    const [inputValue, setInputValue] = useState(initialInputValue);
    const { previousLocation } = useNavigation();
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

        try {

            await register(inputValue.firstName, inputValue.lastName, inputValue.email, inputValue.password)
            setInputValue(initialInputValue)

            await login(email, password);
            router.push('/dashboard');

        } catch (error) {
            console.error("Registration error: " + error)
        }
    }

    useEffect(() => {
        console.log("previous location: " + JSON.stringify(previousLocation))
        if (accessToken && (!previousLocation || previousLocation === '/')) {
          router.push('/dashboard');
        }
      }, [previousLocation, router]);
    return (
        
        <div className="flex flex-col h-screen w-screen items-center bg-[#FFF2D8]">
            <Navbar/>
            <div className="flex flex-col justify-center items-center h-full w-full">

            <form className="flex h-[500px] flex-col items-center bg-white w-[400px] rounded border-[1px] border-black shadow-xl" onSubmit={handleSubmit}>

                <h2 className="text-2xl my-10">Sign Up</h2>
                    <div className="flex flex-col items-center justify-center gap-6">
                    <input className="py-2 pl-2 rounded border-2 border-gray"
                        type="name"
                        name="firstName"
                        value={firstName}
                        placeholder="First Name"
                        onChange={handleOnChange}
                    />
                    <input className="py-2 pl-2 rounded border-2 border-gray"
                        type="name"
                        name="lastName"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={handleOnChange}
                    />
                    <input className="py-2 pl-2 rounded border-2 border-gray"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={handleOnChange}
                        required
                    />
                    {/* for email error */}
                    {/* <div className=""></div> */}

                    <input className="py-2 pl-2 rounded border-2 border-gray"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleOnChange}
                        required
                    />
                    {/* for password error */}
                    {/* <div className=""></div> */}
                    
                <button className="flex justfy-center items-center bg-[#113946] w-[230px] justify-center py-2 rounded text-white" type="submit">Sign Up</button>
                </div>
                
                <div className="flex items-center mt-10">
                <h4 className="font-input text-lightGray">Already have an account?</h4>
                <a className="underline flex pl-2" href="/login">Login</a>
                </div>
            </form>
            </div>
        </div>
    );
    };

export default Signup;