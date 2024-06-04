"use client";
import React, { useEffect, useState } from "react";
import { useFlashcardDeck } from "@/context/FlashcardContext";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { getDeckData } from "@/api/flashcardApi";

// TODO: first do just existing decks
// have new kanji info routed to the new flashcard so the user can edit before saving to a deck

interface KanjiProps {
  kanji: string;
  furigana?: string;
  meaning: string;
  setOpenDeckOptions: any;
  onClose: any;
}

interface Deck {
  _id: string;
  title: string;
}

interface AuthContextType {
  user: { _id: string } | null;
  accessToken: string;
}

const NewDeck: React.FC<KanjiProps> = ({
  kanji,
  furigana,
  meaning,
  setOpenDeckOptions,
  onClose,
}) => {
  const { user, accessToken } = useAuth() as AuthContextType;
  const { getDecksList, createFlashcard } = useFlashcardDeck();
  const { userInfo } = useUser();
  const [deckList, setDeckList] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [frontSide, setFrontSide] = useState<string>(kanji);
  const [backSide, setBackSide] = useState<string>(
    `${furigana ? `${furigana} ` : ""}${meaning}`
  );

  const fetchDeckList = async () => {
    try {
      if (userInfo && accessToken) {
        const decks = await getDecksList(userInfo._id, accessToken);
        const decksWithData = await Promise.all(
          decks.map(async (deck: any) => {
            try {
              const deckData = await getDeckData(deck._id, accessToken);
              return { ...deck, ...deckData };
            } catch (error) {
              console.error(
                `Error fetching deck data for deck ID ${deck._id}:`,
                error
              );
              return deck;
            }
          })
        );
        setDeckList(decksWithData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    console.log("heleooo");
    console.log("decks: " + JSON.stringify(deckList));
    fetchDeckList();
  }, [user, accessToken]);

  const handleSaveFlashcard = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDeck) {
      alert("Please select a deck");
      return;
    }

    const flashcard = {
      frontSide,
      backSide,
      jlptLevel: "",
      shouldRetest: true,
    };

    const requestBody: any = {
      flashcards: [flashcard],
    };

    try {
      createFlashcard(selectedDeck, requestBody);
      setFrontSide("");
      setBackSide("");
      setOpenDeckOptions(false);
      onClose();
    } catch (error) {
      console.error("Error creating flashcard:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-300 bg-opacity-70 ">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col w-[50vw] h-[600px] items-center justify-between bg-white rounded-lg">
          <button
            className="relative self-end px-5 py-3 text-2xl text-gray-600"
            onClick={() => {
              setOpenDeckOptions(false);
              onClose();
            }}
          >
            ✖
          </button>
          <div className="flex h-full -mt-6 justify-between flex-col items-center">
            {/* choose which deck to save it to */}
            <div className="flex flex-col my-5">
              <label htmlFor="deckSelect">Select a deck</label>
              <select
                className="border-2 border-gray w-[37vw]"
                id="deckSelect"
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
              >
                <option value="" disabled>
                  Select a deck
                </option>
                {deckList.map((deck) => (
                  <option key={deck._id} value={deck._id}>
                    {deck.title}
                  </option>
                ))}
              </select>
            </div>
            {/* edit flashcard before saving */}

            <form action="" className="flex items-center flex-col">
              <label htmlFor="">Front Side</label>
              {/* kanji */}
              <textarea
                name="front side"
                value={frontSide}
                placeholder="front side"
                className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                maxLength={50}
                onChange={(e) => setFrontSide(e.target.value)}
              />
              <label htmlFor="">Back Side</label>
              {/* furigana (if applicable), meaning */}
              <textarea
                name="back side"
                value={backSide}
                placeholder="back side"
                className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                maxLength={50}
                onChange={(e) => setBackSide(e.target.value)}
              />

              <button
                className="bg-[#113946] text-white w-[30vw] py-3 my-10  rounded"
                onClick={handleSaveFlashcard}
              >
                Save to Deck
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDeck;
