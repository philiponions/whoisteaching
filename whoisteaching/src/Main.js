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
import { Card, Pagination } from '@mui/material';
import { Container } from '@mui/system';
import ErrorSnackbar from './Components/ErrorSnackbar';
import NotFoundError from './Components/NotFoundError';
import GitHubIcon from '@mui/icons-material/GitHub';
import {styled} from '@mui/material/styles';
import SearchBar from './Components/SearchBar';

function Main() {
  
  const styles = {
    searchField: {
      paddingTop: "15px",
      paddingBottom: "15px", 
      display: "flex",
      alignItems: "center",          
      justifyContent: "center",
      backgroundColor: "white",
      maxWidth: "500px",
      borderRadius: "10px",
      display: "flex",     
      boxShadow: "10px 5px 5px #005e31"
    },
    text: {
      color: "white"
    },
    dataGrid: {
      marginTop: "10px"
    },
    bar: {
      backgroundColor: "#007c41",
      paddingBottom: "20px",
      paddingTop: "50px",        
    },
    bottomBar: {
        backgroundColor: "#ffdb05"
    },
    dataGridDiv: {
      marginTop: "10px",
      paddingBottom: "30px"
    },
    paginationContainer: {
      display: "flex", 
      justifyContent: "center"
    },
    sampleTextField: {
      color: "white",
      marginTop: "10px"
    },
    errorPage: {
      marginTop: "20px"
    },
    githubIcon: {
      position: 'absolute', 
      right: 0,
      padding: "5px",
      color: "white"
    }
  }

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex",      
    },
    paddingTop: "10px",
      paddingBottom: "10px", 
      display: "block",
      alignItems: "center",
      backgroundColor: "white",
      maxWidth: "100%",
      justifyContent: "center",
  }));

  const TextField1 = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex",      
    },
    paddingTop: "10px",
      paddingBottom: "10px", 
      display: "block",
      alignItems: "center",
      backgroundColor: "white",
      maxWidth: "100%",
      justifyContent: "center",
  }));

  const [courseInput, setCourseInput] = useState("")
  const [numberInput, setNumberInput] = useState("")
  const [profList, setProfList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [notFoundError, setNotFoundError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [emptyFieldDetected, setEmptyFieldDetected] = useState(false)
  const emptyFieldMessage = "You must enter all requested fields."
  
  const getData = () => {
    if (courseInput.length && numberInput.length) {
      courseFormatter()
      const url = `https://who-is-teaching-server.herokuapp.com/get/${courseInput}/${numberInput}`      
      setLoaded(true)      
      axios.get(url).then((response) => {               
        if (response.data.error) {
          setNotFoundError(true)
        }
        else {          
          if (notFoundError) {
            setNotFoundError(false)
          }
          setProfList(response.data)      
        }
        setLoaded(false)
      })
    }
    else {
      setEmptyFieldDetected(true)
    }

  }

  const pressedEnter = (e) => {
    if(e.keyCode == 13){
      getData()
   }
  }

  const searchFunctions = {
    getData: getData,
    pressedEnter: pressedEnter,
    setCourseInput: setCourseInput,
    setNumberInput: setNumberInput
    
  }
  
  
      const changePageIndex = (event, value) => {    
        setPageIndex(value)
      }
    
      const courseFormatter = () => {
        let value = courseInput
        value.toLowerCase()
        value = value.replace(/ /g,"_")    
        setCourseInput(value)
      }
  return (    
    <div className="Main" style={styles}>              
      <a href = "https://github.com/philiponions/whoisteaching" target="_blank" style={styles.githubIcon}>
        <GitHubIcon fontSize="large"/>
      </a>    
      <header style={styles.header}>
        <div style={styles.bar}>
            <Typography variant="h2" style={styles.text}>Who is Teaching?</Typography>
            <p style={styles.text}>View the current professors who are teaching this year at the University of Alberta.</p>                        
            <center>
              <SearchBar styles={styles} getData={getData} pressedEnter={pressedEnter} setCourseInput={setCourseInput} setNumberInput={setNumberInput}></SearchBar>
            </center>
            <Typography style={styles.sampleTextField}>Ex) Course name: AN SC, Catalogue num: 101</Typography>
        </div>
          {!loaded ? <></> : <CircularIndeterminate/>}   
          {notFoundError && !loaded ? <NotFoundError styling={styles.errorPage}/> : null}
          {profList.length && !loaded && !notFoundError ? <div>            
            <Container style={styles.paginationContainer}>
              <Pagination count={profList.length} page={pageIndex} color="primary" onChange={changePageIndex}/>
            </Container>
            <div style={styles.dataGridDiv}>
                  <Typography variant="h4">{profList[pageIndex-1].semester.name}</Typography>
                  <DataGridDemo styles={styles.dataGrid} data={profList[pageIndex-1].instructors}></DataGridDemo>
            </div>
          </div> : null}   
      </header>
      <ErrorSnackbar open={emptyFieldDetected} setOpen={setEmptyFieldDetected} message={emptyFieldMessage}/>
    </div>
  );
}

export default Main;
