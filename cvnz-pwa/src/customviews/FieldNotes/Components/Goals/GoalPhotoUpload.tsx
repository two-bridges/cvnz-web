
import { Button, Dialog, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IGoal } from 'src/redux/model/goal.model';
import PhotoUpload from '../FieldNotePhotoUpload/PhotoUpload';
import { addOrUpdateFieldNoteGoal } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import PhotoUploadedList from '../FieldNotePhotoUpload/PhotoUploadedList';
import { useParams } from 'react-router';

function GoalPhotoUpload(props) {
  const dispatch = useDispatch();
  let goal = props.goal as IGoal;

  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const getImageFileUploadedDetails = (value) => {
    setUploadedFile(value);
  }

  const getImageStoredUrl = async (value) => {
    setFileUrl(value);

    if (!goal.images) {
      goal.images = [];
    }
    goal?.images?.push(value);

    await dispatch(addOrUpdateFieldNoteGoal({ goal: goal, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));

  }
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
        <PhotoUpload getImageFileUploadedDetails={getImageFileUploadedDetails} getImageStoredUrl={getImageStoredUrl} ></PhotoUpload>
      </DialogContent >
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color='primary'
          size='small'
          onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}


export default GoalPhotoUpload;

