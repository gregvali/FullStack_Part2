import { useState, useEffect } from 'react'
import personService from './services/persons'

const ListItem = ({person, deletePerson}) => {
  return(
    <div>
      {person.name} {person.number} 
      <button onClick = {()=>deletePerson(person.id)}>
          delete
      </button>
    </div>
  )
}

const Filter = ({filter, handle}) => {
  return (
    <form>
      <div>
        filter shown with <input
          value = {filter}
          onChange={handle}
        />
      </div>
    </form> 
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNum, handleNumChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
         number: <input
          value = {newNum}
          onChange={handleNumChange}
        />
      </div>
      <button type="submit">add</button>
    </form> 
  )
}

const Persons = ({persons, filter, deletePerson}) => {
  return(
    persons
      .filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map(person => 
        <ListItem 
          key={person.id} 
          person = {person}
          deletePerson={deletePerson}
        />
      )
  )
}

const App = () => {
  //set states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  //set display to all objects on server
  useEffect(() => { 
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

    //add person
  const addPerson = (event) => {
    const foundPerson = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNum,
    }

    if (foundPerson.length !== 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personService
          .update(foundPerson[0].id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== foundPerson[0].id ? person : response.data))
          })
      }
      else
        console.log(`cancel was pressed`)
    }
    else
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
      setNewName('')
      setNewNum('')  
  }

  //delete person
  const deletePerson = (id) => {
    const selectedPerson = persons.filter(p => p.id === id)
    const personName = selectedPerson[0].name
    const personId = selectedPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .erase(personId)
        console.log(`person with id ${personId} has been deleted`)
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  //event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter = {filter} 
        handle={handleFilterChange}
      />
      
      <h3>add a new</h3>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName} 
        newNum = {newNum}
        handleNameChange = {handleNameChange}
        handleNumChange = {handleNumChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons = {persons} 
        filter = {filter}
        deletePerson = {deletePerson}
      />
    </div>
  )
}

export default App
