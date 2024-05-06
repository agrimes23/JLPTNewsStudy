import React from 'react'
import Navbar from '@/components/Navbar'

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-w-screen min-h-screen items-center">
        {/* Navbar on dash page */}
        <div className="flex flex-col justify-center items-center w-[80%] h-[100px] my-20 ">
            <h1 className="text-[30px] h-full">Welcome, Alex!<span className="text-[10px] bg-blue-300">settings</span></h1>
            <h5 className="mt-3 underline">Logout</h5>
            
            {/* nav options */}
            <div className="flex items-center w-full justify-center mt-10">
                <button className="bg-purple-200 border-[1px] border-purple-700 px-10 py-2 rounded-lg">+ Create New Deck</button>
            </div>
        </div>

        {/* list of available decks */}
        <div className="flex flex-col w-[100%] h-[100%] items-center gap-14">
            {/* One deck and info */}
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>

            {/* Duplicates just for current visual. need to put above code in separate component */}
            {/* delete the below divs later */}
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>
            <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                <div className="flex flex-col gap-6 self-end">
                    <h3 className="text-[22px]">Deck Title</h3>
                    <p>deck description</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p>-------jlpt kanji level bar-------</p>
                    <p className="self-end">modified date</p>
                </div>
                <div className="flex flex-col gap-6 self-end">
                    <p className="text-red-600 self-end">delete</p>
                    <p className="text-blue-600 self-end">edit</p>
                </div>
            </div>


        </div>
    </div>
  )
}

export default Dashboard