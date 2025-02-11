const Searchform = ({searchCountries, setNewSearchCountry}) => {
    return (
        <div>
        Search Country: <input value={searchCountries} onChange={setNewSearchCountry}/>
        </div>
    )
}

export default Searchform