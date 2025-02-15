import { PersonFormProps } from "./types"

const PersonForm: React.FC<PersonFormProps> = ({newName, newNumber, setNewPerson, setNewPersonNumber, addNewPerson}) => {

return (
    <form onSubmit={addNewPerson}>
        <div>
        name: <input type="text" value={newName} onChange={setNewPerson}/>
        </div>
        <div>
        number: <input type="text" value={newNumber} onChange={setNewPersonNumber}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
)
}


export default PersonForm