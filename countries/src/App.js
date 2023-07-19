import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, handler}) => {
  return(
    <form>
        <div>
          find countries <input
            value = {value}
            onChange={handler}
          />
        </div>
      </form>
  )
}

const Content = ({countries, setCountries}) => {
  if (countries.length > 10) {
    return (
      <div> Too many matches, be more specific </div>
    )
  } 
  else if ((countries.length > 1 && countries.length < 10) || countries.length === 0) {
    return (
      <ul>
        {countries.map((country, i) =>
          <li key={i}> {country.name.common} <button onClick={() => setCountries([country])}>show</button></li>
        )}
      </ul>
    )
  }
  else {
    return (
      <CountryInformation country={countries[0]}/>
    )
  }
}

const CountryInformation = ({country}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
    .then(response => {
      const temp = response.data.main.temp
      const windSpeed = response.data.wind.speed
      const icon = response.data.weather[0].icon
      setWeather({temp, icon, windSpeed})
    })
    console.log(weather)

  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4> languages: </h4>
      <ul>
        {Object.values(country.languages)
          .map(lan => <li key = {lan}>{lan}</li>)}
      </ul>
      <img src={country.flags.png} alt="Country flag"></img>
      <h3>Weather in {country.name.common}</h3>
      <div>temperature {weather.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Country flag"></img>
      <div>wind {weather.windSpeed} m/s</div>
    </div>
  )
}

function App() {
  const [value, setValue] = useState('') 
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (value) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredList = response.data
            .filter(country => 
              country.name.common.toLowerCase().includes(value.toLowerCase())
            )
          setCountries(filteredList)
        })
    }
  }, [value])

  const handleFilterChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Filter 
        value = {value}
        handler = {handleFilterChange}
      />
      <Content
        countries = {countries}
        setCountries = {setCountries}
      />
    </div>
  )
}

export default App;

