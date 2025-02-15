export interface Person {
    id: number;
    name: string;
    number: string;
  }
  
export  interface NewPerson {
    name: string;
    number: string;
  }
  
export  interface ErrorMessage {
    data: string | null;
    color: string;
  }

export  interface FilterProps {
    searchPerson: string;
    setNewSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export interface NotificationProps {
    errorMessage: ErrorMessage;
  }

export  interface PersonFormProps {
    newName: string;
    newNumber: string;
    setNewPerson: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setNewPersonNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addNewPerson: (event: React.FormEvent<HTMLFormElement>) => void;
  }

export  interface PersonsProps {
    persons: Person[];
    searchPerson: string;
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<{ data: string | null; color: string }>>;
  }