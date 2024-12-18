
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
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
import Page from '../../components/Page';
import gradients from '../../utils/gradients';
import PasswordReset from './PasswordReset';
import { loadOrganisation } from 'src/redux/actions/editableOrganisationActions';
import { useDispatch, useSelector } from 'react-redux';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { Store } from 'src/redux/reducers/rootReducer';

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
  const params = useParams<{ organisation: string }>();
  const orgId = params.organisation;
  const [organisation, setOrganisation] = useState<IOrganisation | undefined>(undefined);
  const session = useSelector((state: Store) => state?.userSessionV2);
  // todo: investigate why session.orgId is undefined (probably because the user is not yet)
  console.log(`session.orgId: ${session?.orgId}`);
  const classes = useStyles({});
  const dispatch = useDispatch();
  let organisationName = props.match && props.match.params.organisation ? props.match.params.organisation : session?.orgId;

  useEffect(() => {
    if (orgId) {
      loadOrg();
      // todo: set the logged out org state here?
    }
  }, []);

  async function loadOrg() {
    const organisation = await dispatch(loadOrganisation(orgId)) as unknown as IOrganisation;
    if (organisation) {
      setOrganisation(organisation)
    }
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Grid container spacing={4}>
            <Grid item md={6} xs={6} style={{ verticalAlign: 'middle' }}>
              <Typography
                gutterBottom
                variant="h3"
              >
                Welcome to FieldBase, {organisation?.name}
              </Typography>
            </Grid>
            <Grid item md={6} xs={6} >
              {
                organisation?.imageUrl ? (
                  <div style={{ float: 'right', backgroundImage: `url('${organisation?.imageUrl}')`, width: '105px', height: '105px', backgroundSize: 'cover' }} ></div>)
                  :
                  (<div></div>)
              }
            </Grid>
          </Grid>

          <PasswordReset className={classes.loginForm} orgName={organisationName} />
        </CardContent>
      </Card>
    </Page>
  );
}

export default Login;



// <div>{organisation?.imageUrl ? organisation?.imageUrl : 'no url'}</div>
//         {/* <div style={{ backgroundImage: `url('${organisation?.imageUrl}')`, width: '100%', height: '300px', backgroundSize: 'cover' }} ></div> */}
