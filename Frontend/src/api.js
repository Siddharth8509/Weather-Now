/* api.js
   Middleware that connects frontend and backend
*/

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(`${BASE_URL}/api/weather?city=${cityName}`);

    // Check if the response is OK
    if (!response.ok) {
      console.error("Server returned an error:", response.status, response.statusText);
      return null;
    }

    // Safely parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
