import clsx from 'clsx';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2,
      },
      value: {
        position: 'absolute',
        lineHeight: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
      bar: {
        height: '100%',
        '&.low': {
          backgroundColor: '#f44336',
        },
        '&.medium': {
          backgroundColor: '#efbb5aa3',
        },
        '&.high': {
          backgroundColor: '#088208a3',
        },
      },
    }),
  { defaultTheme },
);

const PercentBar = (props) => {
    const { value } = props;
    const valueInPercent = value;
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <div className={classes.value}>{`${valueInPercent.toLocaleString()} %`}</div>
        <div
          className={clsx(classes.bar, {
            low: valueInPercent < 30,
            medium: valueInPercent >= 30 && valueInPercent <= 70,
            high: valueInPercent > 70,
          })}
          style={{ maxWidth: `${valueInPercent}%`}}
        />
      </div>
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