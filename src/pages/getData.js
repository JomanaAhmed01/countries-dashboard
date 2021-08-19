import { useState } from 'react'

const getData = async () => {
  const [countriesData, setCountriesData] = useState(null) 
  console.log(countriesData)
  const response = await fetch("https://restcountries.eu/rest/v2/all") //promise
  const data = await response.json()
  setCountriesData(data)  
}

export default getData