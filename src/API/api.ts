import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', 
  withCredentials: true, // To send cookies with requests (e.g., JWT tokens)
});



// Fetch available locations from backend
export const fetchLocations = async () => {
  try {
    const response = await api.get("/"); // Adjust API endpoint if different
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

// Fetch available categories from backend
export const fetchCategories = async () => {
  try {
    const response = await api.get("/getCategory");
    console.log(response.data)
    return response.data;
   
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Search Cars API
export const searchCars = async (location: string, categoryId: any) => {
  try {
    const response = await api.get(`/`, {
      params: { location, category_id: categoryId },
    });
    return response.data;
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};


export default api;
