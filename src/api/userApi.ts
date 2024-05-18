import axios from 'axios'

interface UserData {
  id: string;
  username: string;
  email: string;
}

export const getUserInfo = async (userId: string, token: string): Promise<UserData> => {
    try {
        const response = await axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};