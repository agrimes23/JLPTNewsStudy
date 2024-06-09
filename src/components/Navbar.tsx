"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useNavigation } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext'


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const router: any = useRouter()
    const { setPreviousLocation } = useNavigation();
    const { accessToken } = useAuth()


    const handleLogin = () => {
      setPreviousLocation("/dashboard");
      router.push('/login');
    };

    const handleSignup = () => {
      setPreviousLocation("/dashboard");
      router.push('/signup');
    };
    
    const handleToggle= () => {
        setIsOpen(!isOpen);
    }
  

    return (
      <div className="w-screen h-[100px] fixed flex flex-col items-center justify-center bg-gray-700 bg-opacity-80 z-10">
        <button
          onClick={() => router.push("/")}
          className="absolute flex flex-col px-10 items-center text-center text-white"
        >
          <h1 className="text-3xl">JLPT News Study</h1>
          <h3>日本語能力試験のニューズ勉強</h3>
        </button>
        <div className="flex w-full items-center">
          <div className="gap-5 hidden lg:flex items-center px-10">
            <button
              className="bg-[#FFF2D8] w-[100px] py-2 rounded"
              onClick={() => router.push("/news")}
            >
              News
            </button>
            {accessToken ? (
              <button
                className="bg-[#BCA37F] px-8 py-2 rounded"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  className="bg-[#113946] text-white w-[100px] py-2 rounded"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="bg-yellow-500 w-[100px] py-2 rounded"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div
            className="z-20 flex lg:hidden flex-col cursor-pointer px-5"
            onClick={handleToggle}
          >
            <div
              className={`w-9 h-[2px] bg-white my-0.5 transition-transform duration-400 ${
                isOpen ? "transform translate-y-2 rotate-[-45deg]" : ""
              }`}
            ></div>
            <div
              className={`w-9 h-[2px] bg-white my-1 transition-opacity duration-400 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-9 h-[2px] bg-white my-0.5 transition-transform duration-400 ${
                isOpen ? "transform -translate-y-2 rotate-[45deg]" : ""
              }`}
            ></div>
          </div>
        </div>
        {/* mobile nav open menu */}
        {isOpen ? 
        <div className="fixed flex flex-col justify-center items-center text-lg gap-5 z-10 top-0 left-0 bottom-0 bg-gray-700 w-[250px] sm:w-[400px] text-white ">
          <a className="hover:underline" href="/news">news</a>
          {accessToken ? <a className="hover:underline" href="/dashboard">dashboard</a> : <a className="hover:underline" href="/login">login</a> }
          
        </div>
        
          :
          <></>
      }
      </div>
    );
}

export default Navbar