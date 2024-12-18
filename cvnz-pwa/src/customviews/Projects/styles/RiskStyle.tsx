import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  spacing: {
    marginTop: theme.spacing(3)
  },
}));