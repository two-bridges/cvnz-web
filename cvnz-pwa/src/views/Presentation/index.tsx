
import React from 'react';
import { makeStyles } from '@mui/styles';
import Page from '../../components/Page';
import Header from './Header';
import FAQ from './FAQ';
import PluginsSupport from './PluginsSupport';
import SourceFiles from './SourceFiles';
import UserFlows from './UserFlows';
import { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function Presentation() {
  const classes = useStyles({});

  return (
    <Page
      className={classes.root}
      title="Presentation"
    >
      <Header />
      <UserFlows />
      <PluginsSupport />
      <SourceFiles />
      <FAQ />
    </Page>
  );
}

export default Presentation;
