import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-row bg-[#9C8A6B] w-[99.1vw] p-24 justify-around items-center">
        {/* Logo */}
        <div className="text-[30px]">
            <h5>JLPT News Study</h5>
        </div>
        <div className="flex gap-24">
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