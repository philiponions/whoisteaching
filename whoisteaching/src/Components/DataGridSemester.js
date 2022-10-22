import { TextField } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DataGridDemo from './DataGrid'

const DataGridSemester = (props) => {    
  return (
    <div>
        {props.profList.map((e) => {
              return <div>
                <Typography variant="h4">{e.semester}</Typography>
                <DataGridDemo styles={props.styles} data={e.instructors}></DataGridDemo>
              </div>
            })}
    </div>
  )
}

export default DataGridSemester