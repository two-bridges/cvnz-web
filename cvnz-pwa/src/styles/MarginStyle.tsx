import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';


export const useMarginStyles = makeStyles<Theme>((theme: Theme) => ({
  marginTopSpace2: {
    marginTop: theme.spacing(2)
  },
}));