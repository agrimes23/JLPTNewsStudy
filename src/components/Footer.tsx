import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-[#9C8A6B] w-[99.1vw] p-24 justify-around items-center">
        {/* Logo */}
        <div className="flex text-[30px] h-full text-center items-center lg:text-start ">
            <h5>JLPT News Study</h5>
        </div>
        <div className="flex flex-col text-center lg:text-start mt-14 lg:mt-0 gap-5 lg:flex-row lg:gap-24">
            {/* Sign up */}
            <div className="">
                <h5><a href="#">Sign Up</a></h5>
            </div>
            {/* About */}
            <div className="">
                <h5><a href="#">About</a></h5>
            </div>
            {/* Github link for this code*/}
            <div className="">
                <h5><a href="#">Github Code</a></h5>
            </div>  
        </div>
    </div>
  )
}

export default Footer