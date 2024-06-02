import React from 'react'

const KanjiInfo = () => {
  return (
    <div className="border-2 px-4 py-3 rounded-lg">
      {/* Kanji information part */}
      <div>
        <div className="flex flex-row justify-between">
          <h2 className='text-base font-semibold'>kanji</h2>
          <h4 className='text-sm'>level</h4>
        </div>
        <h3 className="italic text-sm">hiragana</h3>
        <div>
          <h3 className="text-sm">meaning</h3>
        </div>
      </div>
      {/* Add this kanji as a flashcard to a deck */}
      <div className="pt-4 text-sm">
        <h2 className="text-sm">Add to a deck</h2>
        {/* dropdown */}
        <select className="border-2 px-5 rounded py-2 mt-2 text-sm" name="" id="">
          <option value="text-sm">Add to new deck</option>
          <option value="text-sm">existing decks...</option>
        </select>
      </div>

    </div>
  )
}

export default KanjiInfo