
import React, { forwardRef, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Paper, IconButton, Typography, colors
  , Theme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import WarningIcon from '@mui/icons-material/WarningOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius
  },
  default: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  success: {
    backgroundColor: colors.green[600],
    color: theme.palette.common.white
  },
  info: {
    backgroundColor: colors.lightBlue[600],
    color: theme.palette.common.white
  },
  warning: {
    backgroundColor: colors.orange[900],
    color: theme.palette.common.white
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  message: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0'
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: 16,
    marginRight: -8
  }
}));

const icons = {
  default: <InfoIcon />,
  success: <CheckCircleIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
};
interface AlertProps {
  className?: string;
  icon?: React.ReactNode;
  variant?: any;
  message: string;
  onClose?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}
const Alert = forwardRef<unknown, AlertProps>((props, ref) => {
  const {
    className = "", message, onClose, ...rest
  } = props;
  const classes = useStyles(props);
  const icon: React.ReactNode = (rest as any).icon;
  const variant: any = (rest as any).variant;
  return (
    <Paper
      {...rest}
      className={clsx(classes.root, classes[variant], className)}
      component={Typography as any}
      elevation={1}
      ref={ref}
    // variant="h6"
    >
      <span className={classes.icon}>{icon || icons[variant]}</span>
      <div className={classes.message}>{message}</div>
      {onClose && (
        <IconButton
          className={classes.action}
          color="inherit"
          key="close"
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
});

Alert.displayName = 'Alert';

Alert.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error'])
};

Alert.defaultProps = {
  variant: 'default'
};

export default Alert;
