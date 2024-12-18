import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SuccessSnackbar from './SuccessSnackbar';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import Page from '../../../components/Page';
import CallIcon from '@mui/icons-material/Call';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
  Theme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  colors
} from '@mui/material';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {

  },

  archiveButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.orange[800],
    '&:hover': {
      backgroundColor: colors.orange[900]
    }
  },
}));
function ArchiveProject(props) {
  const { project, organisation, className = "", ...rest } = props;
  const classes = useStyles({});


  const handleProjectArchive = () => {
    props.handleProjectArchive(project);
  }
  return (
    <Grid item lg={6} md={6} xl={6} xs={12} >
      <Grid>
        <Card >
          <CardHeader title="Archive Project" titleTypographyProps={{ variant: 'h4' }} ></CardHeader>
          <CardContent>
            <Button
              className={classes.archiveButton}
              variant="contained"
              onClick={handleProjectArchive}>
              Archive Project
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
ArchiveProject.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,

  handleProjectArchive: PropTypes.func,

};
export default ArchiveProject;