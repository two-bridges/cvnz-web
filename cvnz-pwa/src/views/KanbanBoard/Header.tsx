
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button, Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

function Header({ onListAdd, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Organization
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Kanban Board
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={onListAdd}
            variant="contained"
          >
            Add list
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  onListAdd: PropTypes.func
};

export default Header;
