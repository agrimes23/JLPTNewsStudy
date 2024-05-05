"use client"
import Navbar from '@/components/Navbar'
import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from '@/components/Carousel'


const HomePage: React.FC = () => {

    const imageSourceArray = [
        "https://images.pexels.com/photos/6249543/pexels-photo-6249543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/19658331/pexels-photo-19658331/free-photo-of-red-paper-lanterns-in-tokyo-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/406153/pexels-photo-406153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/6249464/pexels-photo-6249464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]


  return (
    <main>
        <Navbar />

        {/* Hero section */}
        <div className="h-screen">
            <div className="">
                {/* Other images to be used */}
                {/* https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                {/* https://images.pexels.com/photos/19658331/pexels-photo-19658331/free-photo-of-red-paper-lanterns-in-tokyo-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                {/* https://images.pexels.com/photos/406153/pexels-photo-406153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                {/* https://images.pexels.com/photos/6249464/pexels-photo-6249464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}

                <img src="https://images.pexels.com/photos/6249543/pexels-photo-6249543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="japanese window" className="w-screen h-[900px] object-cover"/>
            </div>
            <div>
                <h2>

                </h2>
            </div>
        </div>

        {/* Practice Carousel */}
        <h1 className="w-screen bg-purple-400 h-20 text-center">Carousel Practice</h1>
        <div className="w-full max-w-[1200px] h-[500px]">
            <Carousel imageUrls={imageSourceArray}/>
        </div>

        {/* What news they can study */}
        <div className="h-[900px]">

        </div>

        {/* Detects all levels of jlpt kanji */}


        {/*  */}


    </main>
  )
}

export default HomePage