/*Taking response from server and then exporting it to our src file , basically api.js is a middleware that connects server and Frontend */

export const getWeatherData = async (cityName) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/weather?city=${cityName}`
    );
    return response.json();
}