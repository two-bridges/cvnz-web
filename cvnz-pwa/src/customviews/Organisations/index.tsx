
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Container, Theme } from '@mui/material';
import * as _ from "underscore";
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/reducers/rootReducer';
import { store } from 'src/redux/store/configureStore';
import Page from 'src/components/Page';
import OrganisationCreate from './OrganisationCreate';
import * as organisationActions from 'src/redux/actions/organisationActions';
import { IOrganisation } from 'src/redux/model/organisation.model';
import OrganisationList from './OrganisationList';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

type FnCreateOrganisation = (args: organisationActions.ICreateOrganisationCriteria) => Promise<{ payload: IOrganisation, type: string, meta: { arg: organisationActions.ICreateOrganisationCriteria, requestId: string } }>;
type FnOrganisations = (args: organisationActions.ICreateOrganisationCriteria) => Promise<{ payload: IOrganisation[], type: string, meta: { arg: organisationActions.ICreateOrganisationCriteria, requestId: string } }>;

function Organisation(props) {
  const [organisation, setOrganisation] = useState<IOrganisation | undefined>(undefined);
  const [organisations, setOrganisations] = useState<IOrganisation[] | undefined>(undefined);


  const { className = "", staticContext, ...rest } = props;
  const classes = useStyles({});

  const actions = props.actions as {
    createOrganisation: FnCreateOrganisation,
    saveOrganisation: FnCreateOrganisation,
    loadOrganisations: FnOrganisations
  };


  useEffect(() => {
    // initial value setup 
    // TODO: will come once organisation is loaded or set default if adding new organisation

    let mounted = true;
    if (!organisation) {
      createOrganisation(mounted);
    }

    // load organisations list
    actions.loadOrganisations({})
      .then(response => {
        if (mounted) {
          var organisationList = response.payload;
          if (organisationList.length > 0) {
            setOrganisations(organisationList);
          }
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  function createOrganisation(mounted: boolean) {
    actions.createOrganisation({})
      .then(response => {
        if (mounted) {
          setOrganisation(response.payload);
        }
      });
  }
  const handleChange = event => {
    event.preventDefault();
    setOrganisation({
      ...organisation,
      [event.target.name]: event.target.value
    } as any);
  };

  return (
    <Page className={classes.root} title="Add Organisation">
      <Container maxWidth="lg">
        <Grid
          {...rest}
          className={clsx(classes.root, className)}
          container
          spacing={3}
        >
          <Grid item lg={12} md={12} xl={4}>
            <OrganisationCreate
              organisation={organisation}
              handleChange={handleChange}
            // handleOrganisationSave={handleOrganisationSave}
            // handleCoordinateChange={handleCoordinateChange}
            />
          </Grid>

          <Grid item lg={12} md={12} xl={4}>
            <OrganisationList
              organisations={organisations}
            />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}

Organisation.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

function mapStateToProps(state: RootState) {
  var user = state?.userSessionV2?.user;
  return {
    user,
  };
}

const createOrganisation = bindActionCreators(organisationActions.createOrganisation, store.dispatch);
const saveOrganisation = bindActionCreators(organisationActions.saveOrganisation, store.dispatch);
const loadOrganisations = bindActionCreators(organisationActions.fetchOrganisations, store.dispatch);


function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      createOrganisation,
      saveOrganisation,
      loadOrganisations
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Organisation as any);
