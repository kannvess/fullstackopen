import { useState } from "react"

const Country = ({data}) => 
  <>
    <h1>{data.name.official}</h1>
    <p>capital {data.capital.map(capital => capital)}</p>
    <p>area {data.area}</p>

    <p><b>languages:</b></p>
    <ul>
      {
        Object.values(data.languages).map(language =>
          <li key={language}>{language}</li>
        )
      }
    </ul>
    <img src={Object.values(data.flags)[0]} />
    {console.log(data)}
  </>

const App = ({response}) => {
  const [filter, setFilter] = useState('')
  const [datas] = useState(response)

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredDatas = filter === ''
  ? datas
  : datas.filter(data => data.name.official.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      {
        filteredDatas.length !== 1
        ? filteredDatas.length > 10
          ? 'Too many matches, specify another filter'
          : filteredDatas.map(filteredData =>
              <p key={filteredData.name.official}>{filteredData.name.official}</p>
            )
        : <Country data={filteredDatas[0]} />
      }
    </div>
  )
}

export default App