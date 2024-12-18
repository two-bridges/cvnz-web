import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { SnackbarContent, colors, Theme } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { StatusList } from './StatusSnackBar';

const useStyles = makeStyles((theme) => {
  return ({
    message: (props) => ({
      backgroundColor: (props as any).content.backgroundColor,
      color: (props as any).content.color,
    }),
    close: (props) => ({
      backgroundColor: (props as any).content.backgroundColor,
      color: (props as any).content.color,
    }),
    content: (props) => ({
      backgroundColor: (props as any).content.backgroundColor,
      color: (props as any).content.color,
    }),
  });
});


function MessageSnackbar(props) {
  const classMap = {
    content: {
      backgroundColor: '' as string,
      color: colors.common.white as string
    }
  };
  const status: 'info' | 'success' | 'warn' | 'error' = StatusList[props.panelStatus] ? props.panelStatus : 'info';

  if (status === 'success') {
    classMap.content.backgroundColor = colors.green[600];
    classMap.content.color = colors.common.black;
  } else if (status === 'warn') {
    classMap.content.backgroundColor = colors.amber[600];
    classMap.content.color = colors.common.black;
  } else if (status === 'error') {
    classMap.content.backgroundColor = colors.red[600];
    classMap.content.color = colors.common.black;
  }
  const classes = useStyles(classMap);
  const handleClose = () => {
    props.onClose();
  }
  return (
    <Snackbar
      style={{ zIndex: 999999 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={6000}
      onClose={handleClose}
      open={props.open}
    >
      <SnackbarContent
        className={classes.content}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
              size="large">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        message={(
          <span className={classes.message}>
            {props.message}
          </span>
        )}
      />
    </Snackbar>
  );
}

MessageSnackbar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.string,
  panelStatus: PropTypes.string

};

MessageSnackbar.defaultProps = {
  open: true,
  onClose: () => { },
  message: '',
  panelStatus: ''
};

export default MessageSnackbar;
