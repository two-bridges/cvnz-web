import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  tableTr: {
    height: '30px',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    textAlign: 'center'
  },
  tableBorderLeft: {
    height: '40px',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  lastRow: {
    height: '30px', borderLeft: '1px solid black', textAlign: 'center'
  },
  spacing: {
    marginTop: theme.spacing(3)
  },
}));