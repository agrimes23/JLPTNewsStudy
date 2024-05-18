"use client"
import React, { useEffect, useState } from 'react';
import { getUserDecks, getDeckData } from '@/api/flashcardApi';
import Cookies from 'js-cookie';
import { getUserInfo } from '@/api/userApi';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { useFlashcardDeck } from '@/context/FlashcardContext';

interface DeckInfo {
    title: string;
    description: string;
    modifiedDate: string;
}

interface UserData {
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
}

const Dashboard: React.FC = () => {
    const { accessToken, user } = useAuth()
    const [userDecks, setUserDecks] = useState<DeckInfo[]>([]);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!accessToken || !user?.id) {
              throw new Error('Access token or user info not found');
            }

            fetchData
    
            const id = user.id; // Assuming 'id' is the user ID field in the user info
            const decks = await getUserDecks(id, accessToken);
            
            // Iterate over each deck and fetch deck data
            const decksWithData = await Promise.all(decks.map(async (deck: any) => {
              try {
                const deckData = await getDeckData(deck.id);
                return { ...deck, ...deckData }; // Merge deck data with existing deck info
              } catch (error) {
                console.error(`Error fetching deck data for deck ID ${deck.id}:`, error);
                return deck; // Return original deck info if fetching deck data fails
              }
            }));
    
            setUserDecks(decksWithData);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchData();
      }, [accessToken, user]);

    return (
        <div className="flex flex-col min-w-screen min-h-screen items-center">
            {/* Navbar on dash page */}
            <div className="flex flex-col justify-center items-center w-[80%] h-[100px] my-20 ">
                <h1 className="text-[30px] h-full">Welcome, {userData?.firstName}!<span className="text-[10px] bg-blue-300">settings</span></h1>
                <h5 className="mt-3 underline">Logout</h5>
                
                {/* nav options */}
                <div className="flex items-center w-full justify-center mt-10">
                    <button className="bg-purple-200 border-[1px] border-purple-700 px-10 py-2 rounded-lg">+ Create New Deck</button>
                </div>
            </div>

            {/* list of available decks */}
            <div className="flex flex-col w-[100%] h-[100%] items-center gap-14">
                {/* One deck and info */}
                {userDecks.map((deckInfo: DeckInfo, index: number) => {
                    return (
                        <div key={index} className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 justify-between px-8 shadow-lg">
                            <div className="flex flex-col gap-6 self-end">
                                <h3 className="text-[22px]">{deckInfo.title}</h3>
                                <p>{deckInfo.description}</p>
                            </div>
                            <div className="flex flex-col gap-6 self-end">
                                <p>-------jlpt kanji level bar-------</p>
                                <p className="self-end">{deckInfo.modifiedDate}</p>
                            </div>
                            <div className="flex flex-col gap-6 self-end">
                                <p className="text-red-600 self-end">delete</p>
                                <p className="text-blue-600 self-end">edit</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;