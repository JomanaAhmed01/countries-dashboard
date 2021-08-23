import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Paper from '@material-ui/core/Paper';

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

  if (!countriesData) {
    return <>loading</>
  }

  return (
    <>
      <CountriesTitle>Countries Dashboard</CountriesTitle>
      <TextFieledWrapper>
        <Paper elevation={10}>
          <WrapperField>
            <Title>Search Here</Title>
            <SearchField id="outlined-basic" label="Search" variant="outlined" />
            <CheckboxWrapper>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Name"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Capital"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Region"
              />
            </CheckboxWrapper>
          </WrapperField>
        </Paper>
      </TextFieledWrapper>
      <FilterButtonWrapper>
        <Button variant="contained" color="secondary">
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
              {countriesData.map((item) => {
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
`;

const CountriesTitle = styled.p`
  font-size: 50px;
  text-align: center;
`;

const TextFieledWrapper = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const WrapperField = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 50px;
`;

const CheckboxWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Title = styled.p`
  font-size: 20px;
`;

const SearchField = styled(TextField)`
  width: 300px;
`;

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export default Dashboard


// return (
//   <>
//     <table>
//       <tr>
//         <th>Country Name</th>
//         <th>Capital</th>
//         <th>Region</th>
//         <th>Population</th>
//         <th>Language</th>
//         <th>Time Zones</th>
//       </tr>
//       <tr>
//         <th>{countriesData.map((item) => {
//           return (
//             <>
//               <div>{item.name}</div>
//             </>
//           )
//         })}</th>
//         <th>{countriesData.map((item) => {
//           return (
//             <>
//               <div>{item.capital}</div>
//             </>
//           )
//         })}</th>
//         <th>{countriesData.map((item) => {
//           return (
//             <>
//               <div>{item.region}</div>
//             </>
//           )
//         })}</th>
//         <th>{countriesData.map((item) => {
//           return (
//             <>
//               <div>{item.population}</div>
//             </>
//           )
//         })}</th>
//         <th>{countriesData.map((item) => {
//           return (
//             <>
//               <div>{item.demonym}</div>
//             </>
//           )
//         })}</th>
//         <th>{countriesData.map((item) => {
//         return (
//           <>
//           <div>{item.timezones}</div>
//           </>
//         )
//       })}</th>
//       </tr>
//     </table>
//   </>
// )
// }