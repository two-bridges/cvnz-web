
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    textAlgin: 'left'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 200,
    width: '100%'
  },
  removeBotton: {
    width: '100%'
  },
  media: {
    height: 20,
    width: 20
  },
  groups: {
    marginTop: theme.spacing(5)
  },
  group: {
    marginTop: theme.spacing(2)
  }
}));