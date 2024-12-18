
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import EditableLabel from 'react-editable-label';
import EditIcon from '@mui/icons-material/Edit';
import ImageUploader from 'react-images-upload';
import { DropzoneArea } from 'material-ui-dropzone';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  Typography,
  Button,
  Divider,
  Grid,
  Fab
  , Theme
} from '@mui/material';
import typography from '../../../theme/typography';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  content: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    textAlgin: 'left'
  },
  name: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row'
  },

  removeBotton: {
    width: '100%'
  },
  media: {
    width: '100%',
    height: '100%'
  },

  groups: {
    marginTop: theme.spacing(5)
  },
  group: {
    marginTop: theme.spacing(2)
  },
  inlinelabel: {
    color: 'primary'
  },
  inlineInput: {
    color: 'secondary'
  },
  imageUpload: {
    display: 'none'
  },
  cameraIcon: {
    width: '100%',
    height: 160
  },
  uploadedImage: {
    maxWidth: "90%",
    maxHeight: "200px",
  }
}));

function ProjectDetails({ project, className = "", ...rest }) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any>(project.projectImage);
  const [values, setValues] = useState<any>({
    ...project
  });

  //event.target.files[0]

  const handleChange = (name, event) => {
    // debugger;
    setValues({
      ...values,
      [name]:
        event
    });

    project = { ...values };
    //dispatch(createNewProject(values));
  };

  const handleFileUpload = event => {
    // debugger;
    var uploadFiles = event.target.files;
    if (uploadFiles !== null && uploadFiles.length !== 0) {

      var file = uploadFiles[0];
      // var reader = file.stream();
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function () {
        var base64data = reader.result;
        setFiles(base64data);
      };
      setValues({
        ...values,
        [event.target.name]:
          event.target.value
      });

      //dispatch(createNewProject(values));
    }
  }
  const handleClick = event => {
    setFiles(null);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardMedia className={classes.media}>
        {files === null ? (
          <Typography>
            <input
              accept="image/jpeg, image/png"
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
            </label>
          </Typography>
        ) : (
          <Typography align="right">
            <IconButton color="primary" name="projectImage" onClick={handleClick} size="large">
              <CloseIcon />
            </IconButton>
            <img src={files} className={classes.uploadedImage} />
          </Typography>
        )}
      </CardMedia>

      <CardContent className={classes.content}>
        <Typography
          className={classes.name}
          gutterBottom
          variant="h4"
          align="left"
        >


          <EditableLabel
            name="projectName"
            initialValue={values.projectName}
            onChange={handleChange}
            save={event => handleChange("projectName", event)}
          ></EditableLabel>

          <EditIcon color="primary" />

        </Typography>
        <br />
        <Typography align="left" variant="h5" className={classes.name}>
          <EditableLabel
            initialValue={values.projectType}
            onChange={handleChange}
            save={event => handleChange("projectType", event)}
          ></EditableLabel>
          <EditIcon color="primary" />
        </Typography>

      </CardContent>
    </Card>
  );
}

ProjectDetails.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectDetails;
