
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Typography, Theme } from '@mui/material';
import Activity from './Activity';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(3)
  },
  group: {
    '& + &': {
      marginTop: theme.spacing(4)
    }
  },
  activity: {
    position: 'relative',
    '& + &': {
      marginTop: theme.spacing(3),
      '&:before': {
        position: 'absolute',
        content: '" "',
        height: 20,
        width: 1,
        top: -20,
        left: 20,
        backgroundColor: theme.palette.divider
      }
    }
  }
}));

function Activities({ activities, className = "", ...rest }: any) {
  const classes = useStyles({});
  const todayItems: any[] = [];
  const lastWeekItems: any[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const activity of activities) {
    if (moment(activity.created_at).isSame(moment(), 'day')) {
      todayItems.push(activity);
    } else {
      lastWeekItems.push(activity);
    }
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        className={classes.title}
        variant="h3"
      >
        Today
      </Typography>
      <div className={classes.group}>
        {todayItems.map((activity) => (
          <Activity
            activity={activity}
            className={classes.activity}
            key={activity.id}
          />
        ))}
      </div>
      <div className={classes.group}>
        <Typography
          className={classes.title}
          variant="h3"
        >
          Last week
        </Typography>
        {lastWeekItems.map((activity) => (
          <Activity
            activity={activity}
            className={classes.activity}
            key={activity.id}
          />
        ))}
      </div>
    </div>
  );
}

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default Activities;
