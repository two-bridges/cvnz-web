import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';


function DeletePopup(props) {

  //close dialog
  const handleClose = (event) => {
    props.closeDeletePopup(event);
  };

  const deleteSelectedItem = (event) => {
    props.deleteSelectedItem(event);
  }
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {
          props.title ? (<div>{props.title}</div>) : (<div> Delete selected item?</div>)
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {
            props.message ? (<div>{props.message}</div>) : ("Please confirm, if you would like to delete the selected item.")
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleClose} color="primary">
          No
        </Button>
        <Button size="small"
          variant="contained" onClick={deleteSelectedItem} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeletePopup