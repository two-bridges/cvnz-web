
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Theme } from '@mui/material';
import Page from '../../components/Page';
import Header from './Header';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  filter: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(6)
  }
}));

function Activities() {
  const classes = useStyles({});

  return (
    <Page className={classes.root} title="Activities">
      <Container maxWidth="lg">
        <Header className={classes.header} />
      </Container>
    </Page>
  );
}

export default Activities;
