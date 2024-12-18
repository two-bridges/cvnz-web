import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { HelperService } from 'src/lib/helper';
import { addOrUpdateFieldNoteVolunteer, setVolunteerError } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerActions';
import { CreateNewInductionVolunteer, IInductionVolunteer } from 'src/redux/model/fieldNote.model';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { Store } from 'src/redux/reducers/rootReducer';
import { getFieldNoteVolunteersFromFirebase, getOrgVolunteersFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerListActions';
import OrgExistingVolunteerListPopup from './OrgExistingVolunteerListPopup';
import _ from 'underscore';

function AddVolunteer(props) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [matchingVolunteers, setMatchingVolunteers] = useState<IInductionVolunteer[]>([]);
  const [emailError, setEmailError] = useState<any>("");
  const [phoneError, setPhoneError] = useState<any>("");

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [openVolList, setOpenVolList] = useState<boolean>(false);

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();
  const orgVolunteers = useSelector((state: Store) => state?.fieldNoteVolunteerList.orgVolList);
  const volunteerStateList = useSelector((state: Store) => state?.fieldNoteVolunteerList?.list, (prev, next) => {
    return prev === next;
  });
  useEffect(() => {
    setMatchingVolunteers([]);
    dispatch(getFieldNoteVolunteersFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));

  }, [])
  const handleFirstNameChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let firstNameMatch = orgVolunteers.filter(l => l.firstName.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingVolunteers(firstNameMatch);
      setFirstName(event.target.value);
    } else {
      setMatchingVolunteers([]);
      setFirstName("");
    }
  }
  const handleLastNameChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let lastNameMatch = orgVolunteers.filter(l => l.lastName.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingVolunteers(lastNameMatch);
      setLastName(event.target.value);
    } else {
      setMatchingVolunteers([]);
      setLastName("");
    }
  }

  const handleEmailChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let emailMatch = orgVolunteers.filter(l => l.email.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingVolunteers(emailMatch);
      setEmail(event.target.value);
    } else {
      setMatchingVolunteers([]);
      setEmail("");
    }
  }

  const handlePhoneChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let phoneMatch = orgVolunteers.filter(l => l.phone.includes(event.target.value));
      setMatchingVolunteers(phoneMatch);
      setPhone(event.target.value);
    } else {
      setMatchingVolunteers([]);
      setPhone("");
    }
  }

  const createVolunteer = () => {
    let newVolunteer = CreateNewInductionVolunteer();
    newVolunteer.firstName = firstName;
    newVolunteer.lastName = lastName;
    newVolunteer.email = email;
    newVolunteer.phone = phone;
    newVolunteer.orgId = fieldNoteParams.organisation;
    return newVolunteer;
  }

  const handleClose = () => {
    clearData();
    props.handleClose();

  }

  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }
  const closeVolListPopup = () => {
    setOpenVolList(false);
  }
  const closeSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let volunteer = createVolunteer();
    if (!volunteer.email) {
      setEmailError("Please enter email address");
    }
    if (!volunteer.phone) {
      setPhoneError("Please enter phone number");
    }
    else if (HelperService.isValidEmail(volunteer.email) && HelperService.isPhoneValid(volunteer.phone)) {
      let volunteerSaved = await dispatch(addOrUpdateFieldNoteVolunteer({ volunteer: volunteer, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (volunteerSaved) {
        await dispatch(getOrgVolunteersFromFirebase(fieldNoteParams.organisation));
        setMessage("Volunteer Added!")
        setOpenSuccessSnackbar(true);
        clearData();
        handleClose();
        setMatchingVolunteers([]);

      } else {
        setVolunteerError("Unable to save data");
      }
    }
    else {
      if (!HelperService.isValidEmail(volunteer.email)) {
        setEmailError("Please enter valid email address");
      } else {
        setEmailError("");
      }
      if (!HelperService.isPhoneValid(volunteer.phone)) {
        setPhoneError("Please enter valid phone number");
      } else {
        setPhoneError("");
      }
    }
  }

  const clearData = () => {
    setEmailError("");
    setPhoneError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMatchingVolunteers([]);
    setPhone("");
  }

  const openListPopup = () => {
    setOpenVolList(true)
  }

  const addSelectedVolunter = async (volunteer: IInductionVolunteer) => {
    let existingVolunteer = _.find(volunteerStateList, l => l.email === volunteer.email);
    if (existingVolunteer) {
      setOpenErrorSnackbar(true);
      setMessage("Volunteer already exists");
      clearData();

    } else {

      volunteer.id = "";
      volunteer.fieldNoteId = fieldNoteParams.fieldNoteId;
      volunteer.inductionStatus = false;
      volunteer.orgId = fieldNoteParams.organisation;
      let volunteerSaved = await dispatch(addOrUpdateFieldNoteVolunteer({ volunteer: volunteer, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (volunteerSaved) {
        await dispatch(getOrgVolunteersFromFirebase(fieldNoteParams.organisation));
        setMessage("Volunteer Added!")
        setOpenSuccessSnackbar(true);
        clearData();
        handleClose();
      } else {
        setVolunteerError("Unable to save data");
      }
    }
  }

  return (
    <div>
      <OrgExistingVolunteerListPopup closeVolListPopup={closeVolListPopup} addSelectedVolunter={addSelectedVolunter} matchingVolunteers={matchingVolunteers} open={openVolList}></OrgExistingVolunteerListPopup>
      <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
      <MessageSnackbar open={openSuccessSnackbar} onClose={closeSuccessSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <Dialog
        fullWidth
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <Typography variant="h6" style={{ marginLeft: '24px', marginTop: '24px' }}>
            Add Volunteer
          </Typography>
          {
            matchingVolunteers.length > 0 ? (

              <div onClick={openListPopup} style={{ cursor: "pointer" }}>
                <Typography variant="body2" style={{ marginLeft: '24px', marginTop: '24px' }} >
                  <a>{matchingVolunteers.length} matches found. Click here to view</a>
                </Typography>
              </div>
            ) : (<div></div>)

          }
        </>

        <DialogContent>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="First Name"
                  name="First Name"
                  value={firstName}
                  variant="outlined"
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={6}>

                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Last Name"
                  name="Last Name"
                  value={lastName}
                  variant="outlined"
                  onChange={handleLastNameChange}

                />
              </Grid>

            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Email Address"
                  name="Email Address"
                  value={email}
                  variant="outlined"
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  className={classes.spacing}
                  label="Phone"
                  name="phone"
                  value={phone}
                  variant="outlined"
                  onChange={handlePhoneChange}
                  error={!!phoneError}
                  helperText={phoneError}
                />
              </Grid>

            </Grid>
          </div>

        </DialogContent>
        <DialogActions style={{ marginBottom: '18px' }}>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
          >
            <Button color='primary' onClick={handleClose} type="submit" size='small' style={{ marginRight: '10px' }} variant="contained">
              Cancel
            </Button>
            <Button color='primary' style={{ marginRight: '18px' }} onClick={handleSubmit} type="submit" size='small' variant="contained">
              Add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div >
  );
}

AddVolunteer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default AddVolunteer;