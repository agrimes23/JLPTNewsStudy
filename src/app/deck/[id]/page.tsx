"use client"
import React, { useEffect, useState } from 'react'
import { getUserDecks } from '@/api/flashcardApi'
import { useParams } from "next/navigation"
import AddFlashcard from '@/components/AddFlashcard'
import { useFlashcardDeck } from '@/context/FlashcardContext'

// TODO: this is where user can create new flashcards, delete a flashcard, and edit flashcards (in edit mode)

const Deck = () => {

    const [deckInfo, setDeckInfo] = useState<any | undefined>(undefined); // Set initial state to undefined
    const params: any = useParams();
    const { getDeck, deleteFlashcard } = useFlashcardDeck();

    const handleDeleteFlashcard = async (flashcardId: string) => {
        if (deckInfo) {
          await deleteFlashcard(deckInfo.id, flashcardId);
          setDeckInfo((prevDeck: any) => ({
            ...prevDeck,
            flashcards: prevDeck.flashcards.filter((flashcard: any) => flashcard._id !== flashcardId),
          }));
        }
      };
  
    useEffect(() => {
      const fetchDeckInfo = async () => {
        try {
          const deck = await getDeck(params.id);
          console.log("deck:", deck);
          setDeckInfo(deck);
        } catch (error) {
          console.error("Error fetching deck:", error);
        }
      };
  
      fetchDeckInfo();
    }, [params.id, getDeck]);
    
  return (
    <>
        {/* page container */}
        <div className="flex flex-col min-w-screen min-h-screen items-center bg-blue-100">
            {/* Deck Info */}
            <div className="my-28 max-w-[50%]">
                <h2 className="text-[40px]">{deckInfo?.title}</h2>
                <h4 className="text-[20px] mt-6">{deckInfo?.description}</h4>
                <p>{deckInfo?.modifiedDate}</p>
            </div>


            {/* Flascards container*/}
            <div className="flex flex-col w-[80%] items-center gap-28">
                {deckInfo?.flashcards.map((flashcard: any, index: number) => {
                    
                    return (
                        <div key={index} className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                            {flashcard?.frontSide}
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                            {flashcard?.backSide}
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col ml-8 justify-center gap-10">
                        <button className="text-blue-600">Edit</button>
                        <button className="text-red-600" onClick={() => handleDeleteFlashcard(flashcard._id)}>Del</button>
                    </div>
                </div>


                    )
                })}

                <AddFlashcard />

            </div>

            {/* create new flashcard btn */}
            <div className="my-28">
                <button className="py-4 px-8 border-[1px] border-gray-700 rounded-lg"> + Add Flashcard</button>
            </div>
            
            
        </div>
    </>
  )
}

export default Deck