import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, List, ListItem, ListItemText, Grid, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { IInductionVolunteer } from 'src/redux/model/fieldNote.model';


function ManageVolunteer(props) {
  const classes = useStyles({});

  const { className = "", ...rest } = props;
  var volunteerSelected = props.volunteerSelected as IInductionVolunteer;

  const handleClose = () => {
    props.handleClose();
  }

  const handleChange = (event) => {
    props.handleChange(event)
  }

  const handleVolunteerUpdate = (event) => {
    event.preventDefault();
    props.handleVolunteerUpdate();
  }
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Manage Volunteer</DialogTitle>
      <DialogContent>

        {volunteerSelected ? (
          <div>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="First Name"
                  name="firstName"
                  value={volunteerSelected.firstName}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>

                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Last Name"
                  name="lastName"
                  value={volunteerSelected.lastName}
                  variant="outlined"
                  onChange={handleChange}

                />
              </Grid>

            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>

                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Email Address"
                  name="email"
                  value={volunteerSelected.email}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>

                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Phone"
                  name="phone"
                  value={volunteerSelected.phone}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
          </div>
        ) : (<div></div>)}

      </DialogContent>
      <DialogActions style={{ marginBottom: '18px' }}>
        <Button size="small"
          variant="contained"
          onClick={handleClose} color="primary" >
          Cancel
        </Button>
        <Button size="small"
          style={{ marginRight: '18px' }}
          variant="contained" onClick={handleVolunteerUpdate} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}


ManageVolunteer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  volunteerSelected: PropTypes.object,
  handleVolunteerUpdate: PropTypes.func,
  handleChange: PropTypes.func,
};

export default ManageVolunteer;

