const PersonForm = ({newName, newNumber, setNewPerson, setNewPersonNumber, addNewPerson}) => {

return (
    <form onSubmit={addNewPerson}>
        <div>
        name: <input value={newName} onChange={setNewPerson}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={setNewPersonNumber}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
)
}


export default PersonForm