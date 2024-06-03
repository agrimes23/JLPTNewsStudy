import React, { useState } from 'react'
import NewDeck from './NewDeck';
// import { useFlashcardDeck } from '@/context/FlashcardContext';


interface KanjiInfoProps {
  kanji: string;
  level: number;
  furigana?: string;
  meaning: string;
  onClose: any;
}

const KanjiInfo: React.FC<KanjiInfoProps> = ({ kanji, level, furigana, meaning, onClose }) => {
  const [openDeckOptions, setOpenDeckOptions] = useState<any>()
  
  return (
    <div>
    <div className="border-2 px-4 py-3 rounded-lg absolute bg-white shadow-sm shadow-gray-300 w-[200px]">
       <button className="absolute top-0 right-0 px-2 py-1 text-2xl text-gray-600" onClick={onClose}>✖</button>
      <div>
        
          <h2 className='text-base font-semibold'>{kanji}</h2>

        <div>
          {furigana && <h3 className="italic text-sm">{furigana}</h3>}
        </div>
        <div className="flex flex-row justify-between ">
          <h3 className="text-sm w-11/12">{meaning}</h3>
          <h4 className='text-sm '>(N{level})</h4>
        </div>
      </div>
      <button className="w-full bg-[#113946] text-white rounded py-2 mt-10" onClick={() => setOpenDeckOptions(!openDeckOptions)}>Add to a deck</button>
    </div>
    {openDeckOptions ? <NewDeck /> : <></>}
    </div>
  );
};

export default KanjiInfo;