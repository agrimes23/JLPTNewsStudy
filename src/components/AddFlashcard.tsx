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
    <div className="flex w-full justify-center mr-20">
      <form onSubmit={handleSubmit}>
      
        <div className="flex flex-col md:flex-row w-full justify-center items-center">
      <div className="flex flex-col">
        <div className="flex sm:w-[700px] mb-4">
          <h3 className="w-[50%] hidden sm:flex text-center justify-center text-gray-400">Front</h3>
          <h3 className="w-[50%] hidden sm:flex text-center justify-center text-gray-400">Back</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:border-2 w-[80vw] lg:w-[700px] sm:w-[500px] h-[500px] lg:h-[350px] justify-center items-center sm:h-[250px] rounded-lg sm:shadow-lg">
          <h3 className="w-[80vw] flex sm:hidden text-center justify-center text-black">Front</h3>
          <div className="flex flex-col w-[80vw] lg:w-[350px] md:w-[250px] items-center justify-center border-[1px] sm:border-none sm:border-r-[1px] bg-white h-full">
          <textarea
              name="frontSide"
              value={frontSide}
              placeholder="front side"
              className="rounded p-2 w-full resize-none text-center"
              maxLength={50}
              onChange={(e) => setFrontSide(e.target.value)}
              required
            />
            <input type="text" placeholder="JLPT Level (eg N1, N2, N3, N4, N5)" value={jlptLevel} className="w-full py-2 pl-2 mt-5" onChange={(e) => setJlptLevel(e.target.value)} required/>
          </div>
          <h3 className="mt-5 w-[80vw] flex sm:hidden text-center justify-center text-black">Back</h3>
          <div className="flex w-[80vw] lg:w-[350px] md:w-[250px] h-full items-center justify-center border-t-[1px] sm:border-l-[1px] sm:border-t-none bg-white">
            <label htmlFor=""></label>
            <textarea
              name="backSide"
              value={backSide}
              placeholder="back side"
              className="rounded p-2 w-full resize-none text-center"
              maxLength={100}
              onChange={(e) => setBackSide(e.target.value)}
            />
          </div>
        </div>
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