
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrUpdateFieldNoteImage } from 'src/redux/actions/FieldNoteActions/fieldNoteImageActions';
import { CreateNewFieldNoteAdditionalNote, CreateNewImageUpload } from 'src/redux/model/fieldNote.model';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { IProject } from 'src/redux/model/project.model';
import PhotoUpload from '../FieldNotePhotoUpload/PhotoUpload';
import PhotoUploadedList from './PhotoUploadedList';

import PropTypes from 'prop-types';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';

function PhotoUploadTab(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});
  const project = props.project as IProject;
  const organisation = props.organisation as IOrganisation;
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

  const getImageFileUploadedDetails = (value) => {
    setUploadedFile(value);
  }

  const getImageStoredUrl = (value) => {
    setFileUrl(value);
    let newImage = CreateNewImageUpload();
    newImage.imgUrl = value;
    dispatch(addOrUpdateFieldNoteImage(newImage, 'add'));

  }
  function handleNext() {
    props.handleNext();
  }
  function handleBack() {
    props.handleBack();
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={'Images'} style={{ width: '100%' }} titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <PhotoUpload getImageFileUploadedDetails={getImageFileUploadedDetails} getImageStoredUrl={getImageStoredUrl} ></PhotoUpload>
        <Divider />
        {/* <PhotoUploadedList project={project} organisation={organisation}></PhotoUploadedList> */}
      </CardContent>

      <CardActions style={{ marginTop: '15px', marginBottom: '15px' }}>
        <Grid item alignItems="flex-end"
          container
          justifyContent="flex-end"
          spacing={3}>
          <Button
            style={{ marginRight: '10px' }}
            color="primary"
            variant="contained"
            size='small'
            onClick={handleBack}>
            BACK
          </Button>
          <Button
            color="primary"
            variant="contained"
            size='small'
            onClick={handleNext}>
            NEXT
          </Button>
        </Grid>

      </CardActions>
    </Card>
  );
}

PhotoUploadTab.propTypes = {
  project: PropTypes.object,
  organisation: PropTypes.object,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default PhotoUploadTab;