import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import CircularIndeterminate from './Components/Loading';
import ProfessorItem from './Components/ProfessorItem';
import { DataGrid } from '@material-ui/data-grid';
import { Box } from '@mui/material';
import DataGridDemo from './Components/DataGrid';

function Main() {
  const makeStyles = theme => ({
        multilineColor:{
            color:'red'
        }
  });
  
  const styles = {
    searchField: {
      paddingTop: "10px",
      paddingBottom: "10px", 
      justifyContent: "flex",
      alignItems: "center",
      backgroundColor: "white",
      maxWidth: "100%",
      justifyContent: "center"
    },
    text: {
      color: "white"
    },
    dataGrid: {
      marginTop: "10px"
    },
    bar: {
      backgroundColor: "#007c41",
      paddingBottom: "50px",
      paddingTop: "100px"
    },
    bottomBar: {
        backgroundColor: "#ffdb05"
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
      setLoaded(false)
    })
  }

  const RenderDataGrid = () => {
    if (profList.length || !loaded) {
        return  <DataGridDemo style={styles.dataGrid} data={profList}/>
    }
  }

  return (
    <div className="Main" style={styles}>
      <header style={styles.header}>
        <div style={styles.bar}>
            <Typography variant="h2" style={styles.text}>Who is Teaching?</Typography>
            <p style={styles.text}>View the current professors who are teaching this year at the University of Alberta.</p>
            <div style={styles.searchField}>          
            <TextField label="Course name"  onChange={(e) => setCourseInput(e.target.value)}/>
            <TextField label="Catalogue no." onChange={(e) => setNumberInput(e.target.value)}/>
            <IconButton onClick={getData}>
                <SearchIcon />
            </IconButton>          
            </div>
        </div>
          {!loaded ? <></> : <CircularIndeterminate/>}   
          {(profList.length && !loaded)? <DataGridDemo style={styles.dataGrid} data={profList}/> : null}        
      </header>
    </div>
  );
}

export default Main;
