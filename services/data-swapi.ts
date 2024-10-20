//Imports
import axios from "axios";

// JF Base url for site wide global varables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchStarships = async () => {
  try {

      const response = await axios.get(`${API_BASE_URL}/starships`);
      return response.data;

  } catch (error) {

      console.error("Error fetching starships because:", error);

    throw new Error("Failed to fetch starships");
  }
};