import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { SnackbarContent, colors, Theme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export enum StatusList {
  info = 1,
  success,
  warn,
  error
}
// const useStyles = makeStyles<Theme>((theme: Theme) => {
//   const bg = colors.red[600];
//   return ({
//     root: (props) => ({
//       backgroundColor: bg,
//       color: bg,
//     }),
//   });
//   return ({
//     content: {
//       backgroundColor: bg
//     },
//     message: {
//       display: 'flex',
//       alignItems: 'center'
//     },
//     icon: {
//       marginRight: theme.spacing(2)
//     }
//   });
// });
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


function StatusSnackbar({ panelStatus, onClose, message }) {
  console.log(`message: ${message}`);
  const status: 'info' | 'success' | 'warn' | 'error' = StatusList[panelStatus] ? panelStatus : 'info';
  // this gets passed to makeStyles (see above)
  const classMap = {
    content: {
      backgroundColor: '' as string,
      color: colors.common.white as string
    }
  };

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

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={!!message}
    >
      <SnackbarContent
        className={classes.content}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={() => onClose()}
              size="large">
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
        message={(
          <span className={classes.message}>
            {/* <CheckCircleIcon className={classes.icon} /> */}
            {message}
          </span>
        )}
      // variant="h6"
      />
    </Snackbar>
  );
}

StatusSnackbar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  panelStatus: PropTypes.string, // info | success | warn | error 
  message: PropTypes.string
};

StatusSnackbar.defaultProps = {
  open: true,
  onClose: () => { },
  message: ''
};

export default StatusSnackbar;
