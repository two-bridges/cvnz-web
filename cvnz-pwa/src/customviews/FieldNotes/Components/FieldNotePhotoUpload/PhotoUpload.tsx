import { Button, Card, CardMedia, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from 'src/customviews/Projects/styles/ProjectStyles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PropTypes from 'prop-types';
import { myFirebase } from 'src/firebase/firebase';
import uuid from 'uuid/v1';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';


function PhotoUpload(props) {

  const classes = useStyles({});
  const [files, setFiles] = useState<any>('');
  const [open, setOpen] = React.useState(false);
  const [uploading, setUpload] = React.useState(false);
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);

  useEffect(() => {
    setFiles(props.fileUrl);
  }, [props.fileUrl]);
  const handleFileUpload = event => {
    if (navigator.onLine) {
      setUpload(true);
      var uploadFiles = event.target.files;
      if (uploadFiles !== null && uploadFiles.length !== 0) {
        var file = uploadFiles[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function () {
          var base64data = reader.result;
          setFiles(base64data);
          props.getImageFileUploadedDetails(base64data);
        };
        saveFileToFirebaseStorage(event);
        setOpenErrorSnackbar(false);
        setMessage('Saved Succesfully');
      }
    } else {
      setOpenSnackbar(false);
      setOpenErrorSnackbar(true);
      setMessage('No internet connection, please try again later.');

    }
  }

  const saveFileToFirebaseStorage = async (event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    var uploadFiles = target.files;
    if (uploadFiles !== null && uploadFiles.length !== 0) {

      var file = uploadFiles[0];
      let storage = myFirebase.storage();

      storage.ref(`images/p--organisation-project/${uuid()}--${file.name}`).put(file).then(async (snapshot) => {
        let imgUrl = await snapshot.ref.getDownloadURL();
        props.getImageStoredUrl(imgUrl);
        if (!props.showImageInDiv) {
          setFiles(null);
        }
        setUpload(false);
        setOpenSnackbar(true);

      }, reason => {
        console.log("Upload failed..");
        console.log(reason);
      });
    }
  }
  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }

  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setFiles(null);
    setOpen(false);
    props.getImageStoredUrl(null);
  };
  return (
    <div>
      {
        uploading ? (<><LinearProgress></LinearProgress><div>Please wait for upload to complete before saving...</div></>) : (<div></div>)
      }

      <MessageSnackbar open={openSnackbar} onClose={closeSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
      {/* ADD IMAGE */}
      <Grid container spacing={2} alignItems="center" alignContent="center">
        {
          files === null || files === "" || files === undefined ? (
            <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent} style={{ height: '315px' }}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                name="projectImage"
                onChange={event => handleFileUpload(event)}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className={classes.cameraIcon}
                  size="large">
                  <PhotoCamera />
                </IconButton>
                <Typography> {props.uploadText ? props.uploadText : 'Upload Image'}</Typography>
              </label>
            </Grid>
          ) : (
            <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent}>
              <div style={{
                backgroundImage: `url('${files}')`, width: '100%', height: '415px', maxWidth: '100%',
                maxHeight: '100%', backgroundSize: 'cover'
              }} onClick={handleClickOpen} ></div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete the project image?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please confirm, if you would like to delete the image.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    size='small'
                    variant="contained"
                    onClick={handleClose} color="primary">
                    No
                  </Button>
                  <Button
                    type="submit"
                    size='small'
                    variant="contained"
                    onClick={handleClick} color="primary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          )}
      </Grid>

    </div>
  );
}

PhotoUpload.propTypes = {
  getImageFileUploadedDetails: PropTypes.func,
  getImageStoredUrl: PropTypes.func,
  organisation: PropTypes.object,
  showImageInDiv: PropTypes.bool,
  fileUrl: PropTypes.string,
  uploadText: PropTypes.string,
}
export default PhotoUpload;