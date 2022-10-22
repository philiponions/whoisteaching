import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  const styles = {
    div: {
      padding: "100px"
    }
  }
  return (
    <div style={styles.div}>
        <CircularProgress />
    </div>
    
  );
}