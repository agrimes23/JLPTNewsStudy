"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createDeckApi, getUserDecks, createFlashCardApi } from '@/api/flashcardApi';
import { useAuth } from './AuthContext';

// Define the shape of deck and flashcard data
interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
}

interface DeckData {
  title: string;
  description: string;
  modifiedDate: string;
}

interface FlashcardDeckContextType {
  decks: Deck[];
  createDeck: (deck: Deck) => void;
  editDeck: (deckId: string, updatedDeck: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  createFlashcard: (deckId: string, flashcard: Flashcard) => void;
  editFlashcard: (deckId: string, flashcardId: string, updatedFlashcard: Partial<Flashcard>) => void;
  deleteFlashcard: (deckId: string, flashcardId: string) => void;
  getDeck: (deckId: string) => Deck | undefined;
  getFlashcard: (deckId: string, flashcardId: string) => Flashcard | undefined;
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
    }

  };

  const editDeck = (deckId: string, updatedDeck: Partial<Deck>) => {
    setDecks(prevDecks =>
      prevDecks.map(deck => (deck.id === deckId ? { ...deck, ...updatedDeck } : deck))
    );
  };

  const deleteDeck = (deckId: string) => {
        
    setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
  };

  const createFlashcard = async (deckId: string, flashcard: Flashcard) => {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === deckId ? { ...deck, flashcards: [...deck.flashcards, flashcard] } : deck
      )
    );
    const response = await createFlashCardApi(deckId, accessToken, flashcard)
  };

  const editFlashcard = (deckId: string, flashcardId: string, updatedFlashcard: Partial<Flashcard>) => {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === deckId
          ? {
              ...deck,
              flashcards: deck.flashcards.map(flashcard =>
                flashcard.id === flashcardId ? { ...flashcard, ...updatedFlashcard } : flashcard
              )
            }
          : deck
      )
    );
  };

  const deleteFlashcard = (deckId: string, flashcardId: string) => {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        deck.id === deckId
          ? { ...deck, flashcards: deck.flashcards.filter(flashcard => flashcard.id !== flashcardId) }
          : deck
      )
    );
  };

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

  const getDeck = (deckId: string): Deck | undefined => {
    console.log("deck id: " + JSON.stringify(decks))
    console.log("deck id: " + JSON.stringify(deckId))
    const foundDeck = decks.find(deck => deck.id === deckId);
    console.log("found deck: " + JSON.stringify(foundDeck))
    return foundDeck
  };

  const getFlashcard = (deckId: string, flashcardId: string): Flashcard | undefined => {
    const deck = getDeck(deckId);
    return deck?.flashcards.find(flashcard => flashcard.id === flashcardId);
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