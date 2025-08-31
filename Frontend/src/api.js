/*Taking response from server and then exporting it to our src file , basically api.js is a middleware that connects server and Frontend */

export const getWeatherData = async (cityName) => {
    const response = await fetch(
        `http://localhost:5000/api/weather?city=${cityName}`
    )
    return response.json();
}