import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import CircularIndeterminate from './Components/Loading';
import DataGridDemo from './Components/DataGrid';
import { Pagination } from '@mui/material';
import { Container } from '@mui/system';


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
      paddingTop: "50px"
    },
    bottomBar: {
        backgroundColor: "#ffdb05"
    },
    dataGridDiv: {
      marginTop: "10px"
    },
    paginationContainer: {
      display: "flex", 
      justifyContent: "center"
    }
  }

  const [courseInput, setCourseInput] = useState("")
  const [numberInput, setNumberInput] = useState("")
  const [profList, setProfList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
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

  const changePageIndex = (event, value) => {
    console.log(value)
    setPageIndex(value)
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
          {profList.length && !loaded? <div>            
            <Container style={styles.paginationContainer}>
              <Pagination count={profList.length} page={pageIndex} color="primary" onChange={changePageIndex}/>
            </Container>
            <div style={styles.dataGridDiv}>
                  <Typography variant="h4">{profList[pageIndex-1].semester}</Typography>
                  <DataGridDemo styles={styles.dataGrid} data={profList[pageIndex].instructors}></DataGridDemo>
            </div>
          </div> : null}   
      </header>
    </div>
  );
}

export default Main;
