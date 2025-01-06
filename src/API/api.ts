import axios from "axios";

const API_BASE_URL  =  '/api';

 export const fetchMessage =async ()  => {
    const response = await axios.get(`${API_BASE_URL}`)
    return response.data
}

