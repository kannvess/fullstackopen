const PersonForm = ({onSubmit, nameValue, nameHandler, numberValue, numberHandler}) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={numberValue} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

export default PersonForm