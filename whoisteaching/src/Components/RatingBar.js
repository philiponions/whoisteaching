import clsx from 'clsx';
import { createTheme, styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { createStyles, makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
const defaultTheme = createTheme();
const styles = {
  root: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 26,
    borderRadius: 2,
  },
  text: {
    position: 'absolute',
    lineHeight: '13px',    
    display: 'flex',
    justifyContent: 'center',
    zIndex: "1",
    width: "100%"
  }
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: '#1a90ff'
  },
}));

const PercentBar = (props) => {
    const { value } = props;
    const valueInPercent = value;    
  
    return (
      <Box sx={{ flexGrow: 1 }} style={styles.root}>       
      <div style={styles.text}>{`${valueInPercent.toLocaleString()} %`}</div>
      <BorderLinearProgress variant="determinate" value={value} />
      </Box>
    );
  };
  export function renderPercent(params) {
    if (params.value === null || params.value === "-1.0") {
        return <div>N/A</div>
    }
    else {
        return <PercentBar value={Number(params.value)} />;
    }
  }