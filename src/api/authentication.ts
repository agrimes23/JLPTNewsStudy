// authentication related, probably login, logout, and register
import axios from "axios";

type LoginFunction = (
  email: string,
  password: string,
) => Promise<any>;

type RegisterFunction = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => Promise<any>;

export const login: LoginFunction = async (email, password) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const register: RegisterFunction = async (
  firstName,
  lastName,
  email,
  password
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
      { firstName, lastName, email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Register function error message: " + JSON.stringify(error));
  }
};

export const logout = async (): Promise<any> => {
  try {
    axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout function error message: " + JSON.stringify(error));
  }
}

export const getRefreshToken = async (): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Get refresh token function error message: " + JSON.stringify(error));
  }

}