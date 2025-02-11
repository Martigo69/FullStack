import Singlecountrydata from "./Singlecountrydata"
import countryListService from '../services/countryListService'

const Countrydata = ({countriesData, searchCountries, setSelectedCountry, selectedCountries}) => {

    const showCountryInformation = (country) => {
        const checkCountrySelection = selectedCountries.filter(countries => country === countries)
        if (checkCountrySelection.length === 0) {
          setSelectedCountry(selectedCountries.concat(country))
        } else {
          setSelectedCountry(selectedCountries.filter(countries => countries !== country))
        }
      }

    const filteredCountriesData = countriesData.filter(country =>
        country.name.official.toLowerCase().includes(searchCountries.toLowerCase())
    );
    if (filteredCountriesData.length !== 0) {
        countryListService.getWeather(filteredCountriesData[0].capital)
        .then(res => console.log(res))
    }

    if (filteredCountriesData.length > 10){
        return <p>Too many matches, Specify another filter</p>
    } else if (filteredCountriesData.length === 1) {
        return (
            <Singlecountrydata filteredCountriesData={filteredCountriesData[0]}/>
        )
    } else {
        return (
            filteredCountriesData.map(country => {
                const isSelected = selectedCountries.some(selCount => selCount === country);
              
                if (isSelected) {
                  return (
                    <div key={country.ccn3}>
                      {country.name.official}
                      <button onClick={() => showCountryInformation(country)}>hide</button>
                      <Singlecountrydata filteredCountriesData={country} />
                    </div>
                  );
                } else {
                  return (
                    <div key={country.ccn3}>
                      {country.name.official}
                      <button onClick={() => showCountryInformation(country)}>Show</button>
                    </div>
                  );
                }
              })
        )
    }
}

export default Countrydata