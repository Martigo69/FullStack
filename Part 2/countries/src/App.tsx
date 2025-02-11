import { useState, useEffect } from 'react'
import Searchform from './components/Searchform'
import Countrydata from './components/Countrydata'
import countryListService from './services/countryListService'

function App() {
  const [searchCountries, setSearchCountry] = useState('')
  const [countriesData, setCountryData] = useState([])
  const [selectedCountries, setSelectedCountry] = useState([])

  useEffect(() => {
    countryListService
    .getAllCountries()
    .then(countries => {
      setCountryData(countries)
    })
  }, [])

  const setNewSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <>
    <Searchform searchCountries={searchCountries} 
                setNewSearchCountry={setNewSearchCountry}
                />
    <Countrydata  countriesData={countriesData} 
                  searchCountries={searchCountries} 
                  setSelectedCountry={setSelectedCountry}
                  selectedCountries={selectedCountries}
                  />
    </>
  )
}

export default App
