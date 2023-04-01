import axios from "axios"
import { useState } from "react"

const Country = ({data, weatherData}) => 
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
    <h2>Weather in {data.capital}</h2>
    <p>temperature {weatherData.main.temp}</p>
    <p>wind {weatherData.wind.speed}</p>
  </>

const App = ({response}) => {
  const [filter, setFilter] = useState('')
  const [datas] = useState(response)
  const [weatherData, setWeatherData] = useState([])

  
  const handleFilter = (event) => {
    setFilter(event.target.value)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${filteredDatas[0].capitalInfo.latlng[0]}&lon=${filteredDatas[0].capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherData(response.data)
      })
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
          ? <p>Too many matches, specify another filter</p>
          : filteredDatas.map(filteredData =>
              <p key={filteredData.name.official}>{filteredData.name.official} <button onClick={() => setFilter(filteredData.name.official)}>show</button></p>
            )
        : <Country data={filteredDatas[0]} weatherData={weatherData} />
      }
    </div>
  )
}

export default App