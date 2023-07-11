import { useState } from 'react'

const ListItem = ({name , num}) => <div>{name} {num}</div>

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

const PersonForm = ({addLi, newName, handleNameChange, newNum, handleNumChange}) => {
  return(
    <form onSubmit={addLi}>
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

const Persons = ({persons, filter}) =>{
  return(
    persons
      .filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map(person => 
        <ListItem 
          key={person.id} 
          name={person.name} 
          num={person.num}
        />
      )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addLi = (event) => {
    let idCounter = 4

    const found = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      num: newNum,
      id: ++idCounter,
    }

    if (found) 
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(personObject))

    setNewName('')
    setNewNum('')
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
        addLi = {addLi} 
        newName = {newName} 
        newNum = {newNum}
        handleNameChange = {handleNameChange}
        handleNumChange = {handleNumChange}
      />

      <h3>Numbers</h3>
        
      <Persons 
        persons = {persons} 
        filter = {filter}
      />

    </div>
  )
}

export default App
