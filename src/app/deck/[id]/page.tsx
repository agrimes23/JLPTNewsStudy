"use client";
import React, { useEffect, useState } from "react";
import { getUserDecks } from "@/api/flashcardApi";
import { useParams } from "next/navigation";
import AddFlashcard from "@/components/AddFlashcard";
import { useFlashcardDeck } from "@/context/FlashcardContext";
import withAuth from "@/hoc/withAuth";
import Navbar from "@/components/Navbar";

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
        flashcards: prevDeck.flashcards.filter(
          (flashcard: any) => flashcard._id !== flashcardId
        ),
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
        setDeckInfo(deck);
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
        <div className="mb-20 mt-52 max-w-[50%]">
          <h2 className="text-[40px]">{deckInfo?.title}</h2>
          <h4 className="text-[20px] mt-6">{deckInfo?.description}</h4>
          <p>{deckInfo?.modifiedDate}</p>
        </div>
        <div className="w-full flex items-center justify-center mb-20">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`  py-2 ${isEditMode ? "w-[120px] bg-transparent text-black border-2 border-red-700" : "w-[150px] bg-yellow-600 text-white"}  rounded`}
          >
            {isEditMode ? "Cancel Edit" : "Edit Flashcards"}
          </button>
          {isEditMode && (
            <button
              onClick={handleSaveFlashcards}
              className="py-2 w-[120px] bg-green-600 text-white rounded ml-4"
            >
              Save All
            </button>
          )}
        </div>
        {/* Flascards container*/}
        <div className="flex flex-col w-full md:w-[900px] items-center gap-28 mb-32">
          {deckInfo?.flashcards?.map((flashcard: any, index: number) => {
            const editedFlashcard = editedFlashcards.find(
              (fc: any) => fc._id === flashcard._id
            );
            return (
              <div key={index} className="flex flex-col md:flex-row w-full justify-center items-center bg-[#080b3a54] sm:bg-transparent">
                <div className="flex flex-col">
                  <div className="flex lg:w-[700px] md:w-[500px] mb-4">
                    <h3 className="w-[50%] hidden sm:flex text-center justify-center text-gray-400">Front</h3>
                    <h3 className="w-[50%] hidden sm:flex text-center justify-center text-gray-400">Back</h3>
                  </div>

                  {/* flashcards */}
                  <div className="flex flex-col sm:flex-row sm:border-2 w-[80vw] lg:w-[700px] sm:w-[500px] h-[500px] lg:h-[350px] justify-center items-center sm:h-[250px] rounded-lg sm:shadow-lg">
                  <h3 className="w-[80vw] flex sm:hidden text-center justify-center text-black">Front</h3>
                    <div className="flex w-[80vw] lg:w-[350px] md:w-[250px] h-full items-center justify-center border-[1px] sm:border-none sm:border-r-[1px] bg-white">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={editedFlashcard?.frontSide || ""}
                          onChange={(e) =>
                            handleEditFlashcard(
                              flashcard._id,
                              "frontSide",
                              e.target.value
                            )
                          }
                          className="w-full h-full text-center"
                        />
                      ) : (
                        flashcard?.frontSide
                      )}
                    </div>
                    <h3 className="mt-5 w-[80vw] flex sm:hidden text-center justify-center text-black">Back</h3>
                    <div className="flex w-[80vw] lg:w-[350px] md:w-[250px] h-full items-center justify-center border-t-[1px] sm:border-l-[1px] sm:border-t-none bg-white">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={editedFlashcard?.backSide || ""}
                          onChange={(e) =>
                            handleEditFlashcard(
                              flashcard._id,
                              "backSide",
                              e.target.value
                            )
                          }
                          className="w-full h-full text-center"
                        />
                      ) : (
                        flashcard?.backSide
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex sm:ml-10 justify-center gap-10">
                  <button
                    className="sm:text-red-600 sm:bg-transparent sm:w-fit w-[100px] text-black bg-red-600 my-5 sm:my-0 rounded px-2 py-2"
                    onClick={() => handleDeleteFlashcard(flashcard._id)}
                  >
                    Del
                  </button>
                </div>
              </div>
            );
          })}

          <AddFlashcard />
        </div>
      </div>
    </>
  );
};

export default withAuth(Deck);
