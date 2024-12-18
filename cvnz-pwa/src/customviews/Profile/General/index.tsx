
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Container, Theme } from '@mui/material';
import axios from '../../../utils/axios';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import Page from '../../../components/Page';

import { RootState } from '../../../redux/reducers/rootReducer';
import * as _ from "underscore";
import { Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function General(props) {
  const { className = "", staticContext, ...rest } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Project Details">
      <Container maxWidth="lg">
        <Grid
          {...rest}
          className={clsx(classes.root, className)}
          container
          spacing={3}
        >
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <ProfileDetails />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <GeneralSettings />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

General.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

function mapStateToProps(state: RootState) {
  var user = state?.userSessionV2?.user;
  return {
    user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General as any);





//export default General;
