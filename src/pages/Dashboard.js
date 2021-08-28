import { useState, useEffect } from "react"
import styled from "styled-components"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Loader from "react-loader-spinner"
import { TextField } from "@material-ui/core"
import { Checkbox } from "@material-ui/core"
import { Button } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import Paper from "@material-ui/core/Paper"

function Dashboard() {
  const [countriesData, setCountriesData] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNameChecked, setIsNameChecked] = useState(true)
  const [isCapitalChecked, setIsCapitalChecked] = useState(false)
  const [isRegionChecked, setIsRegionChecked] = useState(false)
  const [filterTerm, setFilterTerm] = useState('name')
  const [clearFilterBtn, setClearFilterBtn] = useState("")

  console.log(setIsNameChecked)
  console.log(setIsCapitalChecked)
  console.log(setIsRegionChecked)
  console.log(setClearFilterBtn)


  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all")
      const data = await response.json()

      setCountriesData(data)
    }
    getData()
  }, [])

  if (!countriesData) {
    return (
      <>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </>
    )
  }

  function doNameActions() {
    setIsNameChecked(true)
    setIsCapitalChecked(false)
    setIsRegionChecked(false)
  }

  function doCapitalActions() {
    setIsNameChecked(false)
    setIsCapitalChecked(true)
    setIsRegionChecked(false)
    setFilterTerm('capital')
  }

  function doRegionActions() {
    setIsNameChecked(false)
    setIsCapitalChecked(false)
    setIsRegionChecked(true)
    setFilterTerm('region')
  }

  function doResetBtn() {
    setSearchTerm("")
    setIsNameChecked(true)
    setIsCapitalChecked(false)
    setIsRegionChecked(false)
  }

  return (
    <>
      <CountriesTitle>Countries Dashboard</CountriesTitle>
      <TextFieledWrapper>
        <Paper elevation={10}>
          <WrapperField>
            <Title>Search Here</Title>
            <SearchField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              autoComplete="off"
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
            />
            <CheckboxWrapper>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    checked={isNameChecked}
                    onClick={() => doNameActions()}
                  />
                }
                label="Name"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    checked={isCapitalChecked}
                    onClick={() => doCapitalActions()}
                  />
                }
                label="Capital"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    checked={isRegionChecked}
                    onClick={() => doRegionActions()}
                  />
                }
                label="Region"
              />
            </CheckboxWrapper>
          </WrapperField>
        </Paper>
      </TextFieledWrapper>
      <FilterButtonWrapper>
        <Button variant="contained" color="secondary" onClick={doResetBtn}>
          CLEAR FILTER
        </Button>
      </FilterButtonWrapper>
      <TableWrapper>
        <Paper elevation={10}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell>Capital</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchTerm !== "" && filterTerm === "name"
                ? countriesData
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .startsWith(searchTerm.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.capital}</TableCell>
                          <TableCell>{item.region}</TableCell>
                          <TableCell>{item.population}</TableCell>
                          <TableCell>{item.demonym}</TableCell>
                        </TableRow>
                      )
                    })
                : searchTerm !== "" && filterTerm === "capital"
                ? countriesData
                    .filter((item) =>
                      item.capital
                        .toLowerCase()
                        .startsWith(searchTerm.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.capital}</TableCell>
                          <TableCell>{item.region}</TableCell>
                          <TableCell>{item.population}</TableCell>
                          <TableCell>{item.demonym}</TableCell>
                        </TableRow>
                      )
                    })
                : searchTerm !== "" && filterTerm === "region"
                ? countriesData
                    .filter((item) =>
                      item.region
                        .toLowerCase()
                        .startsWith(searchTerm.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.capital}</TableCell>
                          <TableCell>{item.region}</TableCell>
                          <TableCell>{item.population}</TableCell>
                          <TableCell>{item.demonym}</TableCell>
                        </TableRow>
                      )
                    })
                : countriesData.map((item) => {
                    return (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.capital}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.population}</TableCell>
                        <TableCell>{item.demonym}</TableCell>
                      </TableRow>
                    )
                  })}
            </TableBody>
          </Table>
        </Paper>
      </TableWrapper>
    </>
  )
}

const TableWrapper = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const CountriesTitle = styled.p`
  font-size: 50px;
  text-align: center;
`

const TextFieledWrapper = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 50px;
`

const WrapperField = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 50px;
`

const CheckboxWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const Title = styled.p`
  font-size: 20px;
`

const SearchField = styled(TextField)`
  width: 300px;
`

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

export default Dashboard
