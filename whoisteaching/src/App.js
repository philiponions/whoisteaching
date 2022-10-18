import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const styles = {
    header: {
      marginTop: "150px"
    },
    searchField: {
      justifyContent: "flex"
    }
  }

  const [courseInput, setCourseInput] = useState("")
  const [numberInput, setNumberInput] = useState("")
  const getData = () => {
    const url = `http://localhost:3002/get/${courseInput}/${numberInput}`
    console.log(url) 
    axios.get(url).then((response) => {
      console.log(response.data)
    })
  }

  return (
    <div className="App">
      <header style={styles.header}>
        <Typography variant="h2">Who is Teaching?</Typography>
        <p>View the current professors who are teaching this semester at the University of Alberta.</p>
        <div style={styles.searchField}>          
          <TextField onChange={(e) => setCourseInput(e.target.value)}/>
          <TextField onChange={(e) => setNumberInput(e.target.value)}/>
          <Button variant="contained" startIcon={<SearchIcon/>} onClick={getData}>Search</Button>
        </div>
        
      </header>
    </div>
  );
}

export default App;
