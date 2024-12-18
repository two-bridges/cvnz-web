

import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function ConfirmActiveFieldNote(props) {

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
          There is already a field note in progress.  Please complete the InProgress field note before reviewing past ones
        </Typography>
      </DialogContent >
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          size='small'
          style={{ marginRight: '10px' }}
          variant="contained" onClick={handleClose}>Close</Button>

        {/* <Button
          type="submit"
          color="primary"
          size='small'
          variant="contained"
          onClick={handleSave}>Discard</Button> */}

      </DialogActions>
    </Dialog >
  )
}


export default ConfirmActiveFieldNote;