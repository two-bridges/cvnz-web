
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Typography,
  Divider,
  colors, Theme
} from '@mui/material';
import Page from '../components/Page';
import Markdown from '../components/Markdown';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  markdownContainer: {
    marginLeft: 0,
    marginRight: 0
  }
}));

function GettingStarted() {
  const classes = useStyles({});
  const [source, setSource] = useState<any>('');

  useEffect(() => {
    fetch('/docs/GettingStarted.md')
      .then((response) => response.text())
      .then((text) => setSource(text));
  }, []);

  return (
    <Page
      className={classes.root}
      title="Getting Started"
    >
      <Container maxWidth={false}>
        <Typography
          gutterBottom
          variant="overline"
        >
          Development
        </Typography>
        <Typography variant="h3">Getting Started</Typography>
        <Divider className={classes.divider} />
      </Container>
      {source && (
        <Container
          maxWidth="md"
          className={classes.markdownContainer}
        >
          <Markdown
            escapeHtml={false}
            source={source}
          />
        </Container>
      )}
    </Page>
  );
}

export default GettingStarted;
