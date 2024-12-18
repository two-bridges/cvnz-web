
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Card, Typography, Avatar, LinearProgress
  , Theme
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import gradients from '../../utils/gradients';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  },
  avatar: {
    backgroundImage: gradients.orange,
    height: 48,
    width: 48
  }
}));

function SystemHealth(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const data = {
    value: 83
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.content}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          Volunteers
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">

            {props.volunteersCount}
          </Typography>

        </div>
      </div>
      <Avatar className={classes.avatar}>
        <DoneIcon />
      </Avatar>
    </Card>
  );
}

SystemHealth.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array,
  volunteersCount: PropTypes.number
};

export default SystemHealth;
