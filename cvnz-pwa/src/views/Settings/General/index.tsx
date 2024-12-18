
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Container, Theme } from '@mui/material';
import axios from '../../../utils/axios';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import Page from '../../../components/Page';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function General({ className = "", ...rest }) {
  const classes = useStyles({});
  const [profile, setProfile] = useState<any>(null);
  const [groups, setGroups] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = () => {
      axios.get('/api/account/profile').then(response => {
        if (mounted) {
          setProfile(response.data.profile);
        }
      });
    };

    fetchProfile();

    const fetchGroups = () => {
      axios.get('/api/management/groups').then(response => {
        if (mounted) {
          setGroups(response.data.groups);
        }
      });
    };

    fetchGroups();

    return () => {
      mounted = false;
    };
  }, []);

  if (!profile) {
    return null;
  }
  if (!groups) {
    return null;
  }

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
            <ProfileDetails profile={profile} groups={groups} />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <GeneralSettings profile={profile} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
