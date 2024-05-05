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
        <div className="flex  pb-20 min-w-screen bg-[#1d150d]">
            <div className="flex mx-auto h-screen min-w-screen max-w-[1200px]">
                <Carousel imageUrls={imageSourceArray}/>
            </div>
            <div>
                <h2>

                </h2>
            </div>
        </div>

        {/* Practice Carousel */}



        {/* What news they can study */}
        <div className="h-[900px]">

        </div>

        {/* Detects all levels of jlpt kanji */}


        {/*  */}


    </main>
  )
}

export default HomePage