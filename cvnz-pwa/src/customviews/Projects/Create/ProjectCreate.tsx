
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SuccessSnackbar from './SuccessSnackbar';
import Page from '../../../components/Page';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Typography,
  LinearProgress
} from '@mui/material';
import GoogleMapsComponent from 'src/customviews/GoogleMap/GoogleMapsComponent';
import { useStyles } from 'src/customviews/Projects/styles/ProjectStyles'
import { LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';
import { IProject } from 'src/redux/model/project.model';
import { IOrganisation } from 'src/redux/model/organisation.model';
import ConfirmPopup from './ConfirmPopup';
import PdfUpload from './PdfUpload';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';


function ProjectCreate(props) {
  const project: IProject = props.project;
  const organisation: IOrganisation = props.organisation;
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const [projectError, setProjectError] = useState<any>("");
  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');

  useEffect(() => {
    setProjectError(props.error);
  }, [props.error])

  useEffect(() => {
    if (project) {
      setPdfFileUrl(project.inductionNotes);
    }
  }, [project])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditLabelChange = (name, value) => {
    props.onEditLabelChange(name, value);
  };
  const handleChange = event => {
    props.handleChange(event);
  };

  const handleSubmit = async (event) => {

    event.persist();
    if (project.address === null || project.city === null || project.projectType === null || project.location === null || project.phone === null) {
      setProjectError('Error ')
    } else {
      props.handleProjectSave(event);
    }
  };

  const handleFileUpload = event => {
    props.handleFileUpload(event);
  }

  const handleClick = event => {
    props.handleClick(event);
    setOpen(false);
  };

  const handleCoordinateChange = async (coordinates: LatLng, address: string, placeId: string) => {
    props.handleCoordinateChange(coordinates, address, placeId);
  };

  function hasLowerCase(str) {
    return /[A-Z]/.test(str);
  }
  const handleProjectArchive = (event) => {
    props.handleProjectArchive(event, project);
  }
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [pdfFileUrl, setPdfFileUrl] = useState<string>('');

  const getPdfFileUploadedDetails = (value) => {
    setUploadedFile(value);
  }

  const getPdfStoredUrl = (event, value) => {
    setPdfFileUrl(value);
    props.handlePdfChange(event, value);

  }
  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }

  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  return (
    <Page title="Project" className={classes.root} >

      <Grid container spacing={2}>

        <Grid item xl={6} md={6} lg={6} xs={12} sm={12}>
          <Card style={{ height: '100%' }}>
            <CardHeader title={project.projectName ? project.projectName : 'Project Name'} style={{ width: '100%' }} titleTypographyProps={{ variant: 'h4' }} />

            <CardContent>
              {
                props.uploading ? (<><LinearProgress></LinearProgress><div>Please wait for upload to complete before saving...</div></>) : (<div></div>)
              }

              <Grid container spacing={2} alignItems="center" alignContent="center">
                {
                  project.files === null || project.files === "" ? (
                    <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent} style={{ height: '315px' }}>
                      <input
                        //accept="image/*"
                        accept="image/jpeg, image/png"
                        className={classes.input}
                        id="icon-image-button-file"
                        type="file"
                        name="projectImage"
                        onChange={event => handleFileUpload(event)}
                      />
                      <label htmlFor="icon-image-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          style={{ alignContent: 'center' }}
                          size="large">
                          <PhotoCamera />
                        </IconButton>
                        <Typography> {'Click to upload project image'}</Typography>
                      </label>

                    </Grid>
                  ) : (
                    <Grid item md={12} xs={12} sm={12} lg={12} className={classes.imageParent}>
                      <div style={{ backgroundImage: `url('${project.files}')`, width: '100%', height: '300px', backgroundSize: 'cover' }} onClick={handleClickOpen} ></div>
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
                          <Button onClick={handleClose} color="primary">
                            No
                          </Button>
                          <Button onClick={handleClick} color="primary" autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  )}
              </Grid>
              <Typography gutterBottom variant="h3">
                InductionNotes
              </Typography>
              <PdfUpload fileUrl={pdfFileUrl} getPdfFileUploadedDetails={getPdfFileUploadedDetails}
                getPdfStoredUrl={getPdfStoredUrl} showImageInDiv={true}></PdfUpload>
            </CardContent>
          </Card>
        </Grid>
        {/** Profile Card */}
        <Grid item xl={6} md={6} lg={6} xs={12} sm={12}>
          <Card style={{ height: '100%' }}>

            <CardHeader title="Project Details" titleTypographyProps={{ variant: 'h4' }} />
            <CardContent>
              <div style={{ marginBottom: '20px', color: 'red' }}>
                {projectError}
              </div>
              {/* PROJECT NAME */}
              <Grid container spacing={2}>
                {/* PROJECT NAME */}
                <Grid item md={1} xs={2} alignItems="center"
                  container
                  justifyContent="center">
                  <TooltipDialog open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>
                  <Tooltip onClick={(event) => showMessage(event, 'Add project name')} title="Add project name" placement="top" className={classes.tooltipIcon}>
                    <IconButton size="large">
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={11} xs={10}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Project Name"
                    name="projectName"
                    onChange={handleChange}
                    required
                    value={project.projectName}
                    variant="outlined"
                  />
                </Grid>

              </Grid>
              <br />
              {/* PROJECT PURPOSE */}
              <Grid container spacing={2}>
                <Grid item md={1} xs={2} alignItems="center"
                  container
                  justifyContent="center">
                  <Tooltip onClick={(event) => showMessage(event, 'Project purpose text is limited to 150 words')} title="Project purpose text is limited to 150 words" placement="top" className={classes.tooltipIcon}>
                    <IconButton size="large">
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={11} xs={10}>
                  {/* PROJECT PURPOSE */}
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    inputProps={{
                      maxLength: 150,
                    }}

                    fullWidth
                    label="Project Purpose"
                    name="projectType"
                    onChange={handleChange}
                    required
                    value={project.projectType}
                    variant="outlined"
                    maxRows={5}
                    multiline={true}
                  />
                </Grid>
              </Grid>
              <br />

              <Grid container spacing={2} >
                <Grid item md={1} xs={2} alignItems="center"
                  container
                  justifyContent="center" >

                  <Tooltip onClick={(event) => showMessage(event, 'Add primary contact')} title="Add primary contact" placement="top" className={classes.tooltipIcon}>
                    <IconButton size="large">
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={5} xs={10}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Primary Contact"
                    name="primaryContact"
                    onChange={handleChange}
                    type="text"
                    value={project.primaryContact}
                    variant="outlined"
                    required

                  />
                </Grid>
                <Grid item md={1} xs={2} alignItems="center"
                  container
                  justifyContent="center">
                  {/* <CallIcon className={classes.icon} /> */}
                  <Tooltip
                    title="Add phone number" placement="top" className={classes.tooltipIcon}>
                    <IconButton onClick={(event) => showMessage(event, 'Add phone number')} size="large">
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item md={5} xs={10}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={project.phone}
                    variant="outlined"
                    required
                  />
                </Grid>
              </Grid>
              <br />
              <Grid item >
                <GoogleMapsComponent inputTitle="Project location" location={project.location} handleCoordinateChange={handleCoordinateChange}></GoogleMapsComponent>
              </Grid>
              <Grid item style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                {project.id ? (<Button
                  style={{ marginRight: '10px' }}
                  className={classes.archiveButton}
                  variant="contained"
                  onClick={handleProjectArchive}>
                  Archive Project
                </Button>) : (<div></div>)
                }

                <Button
                  type="submit"
                  variant="contained"
                  size='small'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SuccessSnackbar onClose={props.handleSnackbarClose} open={props.openSnackbar} />
    </Page >
  );
}
ProjectCreate.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  organisation: PropTypes.any,
  onEditLabelChange: PropTypes.func,
  handleProjectSave: PropTypes.func,
  handleFileUpload: PropTypes.func,
  handleChange: PropTypes.func,
  handlePdfChange: PropTypes.func,
  handleClick: PropTypes.func,
  openSnackbar: PropTypes.bool,
  uploading: PropTypes.bool,
  handleSnackbarClose: PropTypes.func,
  error: PropTypes.string,
  handleCoordinateChange: PropTypes.func,
  placeId: PropTypes.string,
  coordinatesLatLng: PropTypes.object,
  handleProjectArchive: PropTypes.func,
};
export default ProjectCreate;
