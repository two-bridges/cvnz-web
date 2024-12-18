
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Typography, Theme } from '@mui/material';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function Header({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        component="h2"
        gutterBottom
        variant="overline"
      >
        Social Feed
      </Typography>
      <Typography
        component="h1"
        variant="h3"
      >
        Here&apos;s what your connections posted
      </Typography>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
