import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './RiskDeterminationStyle';
import CloseIcon from '@mui/icons-material/Close';
import parse from 'html-react-parser';


function TooltipDialog(props) {
  const handleClose = () => {
    props.handleClose();
  }

  return (
    <Dialog

      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{ padding: '0px', paddingLeft: '5px', backgroundColor: '#5e35b1' }}>
        <IconButton
          onClick={handleClose}
          style={{ float: 'right', color: 'white' }}
          size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: '0px', paddingLeft: '20px', paddingBottom: '10px', paddingRight: '20px', backgroundColor: '#5e35b1' }}>
        <Typography
          component="h5"
          gutterBottom
          variant="body1"
          style={{ color: 'white' }}
        >
          {
            props.convertToHtml ? (<>{parse(props.message)}</>) : (<>{props.message}</>)
          }

        </Typography>
      </DialogContent >

    </Dialog >
  );
}


export default TooltipDialog;