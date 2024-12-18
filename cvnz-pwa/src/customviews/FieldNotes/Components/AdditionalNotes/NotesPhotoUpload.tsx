
import { Button, Dialog, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PhotoUpload from '../FieldNotePhotoUpload/PhotoUpload';
import { IFieldNoteAdditionalNote } from 'src/redux/model/fieldNote.model';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { addOrUpdateAdditionalFieldNote } from 'src/redux/actions/FieldNoteActions/fieldAdditionalNoteActions';


function NotesPhotoUpload(props) {
  const dispatch = useDispatch();
  let note = props.note as IFieldNoteAdditionalNote;
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const getImageFileUploadedDetails = (value) => {
    setUploadedFile(value);
  }
  const getImageStoredUrl = async (value) => {
    setFileUrl(value);

    if (!note.images) {
      note.images = [];
    }
    note?.images?.push(value);
    let savedNote = await dispatch(addOrUpdateAdditionalFieldNote({ note: note, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;


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
        <Button type="submit"
          variant="contained"
          color='primary'
          size='small' onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}


NotesPhotoUpload.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  note: PropTypes.object,
  handleClose: PropTypes.func,
};

export default NotesPhotoUpload;

