"use client"
import React from 'react'


interface ExplainHomePageProps {
  imageUrl: string;
  englishText: string;
  japaneseText: string;
  orientation: string;
}

const ExplainHomePage: React.FC<ExplainHomePageProps> = ({imageUrl, englishText, japaneseText, orientation}) => {
  
  
  return (
    <div className={`flex flex-col max-w-[1200px] justify-center items-center h-[900px] ${orientation}`}>
        <div className='flex w-full items-center justify-center'>
            <img className="max-w-[600px] w-[80vw] mx-10 md:mr-20 rounded-xl shadow-xl" src={imageUrl}/>
        </div>
        <div className="flex flex-col bg-[#DCDCD0] m-0 md:ml-20 max-w-[500px] w-[80vw] min-h-[200px] rounded-lg p-5 md:p-10 md:text-[20px] items-center shadow-xl gap-6 justify-center mt-20 md:mt-0">
            <h3>{englishText}</h3>
            <h3>{japaneseText}</h3>
        </div>
    </div>
  )
}

export default ExplainHomePage