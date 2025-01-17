
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Snackbar, SnackbarContent, colors, Theme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  content: {
    backgroundColor: colors.green[600]
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

function SuccessSnackbar({ open, onClose }) {
  const classes = useStyles({});

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={classes.content}
        message={(
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            Successfully saved changes!
          </span>
        )}
      // variant="h6"
      />
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

SuccessSnackbar.defaultProps = {
  open: true,
  onClose: () => { }
};

export default SuccessSnackbar;
