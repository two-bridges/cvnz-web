
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Typography, Grid, Button, Theme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Activity List
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
