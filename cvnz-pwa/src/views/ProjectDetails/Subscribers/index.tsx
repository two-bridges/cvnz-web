
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Grid, Theme } from '@mui/material';
import SubscriberCard from './SubscriberCard';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function Subscribers({ subscribers, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      {subscribers.map((subscriber) => (
        <Grid
          item
          key={subscriber.id}
          lg={4}
          xs={12}
        >
          <SubscriberCard subscriber={subscriber} />
        </Grid>
      ))}
    </Grid>
  );
}

Subscribers.propTypes = {
  className: PropTypes.string,
  subscribers: PropTypes.array.isRequired
};

export default Subscribers;
