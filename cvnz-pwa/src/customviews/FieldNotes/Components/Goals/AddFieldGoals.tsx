import {
  Button,
  Dialog,
  FormControl,
  Grid,
  TextField,
  Theme,
  Typography,
  DialogActions,
  DialogContent,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import OrgGoalsDropdown from 'src/customviews/CommonComponents/OrgGoalsDropdown';
import OrgProjectGoalsDropdown from 'src/customviews/CommonComponents/OrgProjectGoalsDropdown';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { addOrUpdateFieldNoteGoal } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import { fetchOrganisationGoals } from 'src/redux/actions/organisationGoalActions';
import { CreateNewGoal, IGoal, IGoalType } from 'src/redux/model/goal.model';
import { IProject } from 'src/redux/model/project.model';
import { Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {
    display: 'flex',
  },
}));
function AddFieldGoals(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [goalType, setGoalType] = React.useState<IGoal | undefined>(undefined);
  const [goalAmount, setGoalAmount] = React.useState<number>(0);
  const [newOutcome, setNewOutcome] = React.useState<string>('');
  const [goalAdded, setGoalAdded] = React.useState<boolean>(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  let goalTypeList = useSelector((state: Store) => {
    const list = state?.organisationGoalReducers?.list;
    let idxList = _.indexBy(list, p => p.id);
    return idxList;
  });
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();
  React.useEffect(() => {
    dispatch(fetchOrganisationGoals({ organisationId: fieldNoteParams.organisation }));
  }, []);

  const handleQtyChange = (event) => {
    setGoalAmount(parseInt(event.target.value));
  }
  const handleOutcomeChange = (event) => {
    setNewOutcome(event.target.value);
  }

  const allGoalState = useSelector((state: Store) => state?.fieldNoteGoalList?.list, (prev, next) => {
    return prev === next;
  });

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  const setSelectedGoalType = async (event, selectedGoalType: IGoal) => {
    event.preventDefault();
    setNewOutcome("");
    if (selectedGoalType) {
      setGoalType(selectedGoalType);
    } else {
      setGoalType(undefined);
      setGoalAmount(0);
    }
  }

  const handleSubmit = async () => {
    let response = CreateNewGoal();
    if (response) {
      response.goalName = newOutcome ? newOutcome : goalType?.goalName ? goalType.goalName : '';
      response.projectId = fieldNoteParams.projectId ? fieldNoteParams.projectId : '';
      response.goalUnit = goalType?.goalTypeId ? goalTypeList[goalType.goalTypeId].metric : '';
      response.goalTypeId = goalType ? goalType.goalTypeId : 0;
      response.goalAmount = goalType ? goalType.goalAmount : 0;
      response.outcomeAmount = goalAmount ? goalAmount : 0;
      response.type = goalType?.goalTypeId ? goalTypeList[goalType.goalTypeId].goal : 'Unplanned';
      let goalAdded = await dispatch(addOrUpdateFieldNoteGoal({ goal: response, organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId })) as unknown as boolean;
      if (goalAdded) {
        setMessage("Outcome Added!")
        setOpenSuccessSnackbar(true);
        setGoalAdded(true);
        handleClose();
      }
    }
  }

  const handleClose = () => {
    props.handleClose();
    setGoalType(undefined);
    setGoalAmount(0)
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

      <Dialog fullWidth
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <Typography variant="h6" style={{ marginLeft: '24px', marginTop: '24px', marginBottom: '10px' }}>Outcome Measurement</Typography>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md={4} xs={4}>
              {/* <OrgGoalsDropdown selectedGoalList={allGoalState} setSelectedGoalType={setSelectedGoalType}></OrgGoalsDropdown> */}
              <OrgProjectGoalsDropdown title={"Outcome"} selectedGoalList={allGoalState} setSelectedGoalType={setSelectedGoalType}></OrgProjectGoalsDropdown>

            </Grid>
            {
              goalType?.goalName === 'Unplanned' ? (
                <Grid item md={4} xs={4}>
                  <FormControl>
                    <TextField
                      label="Outcome Name"
                      name="outcome"
                      onChange={handleOutcomeChange}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              ) : (<div></div>)
            }
            <Grid item md={4} xs={4}>
              <FormControl>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.content
                    },
                  }}
                  label={goalType?.goalUnit ? goalType?.goalUnit : 'Quantity'}
                  name="goalAmount"
                  variant="outlined"
                  onChange={handleQtyChange}
                  placeholder={"Quantity"}
                  value={goalAmount || 0}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item alignItems="flex-end" container justifyContent="flex-end"
          >
            <Button onClick={handleClose} type="submit" color="primary" size='small' variant="contained" style={{ marginBottom: '10px', marginRight: '10px' }}>Cancel</Button>
            <Button onClick={handleSubmit} type="submit" color="primary" size='small' variant="contained" style={{ marginBottom: '10px', marginRight: '18px' }} disabled={activeFieldNote?.status === 'Complete' || !goalType}>Add</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddFieldGoals;