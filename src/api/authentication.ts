// authentication related, probably login, logout, and register
import axios from "axios"

type LoginFunction = (email: string, password: string) => Promise<void>;

type RegisterFunction = (firstName: string, lastName: string, email: string, password: string) => Promise<void>

export const login: LoginFunction = async (email, password) => {
    const response = await axios.post('http://localhost:8080/auth/login', { email, password }, { withCredentials: true })

    console.log(`response.data: ${JSON.stringify(response)}`)
    console.log(`response.headers: ${JSON.stringify(response.headers)}`)
    return response.data;
};

export const register: RegisterFunction = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', { firstName, lastName, email, password },  { withCredentials: true })
    
        return response.data;
    } catch (error) {
        console.log("Register function error message: " + JSON.stringify(error))
    }
    

}