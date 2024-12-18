
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Avatar,
  Button
  , Theme
} from '@mui/material';
import Label from '../../../components/Label';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  media: {
    height: 225
  },
  content: {
    paddingTop: 0
  },
  avatarContainer: {
    marginTop: -32,
    display: 'flex',
    justifyContent: 'left'
  },
  avatar: {
    height: 64,
    width: 64,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  projectActions: {
    margin: theme.spacing(2, 3)
  }
}));

function SubscriberCard({ subscriber, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardMedia className={classes.media} image={subscriber.cover} />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <Typography
            align="left"
            component={RouterLink}
            display="block"
            to="/profile/1/timeline"
          // variant="h6"
          >
            {subscriber.name}
          </Typography>
        </div>

        <Divider className={classes.divider} />
        <div>
          <Typography align="center" variant="body2">
            {subscriber.text}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            Status:
            <Label> {subscriber.status}</Label>
          </Grid>
          {/*   {subscriber.labels.map(label => (
            <Grid item key={label}>
              <Label variant="outlined">{label}</Label>
            </Grid>
          ))} */}
        </Grid>
        <Divider className={classes.divider} />

        <Grid container spacing={1}>
          <Button
            className={classes.projectActions}
            color="secondary"
            component={RouterLink}
            to="/manage"
            variant="contained"
          >
            Manage
          </Button>

          {/* <Button
            className={classes.projectActions}
            color="primary"
            component={RouterLink}
            to="/activities"
            variant="contained"
          >
            Add Activity
          </Button> */}
        </Grid>
      </CardContent>
    </Card>
  );
}

SubscriberCard.propTypes = {
  className: PropTypes.string,
  subscriber: PropTypes.object.isRequired
};

export default SubscriberCard;
