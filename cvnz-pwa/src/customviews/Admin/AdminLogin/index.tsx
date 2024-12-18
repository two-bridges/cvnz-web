
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
  , Theme,
  Grid
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Page from '../../../components/Page';
import gradients from '../../../utils/gradients';
import AdminLoginForm from './AdminLoginForm';
import { version } from 'src/environment/environment';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xl')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

function Login(props) {
  const classes = useStyles({});
  const organisationName = props.match && props.match.params.organisation;
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Grid container spacing={4}>
            <Grid item md={6} xs={4}>
              <Typography
                gutterBottom
                variant="h3"
              >
                Sign in
              </Typography>
              <Typography variant="subtitle2">
                Admin user sign in
              </Typography>
            </Grid>
            <Grid item md={6} xs={8} >
              <div style={{ float: 'right' }}>
                <img
                  alt="Brand"
                  src="/images/logos/FieldBase_Logo_FavIcon.svg"
                />
              </div>
            </Grid>
          </Grid>

          <AdminLoginForm className={classes.loginForm} actions={null} />
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            {version}
          </Typography>

        </CardContent>
      </Card>
    </Page>
  );
}

export default Login;
