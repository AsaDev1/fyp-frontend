import { useState } from "react"
import axios from "axios"
import Cookies from 'js-cookie'

axios.defaults.withCredentials =true;
export const useSubjects = () => {
    const token = localStorage.getItem('token')
    
    const getSubjects = async () => {
        try {
            
            console.log("token from local storage: ", token)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}courses`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response)
                throw new Error('Something went wrong')

            return response.data.data

        } catch (error) {
            console.error(error)
        }
    }
    return { getSubjects }
}