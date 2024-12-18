
import { Button, Dialog, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IGoal } from 'src/redux/model/goal.model';
import PhotoUpload from '../FieldNotePhotoUpload/PhotoUpload';
import { addOrUpdateFieldNoteGoal } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import PhotoUploadedList from '../FieldNotePhotoUpload/PhotoUploadedList';
import { IFieldNoteAdditionalNote } from 'src/redux/model/fieldNote.model';

function NoteImagesList(props) {
  let note = props.note as IFieldNoteAdditionalNote;

  const handleClose = () => {
    props.handleClose();
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
        <PhotoUploadedList imageObj={note}></PhotoUploadedList>
      </DialogContent >
      <DialogActions>
        <Button type="submit"
          variant="contained"
          color='primary'
          size='small' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog >
  )
}


export default NoteImagesList;

