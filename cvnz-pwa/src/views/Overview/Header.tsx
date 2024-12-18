
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Grid,
  Button,
  Hidden
  , Theme
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { RootState } from '../../redux/reducers/rootReducer';
import * as sessionReducer from '../../redux/reducers/sessionReducer';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.common.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

function Header({ className = "", ...rest }) {
  const classes = useStyles({});
  const session = sessionReducer.initialState;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Home
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            Good Morning,
            {' '}
            {session.user.first_name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
          >
            Here’s what’s happening with your projects today
          </Typography>
          <Button
            className={classes.summaryButton}
            // edge="start"
            variant="contained"
          >
            <BarChartIcon className={classes.barChartIcon} />
            View summary
          </Button>
        </Grid>
        <Hidden lgDown>
          <Grid
            item
            md={6}
          >
            <img
              alt="Cover"
              className={classes.image}
              src="/images/undraw_growth_analytics_8btt.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
