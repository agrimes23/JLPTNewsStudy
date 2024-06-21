import axios from 'axios'


interface UserData {
  id: string;
  username: string;
  email: string;
}

export const getUserInfo = async (accessToken: any): Promise<UserData> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

 // const updateUser = async (updatedInfo: Partial<UserInfo>) => {
  //   try {
  //     if (accessToken) {
  //       const response = await axios.put<UserInfo>(
  //         `${process.env.BACKEND_API_URL}/users/${userInfo?._id}`,
  //         updatedInfo
  //       );

  //       setUserInfo({ ...userInfo, ...response.data }); // Merge updated data with existing userInfo
  //     }
  //   } catch (error) {
  //     console.error("Failed to update user info:", error);
  //   }
  // };

  // const deleteUser = async () => {
  //   try {
  //     await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`);

  //     setUserInfo(null);
  //   } catch (error) {
  //     console.error("Failed to delete user:", error);
  //   }
  // };