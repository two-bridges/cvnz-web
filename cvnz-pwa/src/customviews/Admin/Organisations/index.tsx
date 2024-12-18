
import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Container, Theme } from '@mui/material';
import * as _ from "underscore";
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import Page from 'src/components/Page';
import OrganisationList from './OrganisationList';
import { loadOrganisations } from 'src/redux/actions/organisationActionsV2';

// DG TODO
// * replace all these actions with v2 actions
// * Note: organisations are currently (incorrectly) loaded in datacontext -> OrganisationProvider ->  OrganisationContext.Provider
//    * the LoginForm accepts the `organisations` currently

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default function Organisation(props) {
  const organisations = useSelector((state: Store) => {
    const idx = state?.organisationsV2?.list;
    let list = idx ? Object.values(idx) : [];

    // sort - reverse
    list = list.sort((a, b) => a.updated_utc < b.updated_utc ? 1 : -1)

    return list;
  });

  const dispatch = useDispatch();

  const { className = "", ...rest } = props;
  const classes = useStyles({});

  useEffect(() => {
    dispatch(loadOrganisations());
  }, []);

  return (
    <Page className={classes.root} title="Organisations">
      <Container maxWidth="lg">
        <Grid
          {...rest}
          className={clsx(classes.root, className)}
          container
          spacing={3}
        >
          <Grid item lg={12} md={12} xl={12}>
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
  orgId: PropTypes.string
};

