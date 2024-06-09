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
      <div className="flex w-[80vw] sm:w-[600px] py-8 border-[1px] rounded-lg border-gray-500 bg-white justify-between px-8 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full">
          <div className="flex flex-col self-end gap-2">
          <label className="text-[18px] w-[32]">title</label>
          <input
            type="text"
            name="title"
            value={deck.title}
            placeholder="deck title"
            onChange={handleChange}
            className="border border-gray-500 rounded pl-2 py-1"
          />
          <label className="text-[18px] w-[32]">description</label>
          <input
            type="text"
            name="description"
            value={deck.description}
            placeholder="deck description"
            onChange={handleChange}
            className="border border-gray-500 rounded pl-2 py-1"
          />
        </div>
          <div className="flex sm:flex-col mt-5 sm:mt-0 justify-center items-end w-full ">
            <button
              type="submit"
              className="mt-4 p-2 w-[200px] bg-blue-500 text-white rounded"
            >
              Create Deck
            </button>
          </div>
        </form>
      </div>
    );
};

export default CreateDeck;
