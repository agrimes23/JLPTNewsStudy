"use client"
import React, { useEffect, useState } from 'react'
import { getUserDecks } from '@/api/flashcardApi'
import { useParams } from "next/navigation"
import AddFlashcard from '@/components/AddFlashcard'
import { useFlashcardDeck } from '@/context/FlashcardContext'
import withAuth from '@/hoc/withAuth';
import Navbar from '@/components/Navbar'

// TODO: this is where user can create new flashcards, delete a flashcard, and edit flashcards (in edit mode)

const Deck = () => {

    const [deckInfo, setDeckInfo] = useState<any | undefined>(undefined);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editedFlashcards, setEditedFlashcards] = useState<any[]>([]);
    const params: any = useParams();
    const { getDeck, deleteFlashcard, editFlashcard } = useFlashcardDeck();

    const handleDeleteFlashcard = (flashcardId: string) => {
        if (deckInfo) {
          deleteFlashcard(deckInfo._id, flashcardId);
          setDeckInfo((prevDeck: any) => ({
            ...prevDeck,
            flashcards: prevDeck.flashcards.filter((flashcard: any) => flashcard._id !== flashcardId),
          }));
        }
      };
    
    const handleEditFlashcard = (
      flashcardId: string,
      field: string,
      value: string
    ) => {
      setEditedFlashcards((prevEditedFlashcards) =>
        prevEditedFlashcards.map((flashcard: any) =>
          flashcard._id === flashcardId
            ? { ...flashcard, [field]: value }
            : flashcard
        )
      );
    };


    const handleSaveFlashcards = async () => {
      try {
        for (const flashcard of editedFlashcards) {
          editFlashcard(deckInfo._id, flashcard._id, flashcard);
        }
        // Re-fetch the deck to update the state with the latest data
        const updatedDeck = await getDeck(params.id);
        setDeckInfo(updatedDeck);
        setIsEditMode(false);
      } catch (error) {
        console.error("Error saving flashcards:", error);
      }
    };
  
    useEffect(() => {
      const fetchDeckInfo = async () => {
        try {
          const deck = await getDeck(params.id);
          setDeckInfo(deck)
          setEditedFlashcards(deck?.flashcards || []);
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

          <Navbar />
            {/* Deck Info */}
            <div className="mb-28 mt-52 max-w-[50%]">
                <h2 className="text-[40px]">{deckInfo?.title}</h2>
                <h4 className="text-[20px] mt-6">{deckInfo?.description}</h4>
                <p>{deckInfo?.modifiedDate}</p>
            </div>
            <button onClick={() => setIsEditMode(!isEditMode)} className="py-2 px-4 bg-yellow-600 text-white rounded">
            {isEditMode ? 'Cancel Edit' : 'Edit Flashcards'}
          </button>
          {isEditMode && (
            <button onClick={handleSaveFlashcards} className="py-2 px-4 bg-green-600 text-white rounded ml-4">
              Save All
            </button>
          )}
            {/* Flascards container*/}
            <div className="flex flex-col w-[80%] items-center gap-28 mb-32">
                {deckInfo?.flashcards?.map((flashcard: any, index: number) => {
                    const editedFlashcard = editedFlashcards.find((fc: any) => fc._id === flashcard._id);
                    return (
                        <div key={index} className="flex w-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex w-[800px] mb-4">
                            <h3 className="w-[50%] text-center text-gray-400">Front</h3>
                            <h3 className="w-[50%] text-center text-gray-400">Back</h3>
                        </div>
                        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
                            <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedFlashcard?.frontSide || ""}
                                onChange={(e) => handleEditFlashcard(flashcard._id, "frontSide", e.target.value)}
                                className="w-full h-full text-center"
                              />
                            ) : (
                              flashcard?.frontSide
                            )}
                            </div>
                            <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedFlashcard?.backSide || ""}
                                onChange={(e) => handleEditFlashcard(flashcard._id, "backSide", e.target.value)}
                                className="w-full h-full text-center"
                              />
                            ) : (
                              flashcard?.backSide
                            )}
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
            {/* <div className="my-28">
                <button className="py-4 px-8 border-[1px] border-gray-700 rounded-lg"> + Add Flashcard</button>
            </div>
             */}
            
        </div>
    </>
  )
}

export default withAuth(Deck)