"use client"
import React, { useEffect, useState } from 'react'
import CreateDeck from './CreateDeck'
import AddFlashcard from './AddFlashcard'
import { useFlashcardDeck } from '@/context/FlashcardContext';
import { useAuth } from '@/context/AuthContext'
import { useUser } from "@/context/UserContext"
import { getDeckData } from "@/api/flashcardApi";

// TODO: first do just existing decks
// have new kanji info routed to the new flashcard so the user can edit before saving to a deck

interface Deck {
    _id: string
    title: string
  }

  interface AuthContextType {
    user: { _id: string } | null
    accessToken: string
  }

const NewDeck = () => {
    const { user, accessToken } = useAuth() as AuthContextType
    const { getDecksList } = useFlashcardDeck()
    const { userInfo } = useUser();
    const [deckList, setDeckList] = useState<Deck[]>([])


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
        
        console.log("heleooo")
        console.log("decks: " + JSON.stringify(deckList))
        fetchDeckList()
      }, [user, accessToken])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-300 bg-opacity-70 ">
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col w-[800px] h-[600px] items-center justify-between bg-white rounded-lg">
              <div className="flex flex-col items-center">
                {/* choose which deck to save it to */}
                  <div className="flex flex-col my-5">
                    <label htmlFor="">Select a deck</label>
                      <select className="border-2 border-gray w-[37vw]" name="" id="">
                        {deckList.map((deck, key)=> {
                        return (
                          <option key={key}>{deck.title}</option>
                        )
                      })}
                      </select>
                  </div>
                  {/* edit flashcard before saving */}
                  
                    <form action="" className="flex flex-col">
                        <label htmlFor="">Front Side</label>
                        {/* kanji */}
                        <textarea
                          name="frontSide"
                          // value={frontSide}
                          placeholder="front side"
                          className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                          maxLength={50}
                          // onChange={(e) => setFrontSide(e.target.value)}
                        />
                        <label htmlFor="">Back Side</label>
                        {/* furigana (if applicable), meaning */}
                        <textarea
                          name="frontSide"
                          // value={frontSide}
                          placeholder="front side"
                          className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                          maxLength={50}
                          // onChange={(e) => setFrontSide(e.target.value)}
                        />
                    </form>
                
                </div>
                <button className="bg-[#113946] text-white w-[30vw] py-3 my-10  rounded">Save to Deck</button>
            </div>
        </div>
    </div>
  )
}

export default NewDeck