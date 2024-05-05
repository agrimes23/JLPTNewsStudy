import React from 'react'
import Navbar from '@/components/Navbar'

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-w-screen min-h-screen">
        {/* Navbar when logged in */}
        <div className="fixed flex-col flex h-screen w-[300px] border-r-[0.5px] shadow-2xl pl-10 pt-24">
            <div className="mb-24">
                <h3 className="text-[23px]">Hi, Alex!</h3>
            </div>

            {/* Account Options */}
            <div className="flex flex-col gap-10">
                {/* Account security (change password, account info) */}
                <h4>Account Settings</h4>
                {/* Your Decks */}
                <h4>View Your Decks</h4>
                {/* Create a new Deck */}
                <h4>Create a new deck</h4>
            </div>
            {/* Logout */}
            <div className="flex flex-col h-full justify-end mb-14">
                <h4 className="text-[18px] underline">Logout</h4>
            </div>
        </div>

        {/* Rest of the page */}
        <div>
            
        </div>
        
    </div>
  )
}

export default Dashboard