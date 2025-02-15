import { FilterProps } from "./types"

const Filter: React.FC<FilterProps> = ({searchPerson, setNewSearch}) => {
    return (
        <div>
        name: <input type="text" value={searchPerson} onChange={setNewSearch}/>
        </div>
    )
  }
  

export default Filter