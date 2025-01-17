
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Theme } from '@mui/material';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function Deliverables({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Typography variant="h4">Deliverables:</Typography>
        <Typography variant="body1">
          You will be required to provide a zip file. Please check with the
          client to see if they have a preference.
        </Typography>
      </CardContent>
    </Card>
  );
}

Deliverables.propTypes = {
  className: PropTypes.string
};

export default Deliverables;
