import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [filter, setFilter] = useState("")

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    countriesToShow()
  }

  const countriesToShow = () => {
    const show = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
    setShowCountries(show)
  }

  useEffect( () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
        setShowCountries(response.data)
      })
  }, [])

  return (
    <>
    <Filter filter={filter} handleChange={handleFilterChange}/>
    <Display countryList={showCountries} setCountry={setShowCountries}/>
    </>
  )
}
export default App