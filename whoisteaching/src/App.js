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
import Main from './Main';

function App() {

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
