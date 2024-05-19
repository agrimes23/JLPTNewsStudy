import axios from 'axios'


interface UserData {
  id: string;
  username: string;
  email: string;
}

export const getUserInfo = async (accessToken: any): Promise<UserData> => {
    try {
        const response = await axios.get(`http://localhost:8080/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};