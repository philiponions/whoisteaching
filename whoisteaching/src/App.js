import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import CircularIndeterminate from './Loading';
import ProfessorItem from './ProfessorItem';

function App() {
  const styles = {
    header: {
      marginTop: "150px"
    },
    searchField: {
      justifyContent: "flex",
      alignItems: "center"
    }
  }

  const [courseInput, setCourseInput] = useState("")
  const [numberInput, setNumberInput] = useState("")
  const [profList, setProfList] = useState([])
  const [isSearching, setIsSearching] = useState("false")
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    console.log(profList)
  }, [profList])

  const getData = () => {
    const url = `http://localhost:3002/get/${courseInput}/${numberInput}`
    console.log(url) 
    setLoaded(true)
    axios.get(url).then((response) => {
      setProfList(response.data)
      // console.log(response.data)
      setLoaded(false)
    })
  }

  return (
    <div className="App">
      <header style={styles.header}>
        <Typography variant="h2">Who is Teaching?</Typography>
        <p>View the current professors who are teaching this semester at the University of Alberta.</p>
        <div style={styles.searchField}>          
          <TextField label="Course name" onChange={(e) => setCourseInput(e.target.value)}/>
          <TextField label="Course no." onChange={(e) => setNumberInput(e.target.value)}/>
          <IconButton>
            <SearchIcon onClick={getData}/>
          </IconButton>          
        </div>
          {
            !loaded ? <></> : <CircularIndeterminate/>
          }     
          {
            profList.map((e) => {
              return <ProfessorItem item={e}/>
            })
          }
      </header>
    </div>
  );
}

export default App;
