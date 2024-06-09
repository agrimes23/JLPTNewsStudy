"use client";
import React, { useEffect, useState } from "react";
import { useFlashcardDeck } from "@/context/FlashcardContext";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { getDeckData } from "@/api/flashcardApi";
import NewsAddFlashcard from "./NewsAddFlashcard";

// TODO: first do just existing decks
// have new kanji info routed to the new flashcard so the user can edit before saving to a deck

interface KanjiProps {
  kanji: string;
  furigana?: string;
  meaning: string;
  setOpenDeckOptions: any;
  jlptLevel: string;
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
  jlptLevel,
  onClose,
}) => {
  const { user, accessToken } = useAuth() as AuthContextType;
  const { getDecksList, createDeck } = useFlashcardDeck();
  const { userInfo } = useUser();
  const [deckList, setDeckList] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [isNewDeck, setIsNewDeck] = useState(false);
  const [isEditFlashcard, setIsEditFlashcard] = useState(false)

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
    console.log("jlpt level: " + JSON.stringify(jlptLevel));
    console.log("decks: " + JSON.stringify(deckList));
    fetchDeckList();
  }, [user, accessToken]);

  const [deck, setDeck] = useState<any>({ title: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeck((prevDeck: any) => ({ ...prevDeck, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await createDeck(deck);
      fetchDeckList()
      console.log("response from create deck:", response);
      setSelectedDeck(response._id); // set the new deck ID as selected
      setIsEditFlashcard(true);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div className="z-30 fixed top-0 left-0 w-screen h-screen bg-gray-300 bg-opacity-70 ">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col w-[80vw] lg:w-[800px]  h-[600px] items-center justify-between bg-white rounded-lg">
          <button
            className="relative self-end px-5 py-3 text-2xl text-gray-600"
            onClick={() => {
              setOpenDeckOptions(false);
              onClose();
            }}
          >
            ✖
          </button>
          {isEditFlashcard ?

          <></>
          :
          <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:justify-around">
            <div
              className={`cursor-pointer border-b-2 ${
                isNewDeck ? 'border-transparent' : 'border-yellow-400 font-semibold'
              } py-3 w-[200px] text-center`}
              onClick={() => setIsNewDeck(false)}
            >
              Existing Deck
            </div>
            <div
              className={`cursor-pointer mt-8 sm:mt-0 border-b-2 ${
                isNewDeck ? 'border-green-400 font-semibold' : 'border-transparent'
              } py-3 w-[200px] text-center`}
              onClick={() => setIsNewDeck(true)}
            >
              New Deck
            </div>
          </div>
}
          <div className="flex w-full h-full mt-8 flex-col items-center">
            {/* choose which deck to save it to */}
            {isEditFlashcard ? (
              <NewsAddFlashcard
                kanji={kanji}
                furigana={furigana}
                meaning={meaning}
                onClose={onClose}
                jlptLevel={jlptLevel}
                selectedDeck={selectedDeck}
                setOpenDeckOptions={setOpenDeckOptions}
              />
            ) :
            isNewDeck ? (
              <form onSubmit={handleSubmit} className="flex flex-col w-[60vw] md:w-[350px] h-full gap-4 md:gap-8">
                <div className="flex flex-col">
                  <label className="text-[16px] md:text-[18px] w-[32]">title</label>
                  <input
                    className="border border-black py-1 pl-2 rounded mt-4"
                    type="text"
                    name="title"
                    value={deck.title}
                    placeholder="deck title"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[16px] md:text-[18px] w-[32]">description</label>
                  <input
                    className="border border-black py-1 pl-2 rounded mt-4"
                    type="text"
                    name="description"
                    value={deck.description}
                    placeholder="deck description"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col justify-center h-full">
                  <button className="bg-blue-800 text-white py-2 rounded" type="submit">Continue</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col h-full my-5">
                <label htmlFor="deckSelect">Select a deck</label>
                <select
                  className="border-2 border-gray w-[60vw] md:w-[400px]"
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
                <div className="flex flex-col h-full justify-center">
                  <button onClick={() => setIsEditFlashcard(true)} className="bg-[#113946] text-white py-2 rounded w-">Continue</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDeck;
