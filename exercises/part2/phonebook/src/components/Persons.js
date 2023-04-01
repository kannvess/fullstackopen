const Persons = ({persons, handleDelete}) =>
  <>
    {persons.map(person =>
      <p key={person.name}>{person.name} {person.number} <button id={person.id} onClick={handleDelete}>delete</button></p>
    )}
  </>

export default Persons