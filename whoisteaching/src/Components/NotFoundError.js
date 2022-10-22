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
            <Typography variant='h3'>Course not found</Typography>
        </div>
        <p style={styles.emoji}>🤔</p>
        <Typography variant='h6'>Looks like we couldn't find what you were looking for. Make sure you properly inputted the course name and number.</Typography>        
    </div>
  )
}

export default NotFoundError