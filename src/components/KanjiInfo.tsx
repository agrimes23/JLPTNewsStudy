import React from 'react'


interface KanjiInfoProps {
  kanji: string;
  level: number;
  furigana?: string;
  meaning: string;
  onClose: any;
}

const KanjiInfo: React.FC<KanjiInfoProps> = ({ kanji, level, furigana, meaning, onClose }) => {
  return (
    <div className="border-2 px-4 py-3 rounded-lg absolute bg-white shadow-sm shadow-gray-300">
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
      <div className="pt-4 text-sm">
        <h2 className="text-sm">Add to a deck</h2>
        <select className="border-2 px-5 rounded py-2 mt-2 text-sm">
          <option value="new-deck">Add to new deck</option>
          <option value="existing-deck">existing decks...</option>
        </select>
      </div>
    </div>
  );
};

export default KanjiInfo;