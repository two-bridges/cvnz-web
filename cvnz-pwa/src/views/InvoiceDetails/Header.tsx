
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button, Theme } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  getAppIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ invoice, className = "", ...rest }) {
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
            Back
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Invoice #
            {invoice.id.split('-').shift()}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
          >
            <GetAppIcon className={classes.getAppIcon} />
            Download PDF
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  invoice: PropTypes.object.isRequired
};

export default Header;
