import { Typography } from '@mui/material'
import React from 'react'

const NotFoundError = (props) => {
  const styles = {
    emoji: {
        fontSize: "80px"
    }
  }
  return (
    <div style={props.styling}>
        <div>
            <Typography variant='h3'>Course not found.</Typography>
        </div>
        <p style={styles.emoji}>🤔</p>
        <Typography variant='h5'>Looks like we couldn't find the course you were looking for.</Typography>         
    </div>
  )
}

export default NotFoundError