import React, { useEffect } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ViewLink = (props) => {
  const { value } = props;    
  return (
    <div>
        <a href={value} target="_blank">
            <OpenInNewIcon/>
        </a>    
    </div>
  )
}

export function renderLink(params) {    
    if (params.value) {
        return <ViewLink value={params.value}/>
    }
    else {
        return <div>N/A</div>
    }
}