
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Container, Theme, Typography, CardHeader, CardContent, Card } from '@mui/material';
import * as _ from "underscore";
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import Page from 'src/components/Page';
import { useLocation, useParams } from 'react-router';
import { loadOrganisation, newOrganisation } from 'src/redux/actions/editableOrganisationActions';
import UserList from '../Organisation/OrgUserList';

// DG TODO
// * replace all these actions with v2 actions
// * Note: organisations are currently (incorrectly) loaded in datacontext -> OrganisationProvider ->  OrganisationContext.Provider
//    * the LoginForm accepts the `organisations` currently

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(3),
  },
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function OrganisationUserList(props) {

  const dispatch = useDispatch();
  const params = useParams<{ orgId: string }>();
  const orgId = params.orgId ?? '';
  const { className = "", staticContext, ...rest } = props;
  const classes = useStyles({});
  const query = useQuery();

  const organisationState = useSelector((state: Store) => state?.editableOrganisation);
  const organisation = organisationState?.entity;


  // on load
  useEffect(() => {
    if (orgId) {
      dispatch(loadOrganisation(orgId));
    } else {
      dispatch(newOrganisation());
    }

    return () => {
      // clean up
      // dispatch(unsetOrganisation());
    };
  }, []);

  return (
    <Page className={classes.root} title="Add Organisation">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5">
              Organisation: {organisation ? organisation.name : ''}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '10px' }}>
          <CardHeader title="User List"></CardHeader>
          <CardContent>
            <UserList isAdmin={props.isAdmin ? props.isAdmin : false} organisation={organisation}></UserList>
          </CardContent>
        </Card>
      </Container>
    </Page >
  );
}

OrganisationUserList.propTypes = {
  className: PropTypes.string,
  orgId: PropTypes.string,
  isAdmin: PropTypes.string,
};
