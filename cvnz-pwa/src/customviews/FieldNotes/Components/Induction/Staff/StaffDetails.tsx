import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { IInductionStaff } from 'src/redux/model/fieldNote.model';
import AddStaff from './AddStaff';
import FieldNoteStaffList from './FieldNoteStaffList';
import ManageStaff from './ManageStaff';
import { addOrUpdateFieldNoteStaff } from 'src/redux/actions/FieldNoteActions/fieldNoteStaffActions';
import DeletePopup from './DeletePopup';
import { Card, CardActions, Grid, Button } from '@mui/material';
import { useParams } from 'react-router';
import { dateToIso } from 'src/redux/actions/apiStatusActions';
import { Store } from 'src/redux/reducers/rootReducer';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { getOrgStaffsFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteStaffListActions';


function StaffDetails(props) {
  const dispatch = useDispatch();
  const [staffSelectedToBeUpdated, setStaffSelectedToBeUpdated] = useState<IInductionStaff | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();
  const staffError = useSelector((state: Store) => state?.fieldNoteStaff.lastError);

  useEffect(() => {
    dispatch(getOrgStaffsFromFirebase(fieldNoteParams.organisation));
  }, []);
  
  if (staffError) {
    setMessage(staffError);
    setOpenErrorSnackbar(true);
  }
  function handleUpdateDialogOpen() {
    setOpen(true);
  }
  function handleAddDialogOpen() {
    setOpenAddPopup(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleDeletePopupClose(event) {
    event.preventDefault();
    setOpenDeletePopup(false);
  }
  function handleAddPopupClose() {
    setOpenAddPopup(false);
  }
  function staffSelectedForUpdate(staff: IInductionStaff) {
    if (staff) {
      setStaffSelectedToBeUpdated(staff);
      handleUpdateDialogOpen();
    } else {
    }
  }

  function staffSelectedForDelete(staff: IInductionStaff) {
    if (staff) {
      setOpenDeletePopup(true);
      setStaffSelectedToBeUpdated(staff);
    } else {
    }
  }

  async function deleteSelectedStaff(event) {
    event.preventDefault();
    if (staffSelectedToBeUpdated) {
      staffSelectedToBeUpdated.deleted_utc = dateToIso(new Date());
      let staffDeleted = await dispatch(addOrUpdateFieldNoteStaff({ staff: staffSelectedToBeUpdated, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (staffDeleted) {
        setMessage("Staff Deleted!")
        setOpenSuccessSnackbar(true);
        setOpenDeletePopup(false);
      }
    }
  }
  async function updateStaff() {
    if (staffSelectedToBeUpdated) {
      let staffSaved = await dispatch(addOrUpdateFieldNoteStaff({ staff: staffSelectedToBeUpdated, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (staffSaved) {
        setMessage("Staff Updated!")
        setOpenSuccessSnackbar(true);
        handleClose();
      }
    }
  }
  async function handleChange(event) {
    setStaffSelectedToBeUpdated({
      ...staffSelectedToBeUpdated,
      [event.target.name]: event.target.value
    } as any);
  }

  function handleNext() {
    props.handleNext();
  }
  function handleBack() {
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
      <AddStaff open={openAddPopup} handleClose={handleAddPopupClose}></AddStaff>
      <FieldNoteStaffList handleAddPopupOpen={handleAddDialogOpen} selectedStaffForUpdate={staffSelectedForUpdate} selectedStaffForDelete={staffSelectedForDelete}></FieldNoteStaffList>
      <ManageStaff
        open={open}
        handleStaffUpdate={updateStaff}
        handleClose={handleClose}
        staffSelected={staffSelectedToBeUpdated}
        handleChange={handleChange}
      ></ManageStaff>
      <DeletePopup open={openDeletePopup} closeDeletePopup={handleDeletePopupClose} deleteSelectedItem={deleteSelectedStaff}></DeletePopup>
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
    </div>
  );
}

StaffDetails.propTypes = {
  className: PropTypes.string,
  selectedStaffForUpdate: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default StaffDetails
  ;

