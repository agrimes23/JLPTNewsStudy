import React, { useState } from 'react';
import { useFlashcardDeck } from '@/context/FlashcardContext';

interface EditDeckProps {
  deck: {
    _id: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

const EditDeck: React.FC<EditDeckProps> = ({ deck, onClose }) => {
  const [title, setTitle] = useState(deck.title);
  const [description, setDescription] = useState(deck.description);
  const { editDeck } = useFlashcardDeck();

  const handleSave = async () => {
    try {
      await editDeck(deck._id, { title, description });
      onClose();
    } catch (error) {
      console.error('Error updating deck:', error);
    }
  };

  return (
    <>
      <div className="flex w-[600px] py-8 border-[1px] rounded-lg border-gray-500 bg-white justify-between px-8 shadow-lg">
        <form onSubmit={handleSave} className="flex flex-col gap-2 self-end">
          <label className="text-[18px] w-[32]">title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="deck title"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-[18px] w-[32]">description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            value={description}
            placeholder="deck description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end">
                      <button
              onClick={onClose}
              className="mr-4 px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
          </div>
        </form>
        
      </div>

      {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-xl mb-4">Edit Deck</h2>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-4 px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default EditDeck;