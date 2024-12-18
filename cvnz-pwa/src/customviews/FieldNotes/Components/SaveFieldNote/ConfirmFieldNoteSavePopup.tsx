import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function ConfirmFieldNoteSavePopup(props) {

  const handleClose = () => {
    props.handleClose();
  }

  const handleSave = () => {
    props.saveChanges();
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
          Do you wish to save all changes to fieldNote?
        </Typography>
      </DialogContent >
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          size='small'
          style={{ marginRight: '10px' }}
          variant="contained" onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          color="primary"
          size='small'
          variant="contained"
          onClick={handleSave}>Save</Button>

      </DialogActions>
    </Dialog >
  )
}

export default ConfirmFieldNoteSavePopup;