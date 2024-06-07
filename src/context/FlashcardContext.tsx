"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createDeckApi, getUserDecks, createFlashCardApi, getDeckData, deleteFlashcardApi, editFlashcardApi, editDeckInfoApi } from '@/api/flashcardApi';
import { useAuth } from './AuthContext';

// Define the shape of deck and flashcard data
interface Flashcard {
  _id: string,
  frontSide: string,
  backSide: string,
  jlptLevel: string,
  shouldRetest: boolean,
};

interface Deck {
  _id: string;
  title: string;
  description: string;
  flashcards: Flashcard[];
}

interface DeckData {
  title: string;
  description: string;
  modifiedDate: string;
  flashcards: Flashcard[];
}

interface FlashcardDeckContextType {
  decks: Deck[];
  createDeck: (deck: Deck) => void;
  editDeck: (deckId: string, updatedDeck: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  createFlashcard: (deckId: string, flashcard: Flashcard) => void;
  editFlashcard: (deckId: string, flashcardId: string, updatedFlashcard: Partial<Flashcard>) => void;
  deleteFlashcard: (deckId: string, flashcardId: string) => void;
  getDeck: (deckId: string) => Promise<Deck | undefined>;
  getFlashcard: (deckId: string, flashcardId: string) => Promise<Flashcard | undefined>;
  getDecksList: (userId: string, accessToken: string) => any;
  
}

// Create the context with a default value
const FlashcardDeckContext = createContext<FlashcardDeckContextType | undefined>(undefined);

// Define the provider component
const FlashcardDeckProvider = ({ children }: { children: ReactNode }) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const { accessToken, user } = useAuth()

  const createDeck = async (deck: Deck) => {
    setDecks(prevDecks => [...prevDecks, deck]);

    if (user && accessToken) {
      const response: any = await createDeckApi(user._id, accessToken, deck)
      console.log("response from create deck: " + JSON.stringify(response))
      return response
    }

  };

  const editDeck = async (deckId: string, updatedDeck: Partial<Deck>) => {
    setDecks(prevDecks =>
      prevDecks.map(deck => (deck._id === deckId ? { ...deck, ...updatedDeck } : deck))
    );

    const response: any = await editDeckInfoApi(deckId, accessToken, updatedDeck)
    console.log("Edit deck info repsonse: " + JSON.stringify(response))

  };

  const deleteDeck = (deckId: string) => {
        
    setDecks(prevDecks => prevDecks.filter(deck => deck._id !== deckId));
  };

  const createFlashcard = async (deckId: string, flashcard: Flashcard) => {
    console.log('selected deck id: ' + JSON.stringify(deckId))
    console.log('flashcard: ' + JSON.stringify(flashcard))
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck._id === deckId ? { ...deck, flashcards: [...deck.flashcards, flashcard] } : deck
      )
    );
    const response = await createFlashCardApi(deckId, accessToken, flashcard)
    console.log("resopnse in flashcard context; " + JSON.stringify(response))
  };

  const editFlashcard = async (deckId: string, flashcardId: string, updatedFlashcard: Partial<Flashcard>) => {
    try {
      await editFlashcardApi(deckId, flashcardId, updatedFlashcard, accessToken);
      setDecks(prevDecks =>
        prevDecks.map(deck =>
          deck._id === deckId
            ? {
                ...deck,
                flashcards: deck.flashcards.map(flashcard =>
                  flashcard._id === flashcardId ? { ...flashcard, ...updatedFlashcard } : flashcard
                ),
              }
            : deck
        )
      );
    } catch (error) {
      console.error("Error editing flashcard:", error);
    }
  };

  const deleteFlashcard = async (deckId: string, flashcardId: string) => {
    console.log("deck Id: " + JSON.stringify(deckId))
    try {
      await deleteFlashcardApi(deckId, flashcardId, accessToken); // Assuming accessToken is available in your context
      setDecks(prevDecks =>
        prevDecks.map(deck =>
          deck._id === deckId
            ? { ...deck, flashcards: deck.flashcards.filter(flashcard => flashcard._id !== flashcardId) }
            : deck
        )
      );
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  }

  const getDecksList = async (userId: string, accessToken: string) => {
    try {
      const decksList = await getUserDecks(userId, accessToken);
      setDecks(decksList)
      console.log("ahh decks: " + JSON.stringify(decks))
      console.log("ahh decksList: " + JSON.stringify(decksList))

      return decksList
    } catch (error) {
      console.log("error, cannot get deck list")
    }
  }

const getDeck = async (deckId: string): Promise<any | undefined> => {
  try {
    const response = await getDeckData(deckId, accessToken); // Assuming you have a function to fetch deck data
    return response; // Return the fetched deck
  } catch (error) {
    console.error("Error fetching deck:", error);
    return undefined; // Return undefined if there's an error
  }
};

const getFlashcard = async (deckId: string, flashcardId: string): Promise<Flashcard | undefined> => {
  const deck = await getDeck(deckId); // Await the result of getDeck
  return deck?.flashcards.find((flashcard: Flashcard) => flashcard._id === flashcardId);
};


  return (
    <FlashcardDeckContext.Provider
      value={{
        decks,
        createDeck,
        editDeck,
        deleteDeck,
        createFlashcard,
        editFlashcard,
        deleteFlashcard,
        getDeck,
        getFlashcard,
        getDecksList
      }}
    >
      {children}
    </FlashcardDeckContext.Provider>
  );
};

// Hook to use the FlashcardDeckContext
const useFlashcardDeck = (): FlashcardDeckContextType => {
  const context = useContext(FlashcardDeckContext);
  if (context === undefined) {
    throw new Error('useFlashcardDeck must be used within a FlashcardDeckProvider');
  }
  return context;
};

export { FlashcardDeckProvider, useFlashcardDeck };