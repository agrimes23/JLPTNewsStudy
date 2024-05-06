"use client"
import React from 'react'

// TODO: this is where user can create new flashcards, delete a flashcard, and edit flashcards (in edit mode)

const Deck = () => {
  return (
    <>
        {/* page container */}
        <div className="flex flex-col min-w-screen min-h-screen items-center bg-blue-100">
            {/* Deck Info */}
            <div className="my-28 max-w-[50%]">
                <h2 className="text-[40px]">Deck title</h2>
                <h4 className="text-[20px] mt-6">deck description</h4>
                <p>modified by</p>
            </div>


            {/* Flascards container*/}
            <div className="flex flex-col w-[80%] items-center gap-28">
                
                {/* a flashcard */}
                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>


                {/* Delete later. Repeated flashcards. Eventually will become its own component and be mapped on this page */}
                
                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                                涙
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                                なみだ
                                tear
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600">Del</button>
                    </div>
                </div>



            </div>

            {/* create new flashcard btn */}
            <div className="my-28">
                <button className="py-4 px-8 border-[1px] border-gray-700 rounded-lg"> + Create New Flashcard</button>
            </div>
            
            
        </div>
    </>
  )
}

export default Deck