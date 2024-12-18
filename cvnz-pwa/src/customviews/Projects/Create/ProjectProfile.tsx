
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import ProjectDetails from './ProjectDetails';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Switch,
  TextField,
  Typography,
  colors
  , Theme
} from '@mui/material';
import SuccessSnackbar from './SuccessSnackbar';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  saveButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const stateOptions = ['Victoria', 'New South Wales', 'Tasmania'];

function ProjectProfile({ project, className = "", ...rest }) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);

  const [values, setValues] = useState<any>({
    ...project
  });

  const handleChange = event => {
    // debugger;
    event.persist();
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
  };

  const handleSubmit = event => {

    event.preventDefault();

    //save data to firebase


    // var testSate = dispatch(createNewProject(values));
    // debugger;
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (

    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <br />
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={8}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={handleChange}
                required
                value={values.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Primary Contact"
                name="primaryContact"
                onChange={handleChange}
                type="text"
                value={values.primaryContact}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <br />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.saveButton}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} />
    </Card>

  );
}

ProjectProfile.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectProfile;
