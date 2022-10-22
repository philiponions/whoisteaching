import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@material-ui/data-grid'
import { Container } from '@mui/material';
import { renderPercent, renderProgress } from './RatingBar';
import { ratingStars } from './RatingStars';

function getFullName(params) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

const columns = [  
  {
    field: 'fullName',
    headerName: "Professor name",
    width: 200,
    valueGetter: getFullName
  },
  {
    field: 'avgRating',
    headerName: 'Avg. Rating',    
    width: 180,    
    renderCell: ratingStars
  },
  {
    field: 'avgDifficulty',
    headerName: 'Difficulty rating',    
    sortable: false,
    width: 180,    
    valueFormatter: (params) => {
      if (params.value == null) {
        return 'N/A';
      }
      return `${params.value}`;
    },
  },
  {
    field: 'wouldTakeAgainPercent',
    headerName: 'Would take again',    
    sortable: false,
    width: 300,    
    renderCell: renderPercent
  },
];

export default function DataGridDemo(props) {
  const styles = {
    div: {
      height: 500, 
      textAlign: "center",
       alignItems: "center",
       marginTop: "15px"       
      }
    }
  
  return (
    <Container>
      <div style={styles.div}>        
        <DataGrid
          rows={props.data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}          
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>        
    </Container>    
  );
}