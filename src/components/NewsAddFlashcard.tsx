import { useState, useEffect } from 'react'
import { useFlashcardDeck } from "@/context/FlashcardContext";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

interface KanjiProps {
    kanji: string;
    furigana?: string;
    meaning: string;
    selectedDeck: any;
    onClose: any;
    setOpenDeckOptions: any;
  }


const NewsAddFlashcard: React.FC<KanjiProps> = ({
    kanji,
    furigana,
    meaning,
    selectedDeck,
    onClose,
    setOpenDeckOptions
  }) => {
    const { createFlashcard } = useFlashcardDeck();
    const [frontSide, setFrontSide] = useState<string>(kanji);
    const [backSide, setBackSide] = useState<string>(
      `${furigana ? `${furigana} ` : ""}${meaning}`
    );

    const handleSaveFlashcard = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!selectedDeck) {
          alert("Please select a deck");
          return;
        }
    
        const flashcard = {
          frontSide,
          backSide,
          jlptLevel: "",
          shouldRetest: true,
        };
    
        const requestBody: any = {
          flashcards: [flashcard],
        };
    
        console.log("selectedDeck from news add flashcard component: " + JSON.stringify(selectedDeck))
        try {
          await createFlashcard(selectedDeck, requestBody);
          setFrontSide("");
          setBackSide("");
          setOpenDeckOptions(false);
          onClose();
        } catch (error) {
          console.error("Error creating flashcard:", error);
        }
      };

      useEffect(() => {
        console.log("selected deck: " + JSON.stringify(selectedDeck))
      }, [])


  return (
    <div>
        <form onSubmit={handleSaveFlashcard} action="" className="flex items-center flex-col">
              <label htmlFor="">Front Side</label>
              {/* kanji */}
              <textarea
                name="front side"
                value={frontSide}
                placeholder="front side"
                className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                maxLength={50}
                onChange={(e) => setFrontSide(e.target.value)}
              />
              <label htmlFor="">Back Side</label>
              {/* furigana (if applicable), meaning */}
              <textarea
                name="back side"
                value={backSide}
                placeholder="back side"
                className="rounded p-2 h-32 w-72 resize-none border-2 border-gray"
                maxLength={50}
                onChange={(e) => setBackSide(e.target.value)}
              />

              <button
                type="submit"
                className="bg-[#113946] text-white w-[30vw] py-3 my-10  rounded"
              >
                Save to Deck
              </button>
            </form>
    </div>
  )
}

export default NewsAddFlashcard