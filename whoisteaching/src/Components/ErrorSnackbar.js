import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnackbar = (props) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }
    props.setOpen(false)
}

  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {props.message}
        </Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar