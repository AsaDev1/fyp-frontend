import axios from "axios"

export const useFaculty = () => {
    const token = localStorage.getItem('token')
    
    const getCoSupervisors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}getCoSupervisorNames`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data.data
        }
        catch (error) {
            console.error(error)
        }
    }
    return { getCoSupervisors }
}