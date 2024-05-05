"use client"
import Navbar from '@/components/Navbar'
import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from '@/components/Carousel'
import ExplainNewsStudy from '@/components/ExplainNewsStudy'
import ExplainAllKanji from '@/components/ExplainAllKanji'
import Footer from '@/components/Footer'

const HomePage: React.FC = () => {


  return (
    <main className="flex flex-col min-w-screen min-h-screen">
        <Navbar />

        {/* Hero section */}
        <div className="relative flex min-w-screen h-full">
            <div className="flex h-screen min-w-screen overflow-hidden">
                <img src="https://images.pexels.com/photos/6249464/pexels-photo-6249464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="object-cover w-screen h-[96vh]"/>
            </div>
            <div className="absolute w-[500px]  bg-black rounded-2xl bg-opacity-60 right-[8%] top-[35%] p-20">
                <h2 className="text-white text-[40px] text-center">
                    Learn how to read kanji from Japanese news
                </h2>
                <h3 className="text-white text-[25px] text-center mt-5">
                    <p>日本のニューズで</p>
                    <p>漢字の読む方を学ぶ</p>
                </h3>
                <div className="mt-10 flex w-[100%] justify-center">
                    <button className="flex px-10 py-4 bg-yellow-500 rounded-lg">
                        Get Started {"->"}
                    </button>
                </div>
            </div>
        </div>

        {/* What news they can study */}
        <div className="h-[100vh]">
            <ExplainNewsStudy />
        </div>

        {/* Detects all levels of jlpt kanji */}
        <div className="h-[100vh]">
            <ExplainAllKanji />
        </div>
        <Footer />
    </main>
  )
}

export default HomePage