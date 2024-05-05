"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const variants = {
        initial: {
          clipPath: "circle(1220px at 50px 50px)",
        },
        open:{
            clipPath: "circle(1220px at 50px 50px)",
            transition: {
                type: "spring",
                stiffness: 20, 
            }
        },
        closed: {
            clipPath: "circle(30px at 50px 50px)",
            transition: {
                delay:0.5,
                type:"spring",
                stiffness: 400,
                damping: 40,
            }
        }
    }

    const linkVariants = {
        initial: {
          opacity: 0
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    }

    const linkItemVariants = {
        open: {
            y: 0,
            opacity: 1
        },
        closed: {
            y: 50,
            opacity: 0
        }
    }


    const items = [
        "Home",
        "About",
        "Login",
        "Sign Up"
    ]



    return (
        <motion.div className="w-full h-[100px] fixed flex flex-col items-center justify-center text-black bg-gray-700 bg-opacity-60 " animate={isOpen ? "open" : "closed"}>
          <motion.div className={`fixed top-0 left-0 right-0 bottom-0 w-[300px] z-50 bg-white shadow-2xl`}  variants={variants}>
            {/* Links */}
            <motion.div className="absolute w-full h-full flex flex-col items-center justify-center gap-[20px] text-purple-400" variants={linkVariants}>
              {items.map((item) => (
                <motion.a href={`#${item}`} key={item} variants={linkItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {item}
                </motion.a>
              ))}
            </motion.div>
    
            {/* Toggle Button */}
            <button className="w-[50px] h-[50px] rounded fixed top-[25px] left-[25px] bg-transparent border-none cursor-pointer flex items-center justify-center z-50" onClick={() => setIsOpen(!isOpen)}>
              <svg width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                  strokeWidth="3"
                  stroke="black"
                  strokeLinecap="round"
                  variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5"} }}
                />
                <motion.path
                  strokeWidth="3"
                  stroke="black"
                  strokeLinecap="round"
                  d="M 2 9.423 L 20 9.423"
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 }}}
                />
                <motion.path
                  strokeWidth="3"
                  stroke="black"
                  strokeLinecap="round"
                  variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346"} }}
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      );
}

export default Navbar