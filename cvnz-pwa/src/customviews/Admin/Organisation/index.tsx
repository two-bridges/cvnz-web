
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Container, Theme, Tabs, Tab } from '@mui/material';
import * as _ from "underscore";
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import Page from 'src/components/Page';
import OrganisationForm from './OrganisationForm';
import { useHistory, useLocation, useParams } from 'react-router';
import OrgUserList from './OrgUserList';
import { loadOrganisation, newOrganisation, unsetOrganisation } from 'src/redux/actions/editableOrganisationActions';

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

export default function Organisation(props) {

  const dispatch = useDispatch();
  const params = useParams<{ orgId: string }>();
  const orgId = params.orgId ?? '';
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const query = useQuery();
  const history = useHistory();
  const tab = query.get('tab') ?? 'org';

  const organisationState = useSelector((state: Store) => state?.editableOrganisation);
  const organisation = organisationState?.entity;

  const tabs = [
    { value: 'org', label: 'Organisation', enabled: true },
    { value: 'users', label: 'Users', enabled: !!organisation?.id }
  ];

  function handleTabChange(tab: string) {
    if (organisation) {
      if (organisation.id) {
        history.push(`/admin/organisation/${organisation.id}?tab=${tab}`);
      } else {
        history.push(`/admin/organisation?tab=org`);
      }
    }
  }
  function handleUserTabChange(organisationId: string, tab: string) {
    if (organisationId) {
      history.push(`/admin/organisation/${organisationId}?tab=${tab}`);
    }
  }

  // on load
  useEffect(() => {
    if (orgId) {
      dispatch(loadOrganisation(orgId));
    } else {
      dispatch(newOrganisation());
    }

    return () => {
      // clean up
      dispatch(unsetOrganisation());
    };
  }, []);

  return (
    <Page className={classes.root} title="Add Organisation">
      <Container maxWidth="lg">

        <Tabs
          value={tab}
          classes={{ indicator: classes.bigIndicator }}
          className={classes.tabs}
          indicatorColor="primary"
          style={{ color: '#263238', boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)' }}
          onChange={(event, value) => handleTabChange(value)}
          aria-label="disabled tabs example"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} disabled={!tab.enabled} value={tab.value} style={{ boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)' }} />
          ))}
        </Tabs>
        <div className={classes.content}>

          {/** ORG EDIT */}
          {tab === 'org' && organisation && (

            <OrganisationForm
              organisation={organisation}
              handleTabChange={handleUserTabChange}
            />
          )}

          {/** USERS */}
          {tab === 'users' && organisation && (
            <div>
              <OrgUserList
                isAdmin={true}
                organisation={organisation}
              />
            </div>
          )}
        </div>
      </Container>
    </Page >
  );
}

Organisation.propTypes = {
  className: PropTypes.string,
  orgId: PropTypes.string
};
