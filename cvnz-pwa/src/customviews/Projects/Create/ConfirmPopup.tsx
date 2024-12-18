import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


function ConfirmPopup(props) {
  const confirmText = props.confirmText ? props.confirmText : 'Save';
  const cancelText = props.cancelText ? props.cancelText : 'Cancel';

  const handleClose = () => {
    props.handleClose();
  }

  const handleSave = (event) => {
    props.saveChanges(event);
  }

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Typography
          component="h3"
          gutterBottom
          variant="body1"
        >
          {props.message}
        </Typography>
      </DialogContent >
      <DialogActions>
        <Button type="submit"
          variant="contained"
          size='small'
          color='primary' onClick={handleClose}>{cancelText}</Button>
        <Button type="submit"
          variant="contained"
          size='small'
          color='primary' onClick={handleSave}>{confirmText}</Button>
      </DialogActions>
    </Dialog >
  )
}

ConfirmPopup.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  saveChanges: PropTypes.func,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,

};
export default ConfirmPopup;