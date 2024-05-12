// flashcard http routes
import axios from 'axios'





export const getUserDecks: any = async (id: string, token: string) => {
    const response = await axios.get(`http://localhost:8080/deck/user/${id}`, { withCredentials: true },)
    localStorage.setItem('userDecks', JSON.stringify(response))
    console.log(`response.data: ${JSON.stringify(response.data)}`)
    return response.data;

};
