import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateFieldNoteVolunteer } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerActions';
import { IInductionVolunteer } from 'src/redux/model/fieldNote.model';
import AddVolunteer from './AddVolunteer';
import FieldNoteVolunteerList from './FieldNoteVolunteerList';
import ManageVolunteer from './ManageVolunteer';
import DeletePopup from '../Staff/DeletePopup';
import { Grid, Button, Card, CardActions } from '@mui/material';
import { useParams } from 'react-router';
import { Store } from 'src/redux/reducers/rootReducer';
import { dateToIso } from 'src/redux/actions/apiStatusActions';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { getOrgVolunteersFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteVolunteerListActions';


function VolunteerDetails(props) {
  const dispatch = useDispatch();
  const [volunteerSelectedToBeUpdated, setVolunteerSelectedToBeUpdated] = useState<IInductionVolunteer | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();
  const volunteerError = useSelector((state: Store) => state?.fieldNoteVolunteer.lastError);

  useEffect(() => {
    dispatch(getOrgVolunteersFromFirebase(fieldNoteParams.organisation));
  }, [])
  if (volunteerError) {
    setMessage(volunteerError);
    setOpenErrorSnackbar(true);
  }

  function handleAddDialogOpen() {
    setOpenAddPopup(true);
  }

  function handleAddPopupClose() {
    setOpenAddPopup(false);
  }
  function handleUpdateDialogOpen() {
    setOpen(true);
  }
  function volunteerSelectedForUpdate(volunteer: IInductionVolunteer) {
    if (volunteer) {
      setVolunteerSelectedToBeUpdated(volunteer);
      handleUpdateDialogOpen();
    } else {
    }
  }
  function handleClose() {
    setOpen(false);
  }
  async function updateVolunteer() {
    if (volunteerSelectedToBeUpdated) {
      let volunteerSaved = await addOrUpdateInFirebase(volunteerSelectedToBeUpdated);
      if (volunteerSaved) {
        setMessage("Volunteer Updated!")
        setOpenSuccessSnackbar(true);
        handleClose();
      }
    }
  }

  const addOrUpdateInFirebase = async (volunteer: IInductionVolunteer) => {
    let volunteerSaved = await dispatch(addOrUpdateFieldNoteVolunteer({ volunteer: volunteer, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
    return volunteerSaved;
  }
  async function handleChange(event) {
    setVolunteerSelectedToBeUpdated({
      ...volunteerSelectedToBeUpdated,
      [event.target.name]: event.target.value
    } as any);
  }

  function volunteerSelectedForDelete(volunteer: IInductionVolunteer) {
    if (volunteer) {
      setOpenDeletePopup(true);
      setVolunteerSelectedToBeUpdated(volunteer);
    } else {
    }
  }

  function handleDeletePopupClose() {
    setOpenDeletePopup(false);
  }

  async function deleteSelectedVolunteer(event) {
    event.preventDefault();
    if (volunteerSelectedToBeUpdated) {
      volunteerSelectedToBeUpdated.deleted_utc = dateToIso(new Date());
      let volDeleted = await addOrUpdateInFirebase(volunteerSelectedToBeUpdated);
      if (volDeleted) {
        setMessage("Volunteer Deleted!")
        setOpenSuccessSnackbar(true);
        setOpenDeletePopup(false);
      }
    }
  }

  const handleNext = () => {
    props.handleNext();
  }
  const handleBack = () => {
    props.handleBack();
  }
  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const closeSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  }
  return (
    <div>
      <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
      <MessageSnackbar open={openSuccessSnackbar} onClose={closeSuccessSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <AddVolunteer open={openAddPopup} handleClose={handleAddPopupClose}></AddVolunteer>
      <FieldNoteVolunteerList
        handleChange={handleChange}
        addOrUpdateInFirebase={addOrUpdateInFirebase}
        handleBack={handleBack}
        handleNext={handleNext}
        handleAddPopupOpen={handleAddDialogOpen}
        selectedVolunteerForUpdate={volunteerSelectedForUpdate}
        selectedVolunteerForDelete={volunteerSelectedForDelete}></FieldNoteVolunteerList>
      <ManageVolunteer
        open={open}
        handleVolunteerUpdate={updateVolunteer}
        handleClose={handleClose}
        volunteerSelected={volunteerSelectedToBeUpdated}
        handleChange={handleChange}
      ></ManageVolunteer>
      <DeletePopup open={openDeletePopup} closeDeletePopup={handleDeletePopupClose} deleteSelectedItem={deleteSelectedVolunteer}></DeletePopup>
      <Card style={{ marginTop: '10px' }}>
        <CardActions>
          <Grid container justifyContent="flex-end" >
            <Button
              style={{ marginRight: '10px' }}
              color="primary"
              variant="contained"
              size='small'
              onClick={handleBack}>
              BACK
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div >
  );
}

VolunteerDetails.propTypes = {
  className: PropTypes.string,
  selectedVolunteerForUpdate: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default VolunteerDetails
  ;

