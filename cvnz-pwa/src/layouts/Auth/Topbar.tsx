
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Theme, colors } from '@mui/material';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    boxShadow: 'none',
  }
}));

function Topbar({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--app.svg" />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
