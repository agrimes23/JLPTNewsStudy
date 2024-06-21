// flashcard http routes
import axios from 'axios'

interface Flashcard {
  _id: string,
  frontSide: string,
  backSide: string,
  jlptLevel: string,
  shouldRetest: boolean,
};

interface DeckData {
  title: string;
  description: string;
  modifiedDate: string;
  flashcards: Flashcard[];
}


export const getUserDecks = async (id: string, accessToken:any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
    },
      withCredentials: true,
    });
  
    return response.data;
  };


// Function to fetch deck data from backend
export const getDeckData = async (deckId: string, token: any): Promise<DeckData> => {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching deck data:", error);
    throw error; // Rethrow the error to handle it in the component or context
  }
};


export const deleteDeck = async (deckId: string, token: any) => {
    try {

        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
    } catch (error) {
        console.error("Error in deleting deck: ", error)
        throw error;
    }
}

export const createDeckApi = async (userId: string, token: any, newDeck: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${userId}`, newDeck, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("error with creating deck: " + JSON.stringify(error));
  }
};

export const editDeckInfoApi = async (deckId: string, token: any, updatedDeckInfo: any) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}`, updatedDeckInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

  } catch (err) {
    console.log("error with editing deck info: " + JSON.stringify(err));
  }
}


export const createFlashCardApi = async (deckId: string, token: any, newFlashcard: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}/flashcards`, newFlashcard, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log("error with add new flashcard to deck: " + JSON.stringify(error));
  }
};
  
export const deleteFlashcardApi = async (deckId: string, flashcardId: string, token: any) => {

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}/flashcards/${flashcardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
  } catch (error) {
    console.error("Error in deleting flashcard in the api service: ", error)
    throw error;
  }
}

export const editFlashcardApi = async (deckId: string, flashcardId: string, updatedFlashcard: Partial<Flashcard>, token: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/deck/${deckId}/flashcards/${flashcardId}`,
      updatedFlashcard,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in editing flashcard in the api service: ", error);
    throw error;
  }
};