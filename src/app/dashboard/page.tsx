"use client"
import React, { useEffect, useState } from 'react'
// import Navbar from '@/components/Navbar'
import { getUserDecks } from '@/api/flashcardApi'
import Cookies from 'js-cookie';

interface UserData {
    user: string
}

const Dashboard: React.FC = () => {
    const [userDecks, setUserDecks] = useState([]);
    
    useEffect(() => {
        const token = Cookies.get('jwtToken');
    
        // Check if token exists
        if (!token) {
            console.error('Token not found');
            return; // Exit early if token is missing
        }
    
        // Retrieve user data from local storage
        const userDataId = localStorage.getItem('userData');


        // Check if user data exists
        if (!userDataId) {
            console.error('User data not found');
            return; // Exit early if user data is missing
        }
    
        // Parse user data string into a UserData object
        const userData: UserData = JSON.parse(userDataId);
    
        // Now you can use userData.user as a string
        console.log("userData: " + JSON.stringify(userData.user));
    
        // Make API call using user data and token
        getUserDecks(userData.user, token)
            .then((response: any) => {
                console.log("response: " + JSON.stringify(response));
                setUserDecks(response)
            })
            .catch((error: any) => {
                console.error("Error fetching user decks:", error);
            });
    }, []);



  return (
    <div className="flex flex-col min-w-screen min-h-screen items-center">
        {/* Navbar on dash page */}
        <div className="flex flex-col justify-center items-center w-[80%] h-[100px] my-20 ">
            <h1 className="text-[30px] h-full">Welcome, Alex!<span className="text-[10px] bg-blue-300">settings</span></h1>
            <h5 className="mt-3 underline">Logout</h5>
            
            {/* nav options */}
            <div className="flex items-center w-full justify-center mt-10">
                <button className="bg-purple-200 border-[1px] border-purple-700 px-10 py-2 rounded-lg">+ Create New Deck</button>
            </div>
        </div>

        {/* list of available decks */}
        <div className="flex flex-col w-[100%] h-[100%] items-center gap-14">
            {/* One deck and info */}

            {userDecks.map((deckInfo: any, index: number) => {
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
                )
            })

            }

            

            

        </div>
    </div>
  )
}

export default Dashboard