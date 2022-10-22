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
import ErrorSnackbar from './Components/ErrorSnackbar';


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
      justifyContent: "center",
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
      paddingTop: "50px"
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
    }
  }

  const [courseInput, setCourseInput] = useState("")
  const [numberInput, setNumberInput] = useState("")
  const [profList, setProfList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [emptyFieldDetected, setEmptyFieldDetected] = useState(false)
  const emptyFieldMessage = "You must enter all requested fields."

  
  useEffect(() => {
    console.log(profList)
  }, [profList])

  const getData = () => {
    if (courseInput.length && numberInput.length) {
      courseFormatter()
      const url = `http://localhost:3002/get/${courseInput}/${numberInput}`
      console.log(url) 
      setLoaded(true)      
      axios.get(url).then((response) => {       
        console.log(response.data)
        setProfList(response.data)      
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

  const changePageIndex = (event, value) => {
    console.log(value)
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
      <header style={styles.header}>
        <div style={styles.bar}>
            <Typography variant="h2" style={styles.text}>Who is Teaching?</Typography>
            <p style={styles.text}>View the current professors who are teaching this year at the University of Alberta.</p>
            <div style={styles.searchField}>          
              <TextField style={{marginRight: "10px"}} label="Course name" placeholder='Ex) AN SC'  onChange={(e) => setCourseInput(e.target.value)} onKeyDown={(e) => pressedEnter(e)}/>
              <TextField label="Catalogue no." placeholder='Ex) 101' onChange={(e) => setNumberInput(e.target.value)} onKeyDown={(e) => pressedEnter(e)}/>
              <IconButton onClick={getData}>
                  <SearchIcon />
              </IconButton>          
            </div>
            <Typography style={styles.sampleTextField}>Ex) Course name: AN SC, Catalogue num: 101</Typography>
        </div>
          {!loaded ? <></> : <CircularIndeterminate/>}   
          {profList.length && !loaded? <div>            
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
