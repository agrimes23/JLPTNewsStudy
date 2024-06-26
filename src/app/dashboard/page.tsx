"use client";
import React, { useEffect, useState } from "react";
import { getDeckData, deleteDeck } from "@/api/flashcardApi";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useFlashcardDeck } from "@/context/FlashcardContext";
import CreateDeck from "@/components/CreateDeck";
import EditDeck from "@/components/EditDeck";
import { useRouter } from "next/navigation";
import withAuth from '@/hoc/withAuth';
import KanjiLevelBar from '@/components/KanjiLevelBar'
import Navbar from "@/components/Navbar";

interface DeckInfo {
  _id: any;
  title: string;
  description: string;
  modifiedDate: string;
}

const Dashboard: React.FC = () => {
  const { accessToken, user, logout } = useAuth();
  const { userInfo } = useUser();
  const [userDecks, setUserDecks] = useState<DeckInfo[]>([]);
  const [isCreateDeck, setIsCreateDeck] = useState<boolean>(false);
  const router = useRouter();
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);

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
      <Navbar />
      {/* Navbar on dash page */}
      <div className="flex flex-col justify-center items-center w-[80%] h-[100px] mb-20 mt-52">
        <h1 className="text-[30px] h-full">
          Welcome, {user?.firstName}!
          <span className="text-[10px] bg-blue-300">settings</span>
        </h1>
        <button
          className="mt-3 underline cursor-pointer"
          onClick={() => {
            router.push("/");
            logout()
          }}
        >
          Logout
        </button>

        {/* nav options */}
        <div className="flex items-center w-full justify-center mt-10">
          <button
            className={`px-10 py-2 rounded-lg ${
              isCreateDeck
                ? "bg-red-200 border-red-700"
                : "bg-purple-200 border-purple-700"
            }`}
            onClick={() => setIsCreateDeck((prevState) => !prevState)}
          >
            {isCreateDeck ? "Cancel" : "+ Create New Deck"}
          </button>
        </div>
      </div>

      {/* list of available decks */}
      <div className="flex flex-col w-[100%] h-[100%] items-center gap-14">
        {isCreateDeck && <CreateDeck setIsCreateDeck={setIsCreateDeck} fetchData={fetchData} />}
        {/* Deck Info Card */}
        {userDecks.map((deckInfo: DeckInfo, index: number) => {
          if (editingDeckId === deckInfo._id) {
            return (
              <EditDeck
                key={deckInfo._id}
                deck={deckInfo}
                onClose={() => {
                  setEditingDeckId(null);
                  fetchData();
                }}
              />
            );
          } else {
            return (
              <div
                key={deckInfo._id}
                className="flex flex-col sm:flex-row w-[80vw] sm:w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg hover:bg-yellow-100 hover:border-black cursor-pointer"
                onClick={() => router.push(`/deck/${deckInfo._id}`)}
              >
                <div className="flex flex-col gap-6 self-end w-full text-center sm:text-start sm:w-[200px] ">
                  <h3 className="text-[22px] group-hover:underline">
                    {deckInfo.title}
                  </h3>
                  <p>{deckInfo.description}</p>
                </div>
                <div className="flex flex-col gap-6 self-center mt-5 sm:mt-0 sm:self-end">
                <KanjiLevelBar deckId={deckInfo._id} />
                  <p className="self-end">{deckInfo.modifiedDate}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-6 mt-5 sm:mt-0 justify-around sm:justify-normal sm:self-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to the deck when deleting
                      deleteSelectedDeck(deckInfo._id);
                    }}
                    className="text-red-600 self-end"
                  >
                    delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to the deck when editing
                      setEditingDeckId(deckInfo._id);
                    }}
                    className="text-blue-600 self-end"
                  >
                    edit
                  </button>
                </div>
              </div>
            );
          }
        })}
        
      </div>
    </div>
  );
};

export default withAuth(Dashboard);