import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { HelperService } from 'src/lib/helper';
import { CreateNewInductionStaff, IInductionStaff } from 'src/redux/model/fieldNote.model';
import PropTypes from 'prop-types';
import { addOrUpdateFieldNoteStaff } from 'src/redux/actions/FieldNoteActions/fieldNoteStaffActions';
import { useParams } from 'react-router';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import _ from 'underscore';
import { Store } from 'src/redux/reducers/rootReducer';
import { getFieldNoteStaffsFromFirebase, getOrgStaffsFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteStaffListActions';
import OrgExistingStaffListPopup from './OrgExistingStaffListPopup';


function AddStaff(props) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [staffError, setStaffError] = useState<any>("");

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [matchingStaffs, setMatchingStaffs] = useState<IInductionStaff[]>([]);

  const [openStaffList, setOpenStaffList] = useState<boolean>(false);
  const orgStaffs = useSelector((state: Store) => state?.fieldNoteStaffList.orgStaffList);

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const staffStateList = useSelector((state: Store) => state?.fieldNoteStaffList?.list, (prev, next) => {
    return prev === next;
  });

  useEffect(() => {
    setMatchingStaffs([]);
    dispatch(getOrgStaffsFromFirebase(fieldNoteParams.organisation));
    dispatch(getFieldNoteStaffsFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, [])

  const handleFirstNameChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let firstNameMatch = orgStaffs.filter(l => l.firstName.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingStaffs(firstNameMatch);
      setFirstName(event.target.value);
    } else {
      setMatchingStaffs([]);
      setFirstName("");
    }
  }
  const handleLastNameChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let firstNameMatch = orgStaffs.filter(l => l.firstName.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingStaffs(firstNameMatch);
      setLastName(event.target.value);
    } else {
      setMatchingStaffs([]);
      setLastName("");
    }
  }

  const handleEmailChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let firstNameMatch = orgStaffs.filter(l => l.firstName.toLowerCase().includes(event.target.value.toLowerCase()));
      setMatchingStaffs(firstNameMatch);
      setEmail(event.target.value);
    } else {
      setMatchingStaffs([]);
      setEmail("");
    }
  }

  const createStaff = () => {
    let newStaff = CreateNewInductionStaff();
    newStaff.firstName = firstName;
    newStaff.lastName = lastName;
    newStaff.email = email;
    newStaff.orgId = fieldNoteParams.organisation;
    return newStaff;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let staff = createStaff();
    if (!staff.email) {
      setStaffError("Please enter email address");
    }
    else if (HelperService.isValidEmail(staff.email)) {
      let staffSaved = await dispatch(addOrUpdateFieldNoteStaff({ staff: staff, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (staffSaved) {
        await dispatch(getOrgStaffsFromFirebase(fieldNoteParams.organisation));
        setMessage("Staff Added!")
        setOpenSuccessSnackbar(true);
        clearData();
        handleClose();
        setMatchingStaffs([]);
      } else {
        setStaffError("Unable to save data");
      }
    }
    else {
      setStaffError("Please enter valid email address");
    }
  }

  const clearData = () => {
    setStaffError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMatchingStaffs([]);
  }

  const handleClose = () => {
    clearData();
    props.handleClose();
  }

  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const closeSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  }

  const closeStaffListPopup = () => {
    setOpenStaffList(false);
  }
  const addSelectedStaff = async (staff: IInductionStaff) => {
    let existingStaff = _.find(staffStateList, l => l.email === staff.email);
    if (existingStaff) {
      setOpenErrorSnackbar(true);
      setMessage("Staff already exists");
      clearData();
    } else {
      staff.id = "";
      staff.fieldNoteId = fieldNoteParams.fieldNoteId;
      staff.orgId = fieldNoteParams.organisation;
      let staffSaved = await dispatch(addOrUpdateFieldNoteStaff({ staff: staff, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (staffSaved) {
        await dispatch(getOrgStaffsFromFirebase(fieldNoteParams.organisation));
        setMessage("Staff Added!")
        setOpenSuccessSnackbar(true);
        clearData();
        handleClose();
      } else {
        setStaffError("Unable to save data");
      }
    }
  }

  const openListPopup = () => {
    setOpenStaffList(true)
  }
  return (
    <div>
      <OrgExistingStaffListPopup closeStaffListPopup={closeStaffListPopup} addSelectedStaff={addSelectedStaff} matchingStaffs={matchingStaffs} open={openStaffList}></OrgExistingStaffListPopup>
      <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
      <MessageSnackbar open={openSuccessSnackbar} onClose={closeSuccessSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <Dialog
        fullWidth
        open={props.open}
        onClose={handleClose}>
        <>
          <Typography variant="h6" style={{ marginLeft: '24px', marginTop: '24px' }}>
            Add Staff
          </Typography>
          {
            matchingStaffs.length > 0 ? (
              <div onClick={openListPopup} style={{ cursor: "pointer" }}>
                <Typography variant="body2" style={{ marginLeft: '24px', marginTop: '24px' }} >
                  <a>{matchingStaffs.length} matches found. Click here to view</a>
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
            <div>
              <TextField
                fullWidth
                type='email'
                className={classes.spacing}
                label="Email Address"
                name="email"
                value={email}
                variant="outlined"
                onChange={handleEmailChange}
                error={!!staffError}
                helperText={staffError}
              />
            </div>
          </div>

        </DialogContent>
        <DialogActions style={{ marginBottom: '18px' }}>
          <Grid item alignItems="flex-end" container justifyContent="flex-end"
          >
            <Button color='primary' onClick={handleClose} type="submit" size='small' style={{ marginRight: '10px' }} variant="contained">
              Cancel
            </Button>
            <Button color='primary' onClick={handleSubmit} type="submit" size='small' style={{ marginRight: '18px' }} variant="contained">
              Add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddStaff.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default AddStaff;