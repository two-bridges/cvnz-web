import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, List, ListItem, ListItemText, Grid, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { IInductionStaff } from 'src/redux/model/fieldNote.model';


function ManageStaff(props) {
  const classes = useStyles({});

  const { className = "", ...rest } = props;
  var staffSelected = props.staffSelected as IInductionStaff;

  const handleClose = () => {
    props.handleClose();
  }

  const handleChange = (event) => {
    props.handleChange(event)
  }

  const handleStaffUpdate = (event) => {
    event.preventDefault();
    props.handleStaffUpdate();
  }
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Typography variant="h6" style={{ marginLeft: '24px', marginTop: '24px' }}>
        Manage Staff
      </Typography>
      <DialogContent>

        {staffSelected ? (
          <div>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="First Name"
                  name="firstName"
                  value={staffSelected.firstName}
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
                  value={staffSelected.lastName}
                  variant="outlined"
                  onChange={handleChange}

                />
              </Grid>

            </Grid>
            <TextField
              fullWidth
              className={classes.spacing}
              label="Email Address"
              name="email"
              value={staffSelected.email}
              variant="outlined"
              onChange={handleChange}

            />
          </div>
        ) : (<div></div>)}

      </DialogContent>
      <DialogActions style={{ marginBottom: '18px' }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{ marginRight: '18px' }}
          onClick={handleStaffUpdate} color="primary" autoFocus>
          Update
        </Button>
      </DialogActions>

    </Dialog>
  )
}


ManageStaff.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  staffSelected: PropTypes.object,
  handleStaffUpdate: PropTypes.func,
  handleChange: PropTypes.func,
};

export default ManageStaff;

