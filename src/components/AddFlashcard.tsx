import React, {useState} from 'react'
import { useFlashcardDeck } from '@/context/FlashcardContext';
 import { useParams } from 'next/navigation';

const AddFlashcard = () => {
  const [frontSide, setFrontSide] = useState('');
  const [backSide, setBackSide] = useState('');
  const [jlptLevel, setJlptLevel] = useState('');
  const deckId: any = useParams()


  const { createFlashcard } = useFlashcardDeck();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("jlpt level??:  " + JSON.stringify(jlptLevel))
    const flashcard = {
      frontSide,
      backSide,
      jlptLevel,
      shouldRetest: true,
    };

    const requestBody: any = {
      flashcards: [flashcard], // Wrap the flashcard object in a flashcards array
    };

    try {
      await createFlashcard(deckId.id, requestBody);
      setFrontSide('');
      setBackSide('');
      setJlptLevel('')
    } catch (error) {
      console.error('Error creating flashcard:', error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit}>
      
        <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex w-[500px] mb-4">
          <h3 className="w-[50%] text-center text-gray-400">Front</h3>
          <h3 className="w-[50%] text-center text-gray-400">Back</h3>
        </div>
        <div className="flex border-2 w-[500px] h-[250px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-col w-[80vw] md:w-[250px] h-full items-center justify-center border-r-[1px]">
          <textarea
              name="frontSide"
              value={frontSide}
              placeholder="front side"
              className="rounded p-2 h-32 w-72 resize-none text-center"
              maxLength={50}
              onChange={(e) => setFrontSide(e.target.value)}
              required
            />
            <input type="text" placeholder="JLPT Level (eg N1, N2, N3, N4, N5)" value={jlptLevel} className="w-72 py-2 pl-2 mt-5" onChange={(e) => setJlptLevel(e.target.value)} required/>
          </div>
          
          <div className="flex w-[50%] h-full items-center justify-center border-l-[1px]">
            <label htmlFor=""></label>
            <textarea
              name="backSide"
              value={backSide}
              placeholder="back side"
              className="rounded p-2 h-32 w-72 resize-none text-center"
              maxLength={100}
              onChange={(e) => setBackSide(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8 justify-center gap-10">
        <button className="text-red-600">Del</button>
      </div>
      </div>
      <div className="w-full flex justify-center mt-10">
          <button
            className="p-5 bg-blue-500 text-white rounded"
            type="submit"
          >
            Add Flashcard
          </button>
      </div>
      </form>
    </div>
  );
}

export default AddFlashcard