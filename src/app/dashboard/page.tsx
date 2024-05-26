"use client";
import React, { useEffect, useState } from "react";
import { getDeckData, deleteDeck } from "@/api/flashcardApi";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useFlashcardDeck } from "@/context/FlashcardContext";
import CreateDeck from "@/components/CreateDeck";
import { useRouter } from "next/navigation";
import withAuth from '@/hoc/withAuth';

interface DeckInfo {
  _id: any;
  title: string;
  description: string;
  modifiedDate: string;
}

const Dashboard: React.FC = () => {
  const { accessToken, user } = useAuth();
  const { userInfo } = useUser();
  const [userDecks, setUserDecks] = useState<DeckInfo[]>([]);
  const [isCreateDeck, setIsCreateDeck] = useState<boolean>(false);
  const router = useRouter();
  const { getDecksList } = useFlashcardDeck();

  const fetchData = async () => {
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
        setUserDecks(decksWithData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteSelectedDeck = async (deckId: any) => {
    try {
      await deleteDeck(deckId, accessToken);
      fetchData();
    } catch (error) {
      console.error("Error deleting deck data:", error);
    }
  };

  useEffect(() => {
    if (accessToken && user) {
      fetchData();
    }
  }, [accessToken, user]); // Only run when accessToken or user changes

  return (
    <div className="flex flex-col min-w-screen min-h-screen items-center mb-20">
      {/* Navbar on dash page */}
      <div className="flex flex-col justify-center items-center w-[80%] h-[100px] my-20 ">
        <h1 className="text-[30px] h-full">
          Welcome, {user?.firstName}!
          <span className="text-[10px] bg-blue-300">settings</span>
        </h1>
        <h5 className="mt-3 underline cursor-pointer" onClick={() => router.push('/logout')}>Logout</h5>

        {/* nav options */}
        <div className="flex items-center w-full justify-center mt-10">
          <button
            className={`px-10 py-2 rounded-lg ${isCreateDeck ? 'bg-red-200 border-red-700' : 'bg-purple-200 border-purple-700'}`}
            onClick={() => setIsCreateDeck((prevState) => !prevState)}
          >
            {isCreateDeck ? "Cancel" : "+ Create New Deck"}
          </button>
        </div>
      </div>

      {/* list of available decks */}
      <div className="flex flex-col w-[100%] h-[100%] items-center gap-14">
        {/* Deck Info Card */}
        {userDecks.map((deckInfo: DeckInfo, index: number) => {
          return (
            <div
              key={index}
              className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg hover:bg-yellow-100 hover:border-black cursor-pointer" onClick={() => router.push(`/deck/${deckInfo._id}`)}
            >
              <div className="flex flex-col gap-6 self-end ">
                <h3 className="text-[22px] group-hover:underline">{deckInfo.title}</h3>
                <p>{deckInfo.description}</p>
              </div>
              <div className="flex flex-col gap-6 self-end">
                <p>-------jlpt kanji level bar-------</p>
                <p className="self-end">{deckInfo.modifiedDate}</p>
              </div>
              <div className="flex flex-col gap-6 self-end">
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); // Prevent navigating to the deck when deleting
                    deleteSelectedDeck(deckInfo._id);
                  }}
                  className="text-red-600 self-end"
                >
                  delete
                </button>
                <button className="text-blue-600 self-end">edit</button>
              </div>
            </div>
          );
        })}
        {isCreateDeck && <CreateDeck />}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);