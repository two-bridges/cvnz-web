import { Button, Card, CardMedia, LinearProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from 'src/customviews/Projects/styles/ProjectStyles';
import IconButton from '@mui/material/IconButton';
import { PictureAsPdf, OpenInNew, PhotoCamera } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { myFirebase } from 'src/firebase/firebase';
import uuid from 'uuid/v1';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import ViewPdfPopup from './ViewPdfPopup';

function PdfUpload(props) {

  const classes = useStyles({});
  const [files, setFiles] = useState<any>('');
  const [open, setOpen] = React.useState(false);
  const [uploading, setUpload] = React.useState(false);
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [viewUploadedPdf, setViewUploadedPdf] = useState<boolean>(false);

  useEffect(() => {
    setFiles(props.fileUrl);
  }, [props.fileUrl]);

  const handlePdfFileUpload = async (event) => {
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
          props.getPdfFileUploadedDetails(base64data);
        };
        await saveFileToFirebaseStorage(event);

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

      storage.ref(`pdf/p--organisation-project/${uuid()}--${file.name}`).put(file).then(async (snapshot) => {
        let imgUrl = await snapshot.ref.getDownloadURL();
        props.getPdfStoredUrl(event, imgUrl);
        if (!props.showImageInDiv) {
          setFiles(null);
        }
        setUpload(false);

        setOpenSnackbar(true);
        setOpenErrorSnackbar(false);
        setMessage('Saved Succesfully');
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
    props.getPdfStoredUrl(event, '');
  };
  const showPdf = () => {
    // setViewUploadedPdf(true);
    window.open(props.fileUrl);
  }
  const handleCloseViewPdfPopup = () => {
    setViewUploadedPdf(false);
  }

  return (
    <div>
      {
        uploading ? (<><LinearProgress></LinearProgress><Typography style={{ height: '100px' }}>Uploading</Typography></>) : (<div></div>)
      }
      <Card style={{ marginTop: '10px' }}>
        <MessageSnackbar open={openSnackbar} onClose={closeSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
        <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
        <ViewPdfPopup open={viewUploadedPdf} fileUrl={props.fileUrl} handleCloseViewPdfPopup={handleCloseViewPdfPopup}></ViewPdfPopup>
        <CardMedia className={classes.media}>

          {/* ADD PDF */}
          <Grid container spacing={2} alignItems="center" alignContent="center">
            {
              uploading
                ? (
                  <></>
                )
                : files === null || files === "" || files === undefined
                  ? (

                    <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent} style={{ height: '315px' }}>
                      <input
                        accept="application/pdf"
                        // accept="pdf/*"
                        className={classes.input}
                        id="icon-pdf-button-file"
                        type="file"
                        name="projectImage"
                        onChange={event => handlePdfFileUpload(event)}
                      />
                      <label htmlFor="icon-pdf-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload pdf"
                          component="span"
                          className={classes.cameraIcon}
                          size="large">
                          <PictureAsPdf />
                        </IconButton>
                        <Typography> {props.uploadText ? props.uploadText : 'Upload Project Induction Instructions'}</Typography>
                      </label>
                    </Grid>
                  )
                  : (
                    <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent}>
                      <div style={{
                        width: '100%', maxWidth: '100%',
                        maxHeight: '100%', backgroundSize: 'cover'
                      }}>
                        <div>
                          <Button color="primary"
                            size="small"
                            variant="contained" style={{ marginRight: '10px' }} onClick={showPdf}>SHOW NOTES</Button>
                          <Button size="small" variant="contained" onClick={handleClickOpen}>DELETE</Button>
                        </div>
                      </div>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{"Delete the project induction file?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Please confirm, if you would like to delete the pdf.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            No
                          </Button>
                          <Button onClick={handleClick} color="primary" autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  )
            }
          </Grid>
        </CardMedia>
      </Card>
    </div >
  );
}

PdfUpload.propTypes = {
  getPdfFileUploadedDetails: PropTypes.func,
  getPdfStoredUrl: PropTypes.func,
  organisation: PropTypes.object,
  showImageInDiv: PropTypes.bool,
  fileUrl: PropTypes.string,
  uploadText: PropTypes.string,
}
export default PdfUpload;