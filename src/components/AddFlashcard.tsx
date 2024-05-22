import React, {useState} from 'react'
import { useFlashcardDeck } from '@/context/FlashcardContext';
 import { useParams } from 'next/navigation';

const AddFlashcard = () => {
  const [frontSide, setFrontSide] = useState('');
  const [backSide, setBackSide] = useState('');
  const deckId: any = useParams()


  const { createFlashcard } = useFlashcardDeck();


  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new flashcard object
    const flashcard: any = {
      frontSide: frontSide,
      backSide: backSide,
      jlptLevel: '', // Add other properties as needed
      shouldRetest: true, // Example value, modify as needed
    };

    // Call the createFlashcard function to submit the data to the server
    try {
      await createFlashcard(deckId.id, flashcard); // Assuming deckId is available in your component
      // Optionally, reset the form fields after successful submission
      setFrontSide('');
      setBackSide('');
    } catch (error) {
      console.error('Error creating flashcard:', error);
      // Handle error
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit}>
      
        <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex w-[800px] mb-4">
          <h3 className="w-[50%] text-center text-gray-400">Front</h3>
          <h3 className="w-[50%] text-center text-gray-400">Back</h3>
        </div>
        <div className="flex border-2 w-[800px] h-[350px] bg-white rounded-lg shadow-lg">
          <div className="flex w-[50%] h-full items-center justify-center border-r-[1px]">
          <textarea
              name="frontSide"
              value={frontSide}
              placeholder="front side"
              className="rounded p-2 h-32 w-72 resize-none text-center"
              maxLength={50}
              onChange={(e) => setFrontSide(e.target.value)}
            />
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
        <button className="text-blue-600">Edit</button>
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