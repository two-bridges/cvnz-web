import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField,
} from '@mui/material';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { IGoal } from 'src/redux/model/goal.model';
import { addOrUpdateFieldNoteGoal } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import GoalPhotoUpload from './GoalPhotoUpload';
import GoalImagesList from './GoalImagesList';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import { useParams } from 'react-router';
import { getFieldNoteGoalsFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalListActions';
import { dateToIso } from 'src/redux/actions/apiStatusActions';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';

function FieldNoteGoalList(props) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openImagePopup, setOpenImagePopup] = React.useState(false);
  const [openImageListPopup, setOpenImageListPopup] = React.useState(false);
  const [selectedGoalForImageUpload, setSelectedGoalForImageUpload] = React.useState<IGoal | undefined>(undefined);
  const [goals, setSelectedGoal] = useState<IGoal[]>([]);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  let allGoalState = useSelector((state: Store) => state?.fieldNoteGoalList?.list, (prev, next) => {
    return prev === next;
  });
  if (allGoalState) {
    allGoalState = allGoalState.sort((a, b) => a.goalName > b.goalName ? 1 : -1);
  }

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  useEffect(() => {
    dispatch(getFieldNoteGoalsFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, []);

  //open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //close dialog
  const handleClose = () => {
    setOpen(false);
  };


  function confirmGoalDelete() {
    handleClickOpen();
  }

  function setSelectedGoals(e, goal: IGoal) {
    if (e.target.checked) {
      setSelectedGoal([
        ...goals,
        goal
      ]);
    } else {
      let updatedGoalList = _.filter(goals as IGoal[], data => data.goalName != goal.goalName);
      setSelectedGoal(updatedGoalList);
    }
  }
  const openPhotoUploadPopup = (event, goal) => {
    setSelectedGoalForImageUpload(goal);
    setOpenImagePopup(true)
  }
  const closePhotoUploadPopup = () => {
    setOpenImagePopup(false)
  }

  const openGoalImageListPopup = (event, goal) => {
    setSelectedGoalForImageUpload(goal);
    setOpenImageListPopup(true)
  }
  const closeImageListPopup = () => {
    setOpenImageListPopup(false)
  }

  function handleAddDialogOpen() {
    props.handleAddDialogOpen()
  }

  // delete goals selected
  const deleteGoalsSelected = async (event) => {
    event.preventDefault();
    for (let i = 0; i < goals.length; i++) {
      const element = goals[i];
      element.deleted_utc = dateToIso(new Date());
      await dispatch(addOrUpdateFieldNoteGoal({ goal: element, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
    }
    setMessage("Selected Outcomes Deleted!")
    setOpenSuccessSnackbar(true);
    setOpen(false);
  };
  const handleChange = async (event, goal: IGoal) => {
    // goal.goalAmount = parseInt(event.target.value);
    goal.outcomeAmount = parseInt(event.target.value);
    let updatedGoal = await dispatch(addOrUpdateFieldNoteGoal({ goal: goal, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
    // if (updatedGoal) {
    //   setMessage("Outcome Updated!")
    //   setOpenSuccessSnackbar(true);
    // }
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

      <Card className={classes.root}>
        <CardHeader
          title="Manage Outcomes"
          titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
          subheaderTypographyProps={{ variant: 'body1' }}
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar options={{ suppressScrollY: true }}>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Outcome</TableCell>
                    <TableCell>Metric</TableCell>
                    <TableCell>Qty </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allGoalState?.filter(e => !e.deleted_utc).map((goal: IGoal) => (
                    <TableRow
                      hover
                      key={goal.goalName}>
                      <TableCell>
                        <input type="checkbox" name="selectGoals" value={goal.goalName} id={goal.goalTypeId.toString()} onChange={(value) => { setSelectedGoals(value, goal) }}>
                        </input>
                      </TableCell>
                      <TableCell>{goal.goalName}</TableCell>
                      <TableCell>{goal.goalUnit}</TableCell>
                      <TableCell style={{ paddingBottom: '0px' }}>
                        <TextField
                          InputProps={{
                            classes: {
                              input: classes.labelStyle,
                            },
                          }}
                          fullWidth
                          label="Qty"
                          name="goalAmount"
                          onChange={(event) => handleChange(event, goal)}
                          value={goal.outcomeAmount ?? 0}
                          variant="standard"
                          type="number"
                          disabled={activeFieldNote?.status === 'Complete'}
                        />
                        {/* {goal.goalAmount} */}
                      </TableCell>
                      <TableCell>
                        {
                          activeFieldNote?.status === 'Complete' ? (<div></div>) : (
                            <div>
                              <AddAPhotoIcon
                                style={{ marginRight: '10px', float: 'right' }}
                                onClick={(event) => openPhotoUploadPopup(event, goal)}
                              />
                            </div>
                          )
                        }
                      </TableCell>
                      <TableCell>
                        {
                          goal?.images?.length > 0 ? (<div>
                            <PhotoLibrary
                              onClick={(event) => openGoalImageListPopup(event, goal)}
                              style={{ marginRight: '10px', float: 'right' }}
                            ></PhotoLibrary>
                          </div>) : (<div></div>)}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: '15px', marginBottom: '15px' }}>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}>
            <Button
              color="primary"
              variant="contained"
              size='small'
              style={{ marginRight: '10px' }}
              onClick={handleAddDialogOpen}
              disabled={activeFieldNote?.status === 'Complete'}
            >
              Add
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              color="primary"
              variant="contained"
              size='small'
              onClick={confirmGoalDelete}
              disabled={activeFieldNote?.status === 'Complete' || goals.length <= 0}>
              Delete
            </Button>

          </Grid>
        </CardActions>
      </Card>
      <GoalPhotoUpload open={openImagePopup} goal={selectedGoalForImageUpload} handleClose={closePhotoUploadPopup}></GoalPhotoUpload>
      <GoalImagesList open={openImageListPopup} goal={selectedGoalForImageUpload} handleClose={closeImageListPopup}></GoalImagesList>
      {/* DIALOG TO CONFIRM GOAL DELETE */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete outcome?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm, if you would like to delete the selected Outcome.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit"
            size='small'
            variant="contained"
            onClick={handleClose} color="primary">
            No
          </Button>
          <Button type="submit"
            variant="contained"
            size='small' onClick={deleteGoalsSelected} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FieldNoteGoalList.propTypes = {
  className: PropTypes.string,
  handleAddDialogOpen: PropTypes.func
};
export default FieldNoteGoalList;


