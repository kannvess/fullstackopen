const Filter = ({text, filterValue, filterHandler}) =>
  <>
    {text} <input value={filterValue} onChange={filterHandler} />
  </>

export default Filter