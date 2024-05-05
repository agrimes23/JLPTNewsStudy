import React from 'react'

const ExplainAllKanji = () => {
  return (
    <div className="flex justify-center items-center h-[900px]">
        <div>
            <img className="w-[800px] mr-20 rounded-xl shadow-xl" src="https://images.pexels.com/photos/1498273/pexels-photo-1498273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="learning kanji characters"/>
        </div>
        <div className="flex flex-col bg-[#DCDCD0] ml-20 w-[500px] h-[300px] rounded-lg p-10 text-[20px] items-center shadow-xl gap-6 justify-center">
            <h3>Learn Kanji at your level and add ones you want to study to your own flashcard decks</h3>
            <h3>自分のレベル合わせて漢字を学び、勉強したい漢字を自分のフラッシュカードのデッキを追加できる</h3>
        </div>
    </div>
  )
}

export default ExplainAllKanji