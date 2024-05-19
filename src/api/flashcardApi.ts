// flashcard http routes
import axios from 'axios'

interface DeckData {
    title: string;
    description: string;
    modifiedDate: string;
}


export const getUserDecks = async (id: string, accessToken:any) => {
    const response = await axios.get(`http://localhost:8080/deck/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
    },
      withCredentials: true,
    });
  
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    return response.data;
  };



  
// Function to fetch deck data from backend
export const getDeckData = async (deckId: string, token: any): Promise<DeckData> => {
  try {

    const response = await axios.get(`http://localhost:8080/deck/${deckId}`,  {
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

        const response = await axios.delete(`http://localhost:8080/deck/${deckId}`, {
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