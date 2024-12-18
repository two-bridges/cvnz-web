import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMarginStyles } from 'src/styles/MarginStyle';
import PropTypes from 'prop-types';
import ProjectDropdown from './ProjectDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import GoogleMapsComponent from 'src/customviews/GoogleMap/GoogleMapsComponent';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { HelperService } from 'src/lib/helper';
import { IGoal } from 'src/redux/model/goal.model';
import _ from 'underscore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dateToIso } from 'src/redux/actions/apiStatusActions';
import { useHistory } from 'react-router-dom';
import DeletePopup from '../Induction/Staff/DeletePopup';
import ConfirmPopup from 'src/customviews/Projects/Create/ConfirmPopup';
import { useParams } from 'react-router';
import { IFieldNote } from 'src/redux/model/fieldNote.model';
import { addOrUpdateFieldNote, getFieldNoteFromFirebase, setFieldNote, unsetFieldNote } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';
import { getProjectRisksFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteRisksActions';
import { addOrUpdateFieldNoteRisk } from 'src/redux/actions/FieldNoteActions/fieldNoteRiskActions';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { getProjectGoalsFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalListActions';
import { addOrUpdateFieldNoteGoal } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import { setFieldNoteProject } from 'src/redux/actions/Actions/orgProjectActions';
import LeavePageBlocker from 'src/customviews/LeavePageBlocker/LeavePageBlocker';
import { LocalizationProvider, MobileDatePicker, StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
const locales = ['en', 'en-au'] as const;

function FieldNotesProjectDetails(props) {
  const [locale, setLocale] = React.useState<typeof locales[number]>('en-au');
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  const history = useHistory();
  const margins = useMarginStyles({});
  const dispatch = useDispatch();

  const [confirmDeleteFieldNotePopup, setConfirmDeleteFieldNotePopup] = useState<Boolean>(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<any>(false);
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [enableSaveButton, setEnableSaveButton] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);

  const riskError = useSelector((state: Store) => state?.fieldNoteRisk?.lastError, (prev, next) => {
    return prev === next;
  });

  const goalError = useSelector((state: Store) => state?.fieldNoteGoal?.lastError, (prev, next) => {
    return prev === next;
  });

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  const goalState = useSelector((state: Store) => state?.projectGoals.projectGoals, (prev, next) => {
    return prev === next;
  });

  useEffect(() => {
    if (goalState) {
      let allProjectGoals = HelperService.getArrayFromObjectList(goalState) as IGoal[];
      allProjectGoals = _.filter(allProjectGoals, g => g.isActive);
    }
  }, [goalState]);

  const handleCoordinateChange = async (coordinates, address, placeId) => {
    setEnableSaveButton(true);
    if (activeFieldNote) {
      activeFieldNote.location.latitude = coordinates.lat;
      activeFieldNote.location.longitude = coordinates.lng;
      activeFieldNote.location.address = address;
      activeFieldNote.location.googleMapId = placeId;
    }
  };

  const handleFieldNoteDateChange = (event, valueDate) => {
    setEnableSaveButton(true);
    let isoDate = moment(valueDate).toISOString();
    if (activeFieldNote) {
      activeFieldNote.fieldNoteDate = isoDate;
      dispatch(setFieldNote(activeFieldNote));
    }
  }

  const handleChange = (fieldName, targetValue) => {
    setEnableSaveButton(true);

    if (activeFieldNote) {
      activeFieldNote[fieldName] = targetValue.target.value;
      dispatch(setFieldNote(activeFieldNote));
    }
  }

  const saveChanges = async (event) => {
    //event.preventDefault();
    console.log("activeFieldNote", activeFieldNote);
    if (activeFieldNote) {
      let fieldNote = (await dispatch(addOrUpdateFieldNote({ note: activeFieldNote, organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId, fieldNoteId: activeFieldNote.id }))) as unknown as IFieldNote;
      if (fieldNote) {
        await addRisks(activeFieldNote, fieldNote);
        //  await addGoals(activeFieldNote, fieldNote);
        setMessage(`Saved successfully`);
        setEnableSaveButton(false);
        setOpenSnackbar(true);
        history.push(`/${fieldNote.organisationId}/project/${fieldNote.projectId}/fieldNote/${fieldNote.id}`);
      }
      closeConfirmPopup();

    }
  }

  async function addGoals(activeFieldNote: IFieldNote, fieldNote: IFieldNote) {
    let projectGoals = await dispatch(getProjectGoalsFromFirebase({ organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId })) as unknown as IGoal[];
    projectGoals = projectGoals.filter(g => !!g.isActive);
    for (let index = 0; index < projectGoals.length; index++) {
      const goal = projectGoals[index];
      let result = await dispatch(addOrUpdateFieldNoteGoal({ goal: goal, organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId, fieldNoteId: fieldNote.id })) as unknown as boolean;
      if (!result) {
        setMessage(goalError);
        setOpenErrorSnackbar(true);
      }
    }
  }
  async function addRisks(activeFieldNote: IFieldNote, fieldNote: IFieldNote) {
    let projectRisks = await dispatch(getProjectRisksFromFirebase({ organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId }))
    for (let index = 0; index < projectRisks.length; index++) {
      const risk = projectRisks[index];
      let result = await dispatch(addOrUpdateFieldNoteRisk({ risk: risk, organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId, fieldNoteId: fieldNote.id })) as unknown as boolean;
      if (!result) {
        setMessage(riskError);
        setOpenErrorSnackbar(true);
      }
    }
  }
  const nextStepperAction = async (event) => {
    setEnableSaveButton(false);

    if (activeFieldNote && activeFieldNote.status != 'Complete') {
      let fieldNote = (await dispatch(addOrUpdateFieldNote({ note: activeFieldNote, organisationId: activeFieldNote.organisationId, projectId: activeFieldNote.projectId, fieldNoteId: activeFieldNote.id }))) as unknown as IFieldNote;
      if (!fieldNote) {
        setMessage(riskError);
        setOpenErrorSnackbar(true);
      }
    }
    props.handleNext();
  }


  const handleCloseConfirmDeletePopup = async (event) => {
    setConfirmDeleteFieldNotePopup(false);
  }
  const deleteFieldNote = async () => {
    setConfirmDeleteFieldNotePopup(true);

  }
  const confirmDelete = async () => {
    if (activeFieldNote) {
      activeFieldNote.deleted_utc = dateToIso(new Date());
      let updatedFieldNote = await dispatch(addOrUpdateFieldNote({ note: activeFieldNote, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as IFieldNote;
      if (updatedFieldNote) {
        history.push(`/organisation/${fieldNoteParams.organisation}/fieldNoteLists`);
      }
    }
  }

  const openFieldNoteConfirmPopup = async (event) => {
    if (!activeFieldNote?.id) {
      setOpenConfirmPopup(true);
    } else {
      await saveChanges(event);
      setEnableSaveButton(false)
    }
  };

  const closeConfirmPopup = () => {
    setOpenConfirmPopup(false);
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }

  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const isProjectSelected = () => {
    setEnableSaveButton(true);

  }

  return <>
    <MessageSnackbar open={openSnackbar} onClose={closeSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
    <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>

    <Card className={margins.marginTopSpace2}>
      <CardHeader title={'Field Note Details'}
        action={
          <IconButton aria-label="settings" onClick={deleteFieldNote} size="large">
            <MoreVertIcon />
          </IconButton>
        } />
      <CardContent>
        {
          fieldNoteParams.organisation ? (
            <div className={margins.marginTopSpace2}>
              <Grid spacing={1} container>
                <Grid item xs={6}>
                  {/* SELECT PROJECT */}
                  <ProjectDropdown disabled={!!activeFieldNote?.id} isProjectSelected={isProjectSelected}></ProjectDropdown>
                </Grid>

                <Grid item xs={6}>
                  {/* FIELD NOTE DATE */}
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={locale}>
                    <FormControl variant="outlined"
                      style={{ marginTop: '-16px' }}>
                      <StaticDatePicker
                        displayStaticWrapperAs="mobile"

                        // fullWidth
                        // inputVariant="outlined"
                        // disableToolbar
                        // variant="inline"
                        // autoOk
                        // format="dd/MM/yyyy"
                        // margin="normal"
                        // id="from"
                        label="Field Note Date"
                        // name="fieldNoteDate"
                        onChange={(value) => handleFieldNoteDateChange('fieldNoteDate', value)}
                        value={activeFieldNote?.fieldNoteDate}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date'
                        // }}
                        renderInput={(params) => <TextField {...params} />}
                        disabled={activeFieldNote?.status === 'Complete'}
                      />
                    </FormControl>
                  </LocalizationProvider>


                </Grid>
              </Grid>
              {/* GOOGLE MAP */}
              <GoogleMapsComponent disabled={activeFieldNote?.status === 'Complete'} location={activeFieldNote?.location} handleCoordinateChange={handleCoordinateChange}></GoogleMapsComponent>
              {/* NOTES */}
              <TextField
                style={{
                  marginTop: '10px'
                }}
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows="5"
                variant="outlined"
                onChange={(value) => handleChange('notes', value)}
                value={activeFieldNote?.notes ?? ""}
                disabled={activeFieldNote?.status === 'Complete'}
              />
              <LeavePageBlocker when={enableSaveButton} message={'You have not saved, changes will be lost!'}></LeavePageBlocker>
              <Grid container justifyContent="flex-end" style={{ marginTop: '10px' }}>
                <Button size="small" color="primary" variant="contained" onClick={openFieldNoteConfirmPopup}
                  disabled={!enableSaveButton || activeFieldNote?.status === 'Complete'}>
                  Save
                </Button>
              </Grid>
            </div>
          ) : (<div></div>)
        }
      </CardContent>
      <DeletePopup open={confirmDeleteFieldNotePopup}
        title={"Delete field note"}
        message={'Are you sure you want to delete the field note?'}
        closeDeletePopup={handleCloseConfirmDeletePopup}
        deleteSelectedItem={confirmDelete}
      ></DeletePopup>
    </Card>

    <Card style={{ marginTop: '10px' }}>
      <CardActions>
        <Grid container justifyContent="flex-end" >
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={(event) => nextStepperAction(event)}
            disabled={!activeFieldNote?.id}>
            Next
          </Button>
        </Grid>
      </CardActions>
    </Card>
    <ConfirmPopup saveChanges={saveChanges}
      handleClose={closeConfirmPopup}
      open={openConfirmPopup}
      message={'Are you sure you want to save all field note details?'}></ConfirmPopup>
  </>;
}

FieldNotesProjectDetails.propTypes = {
  activeFieldNote: PropTypes.object,
  handleNext: PropTypes.func,
};

export default FieldNotesProjectDetails;