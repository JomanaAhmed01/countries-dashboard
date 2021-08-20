import { useState, useEffect } from 'react'


function Dashboard() {
  const [countriesData, setCountriesData] = useState(null)
  console.log('countriesData', countriesData)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await response.json()

      setCountriesData(data)
    }
    getData()
  }, [])

  if(!countriesData) {
    return <>loading</>
  }

  return (
    <div>{countriesData.map((item) => {
      return (
        <>
        <div>{item.name}</div>
        <div>{item.region}</div>
        </>
      )
    })}</div>
  )
}

export default Dashboard