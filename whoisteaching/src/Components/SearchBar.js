import { IconButton, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  return (    
        <div style={props.styles.searchField}>
            <div><TextField label="Course name" placeholder='Ex) AN SC'  onChange={(e) => props.setCourseInput(e.target.value)} onKeyDown={(e) => props.pressedEnter(e)}/></div>
            <div><TextField label="Catalogue no." placeholder='Ex) 101' onChange={(e) => props.setNumberInput(e.target.value)} onKeyDown={(e) => props.pressedEnter(e)}/></div>            
            <IconButton onClick={props.getData}><SearchIcon/></IconButton>          
        </div>    
  )
}

export default SearchBar