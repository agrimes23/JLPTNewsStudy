"use client"
import Navbar from '@/components/Navbar'
import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from '@/components/Carousel'
import ExplainHomePage from '@/components/ExplainHomePage'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'


const HomePage: React.FC = () => {
    const router: any = useRouter()

  return (
    <main className="flex flex-col min-w-screen min-h-screen">
        <Navbar />

        {/* Hero section */}
        <div>
            <div className="relative flex min-w-screen h-full">
                <div className="flex h-screen min-w-screen overflow-hidden">
                    <img src="https://images.pexels.com/photos/302100/pexels-photo-302100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="object-cover w-screen h-[96vh]"/>
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
                        <button className="flex px-10 py-4 bg-yellow-500 rounded-lg"
                        onClick={() => router.push("/news")}>
                            Check out the news {"->"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center px-10">
                {/* What news they can study */}
                <div className="flex h-[100vh] max-w-[1200px] items-center justify-center">
                    <ExplainHomePage imageUrl="https://images.pexels.com/photos/20705274/pexels-photo-20705274/free-photo-of-hand-holding-newspapers-in-darkness.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" englishText="Study the top headlines in Japan to prepare for the JLPT (Japanese Language Proficiency Test)" japaneseText="日本語能力試験 (JLPT) を準備のために日本のトップニュースを勉強する" orientation="md:flex-row" />
                </div>

                {/* Detects all levels of jlpt kanji */}
                <div className="h-[100vh]">
                    <ExplainHomePage imageUrl="https://images.pexels.com/photos/1498273/pexels-photo-1498273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" englishText='Learn Kanji at your level and add ones you want to study to your own flashcard decks' japaneseText='自分のレベル合わせて漢字を学び、勉強したい漢字を自分のフラッシュカードのデッキを追加できる' orientation='md:flex-row-reverse'/>
                </div>
            </div>
        </div>
        <Footer />
    </main>
  )
}

export default HomePage