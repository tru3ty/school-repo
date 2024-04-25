import axios from "axios";

const fetchWeatherData = async (location: string) => {
  const apiKey = import.meta.env.VITE_API_KEY; // API Для получения информации о погоде
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=metric&lang=ru`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

export default fetchWeatherData;
