

const Filter = ({searchPerson, setNewSearch}) => {
    return (
        <div>
        name: <input value={searchPerson} onChange={setNewSearch}/>
        </div>
    )
  }
  

export default Filter