import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getAllCountries = () => {
  const request = axios.get(baseUrl + 'api/all')
  return request.then(response => response.data)
}

const getWeather = (location) => {
    const request = axios.get(weatherUrl+location)
  return request.then(response => response.data)
}

export default { getAllCountries, getWeather }