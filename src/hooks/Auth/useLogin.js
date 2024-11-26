import { useState } from "react"
import axios from "axios"

axios.defaults.withCredentials =true;
export const useLogin = () => {
    // const [error, setError] = useState('')

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
                email,
                password
            })

            if (!response)
                throw new Error('Something went wrong')

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('faculty_name', response.data.facultyName);

            return response.data

        } catch (error) {
            console.error(error)
        }
    }
    
    return { login }
}