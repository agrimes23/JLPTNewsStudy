import React, {useState} from "react";
import { useFlashcardDeck } from "@/context/FlashcardContext";

const CreateDeck = () => {

    const { createDeck } = useFlashcardDeck();
    const [deck, setDeck] = useState<any>({ title: "", description: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDeck((prevDeck: any) => ({ ...prevDeck, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = createDeck(deck);
        console.log("response from create deck:", response);
      } catch (error) {
        console.error("Error creating deck:", error);
      }
    };
    
  return (
    <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 bg-white justify-between px-8 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 self-end">
        <label className="text-[18px] w-[32]">title</label>
        <input type="text" name="title" value={deck.title} placeholder="deck title" onChange={handleChange} />
        <label className="text-[18px] w-[32]">description</label>
        <input type="text" name="description" value={deck.description} placeholder="deck description" onChange={handleChange} />
        <button type="submit" className="self-center mt-4 p-2 bg-blue-500 text-white rounded">Create Deck</button>
      </form>
      <div className="flex flex-col gap-6 self-center w-full">
        <p>-------jlpt kanji level bar-------</p>
        <p className="self-center">current date</p>
      </div>
    </div>
  );
};

export default CreateDeck;
