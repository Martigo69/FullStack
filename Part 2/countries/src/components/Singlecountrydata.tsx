const Singlecountrydata = ({filteredCountriesData}) => {
    return (
        <>
        <h1>{filteredCountriesData.name.official}</h1>
        <p>Captial: {filteredCountriesData.capital}</p>
        <p>Region: {filteredCountriesData.region}</p>
        <h3>Languages</h3>
        <div>
        {Object.entries(filteredCountriesData.languages).map(([key, value]) => (
            <p key={key}>{key}:{value}</p>
        ))}
        <img src={filteredCountriesData.flags.png} alt={filteredCountriesData.flags.png} />
        </div>
        </>
    )
}

export default Singlecountrydata