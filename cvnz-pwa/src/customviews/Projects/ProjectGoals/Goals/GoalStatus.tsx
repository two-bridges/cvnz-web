
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinearProgress from '@mui/material/LinearProgress';
import { NavLink as RouterLink } from 'react-router-dom';
import * as _ from 'underscore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardHeader,
  Theme,
  Tooltip,
  Switch
} from '@mui/material';
import moment from 'moment';
import Label from 'src/components/Label';
import { IData } from 'src/redux/model/record.model';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { addProjectGoal } from 'src/redux/actions/Actions/projectGoalsActions';
import { IProject } from 'src/redux/model/project.model';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { useDispatch } from 'react-redux';
import { IGoal } from 'src/redux/model/goal.model';
import { isGoalUsedInFieldNotes } from 'src/redux/actions/FieldNoteActions/fieldNoteGoalActions';
import { dateToIso } from 'src/redux/actions/apiStatusActions';
import DeletePopup from 'src/customviews/FieldNotes/Components/Induction/Staff/DeletePopup';
import { reCalculate } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)',
    borderRadius: '8px',
    marginTop: theme.spacing(1)
  },
  tags: {
    padding: theme.spacing(10, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  tagColor: {
    // colors.indigo[600]
  },
  content: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    textAlgin: 'left'
  },
  tagLabel: {
    backgroundColor: '#4527A0',
    color: '#FCFCFC',
    borderRadius: "99px",
    height: "32px",
    width: "auto",
    fontSize: '14px'
  },
  colorPrimary: {
    backgroundColor: '#CFD8DC',
  },
  barColorPrimary: {
    background: 'linear-gradient(90deg, #4527A0 0%, #0277BD 100%)'
  },
  editButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    height: '30px',
    width: '60px',
    borderRadius: '3px',

  },
  goalTitle: {
    padding: '6px',
    fontWeight: 'normal',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    letterSpacing: '1.5px'
  }
}));

function GoalStatus(props) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  let project = props.project as IProject;
  let goal = props.goal as IGoal;

  let organisation = props.organisation as IOrganisation;
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');
  const { className = "", handleChangeForGoal, handleEditPopupOpen, handleGoalSave, handleTabChangeForGoal, ...rest } = props;
  const [message, setMessage] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [goalUsed, setGoalUsed] = useState<boolean>(false);
  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<any>(false);

  useEffect(() => {
    if (goal) {
      isGoalUsedForFieldNotes(goal);
    }
  }, []);
  function getPercentage() {
    var startDate = new Date(goal.goalStartTime).getTime();

    var endDate = new Date(goal.goalEndTime).getTime();
    var currentDate = new Date().getTime();

    var completedPercent = ((currentDate - startDate) / (endDate - startDate)) * 100;
    if (completedPercent > 0) {
      return completedPercent;
    } else {
      return 0;
    }
  }

  function getWorkPercentage() {
    let totalCompleted = goal.actualAmount ? goal.actualAmount : 0;
    if (totalCompleted > 100) {
      totalCompleted = 100;
    } else if (totalCompleted <= 0) {
      totalCompleted = 0;
    }
    return totalCompleted;
  }
  const handleChange = async (event) => {
    if (event.target.type === 'checkbox') {
      goal[event.target.name] = event.target.checked;
    }
    props.handleChangeForGoal(event, goal);
    await dispatch(addProjectGoal({ projectGoal: goal, organisationId: organisation ? organisation?.id : '', projectId: project.id, type: goal.id ? "update" : 'add' }));
    setOpenSnackbar(true);
    setMessage('Saved successfully');
  }
  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }
  function showPopup(event, goal) {
    props.handleEditPopupOpen(event, goal);
  }
  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }
  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  async function isGoalUsedForFieldNotes(goal: IGoal) {
    let isGoalUsed = await dispatch(isGoalUsedInFieldNotes({ projectId: project.id, goal: goal })) as unknown as boolean;
    if (isGoalUsed) {
      setGoalUsed(true);
      return true;
    } else {
      setGoalUsed(false);
      return false;
    }
  }
  const deleteGoal = async (event, goal: IGoal) => {
    let isGoalUsed = await isGoalUsedForFieldNotes(goal);
    if (isGoalUsed) {
      setOpenErrorSnackbar(true);
      setErrorMessage("Cannot delete as goal is already in use.");
    } else {
      setOpenDeletePopup(true);
    }
  }


  const handleDeletePopupClose = () => {
    setOpenDeletePopup(false);
  }
  const deleteSelectedGoal = async () => {
    goal.deleted_utc = dateToIso(new Date());
    await dispatch(addProjectGoal({ projectGoal: goal, organisationId: organisation ? organisation?.id : '', projectId: project.id, type: goal.id ? "update" : 'add' }));
    handleDeletePopupClose();
  }
  return (
    <Grid {...rest} className={clsx(classes.root, className)}>
      <MessageSnackbar open={openSnackbar} onClose={closeSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={errorMessage} panelStatus={'error'}></MessageSnackbar>
      <DeletePopup open={openDeletePopup} closeDeletePopup={handleDeletePopupClose} deleteSelectedItem={deleteSelectedGoal}></DeletePopup>

      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title={goal.goalName} titleTypographyProps={{ variant: 'h4' }}
          action={
            <>
              {/* <IconButton aria-label="calculate" onClick={(event) => dispatch(reCalculate({ organisationId: organisation.id, projectId: project.id }))}>
                <PlayArrowIcon name='isCalculate'></PlayArrowIcon>
              </IconButton> */}
              <IconButton
                aria-label="settings"
                onClick={(event) => showPopup(event, goal)}
                size="large">
                <EditIcon name='isEdit'></EditIcon>
              </IconButton>
              {
                goalUsed ? (<div></div>) : (<><IconButton
                  aria-label="settings"
                  onClick={(event) => deleteGoal(event, goal)}
                  size="large">
                  <DeleteIcon name='isDelete'></DeleteIcon>
                </IconButton></>)
              }
            </>
          }
        >
        </CardHeader>
        <CardContent>
          <Grid container >
            <Grid item md={1} xs={1}>
              <TooltipDialog open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>
              <Tooltip onClick={(event) => showMessage(event, 'Slide switch to Activate this Goal for Field Note Reporting')} title="Slide switch to Activate this Goal for Field Note Reporting" placement="top" className={classes.tooltipIcon}>
                <IconButton style={{ padding: '0px', marginTop: '6px' }} size="large">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item md={11} xs={11}>
              <Switch
                checked={goal.isActive}
                name="isActive"
                onChange={handleChange}
                value={goal.isActive}
                color="primary"
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: '10px' }}>
            <Grid item md={6} xs={6}>
              <Typography variant="h5" style={{ fontWeight: 'normal' }}> <AccessTimeIcon /> {getPercentage().toFixed(0)}%</Typography>
            </Grid>
          </Grid>
          <Grid >
            <Typography variant="h2">
              <LinearProgress
                variant="determinate"
                value={getPercentage()}
                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
              />
            </Typography>
          </Grid>
          <br />
          <Grid container >

            <Grid item md={6} xs={6} >
              <Typography variant="h5" style={{ fontWeight: 'normal', alignItems: 'center' }} onClick={(event) => dispatch(reCalculate({ organisationId: organisation.id, projectId: project.id }))}> <AccessibilityIcon />  {getWorkPercentage().toFixed(0)}%</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant="h2">
              <LinearProgress
                variant="determinate"
                value={getWorkPercentage()}
                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
              />
            </Typography>
          </Grid>
          <br />
          <Grid container spacing={4}>
            <Grid item md={6} xs={6}>
              <Typography style={{ fontSize: '16px', fontWeight: 'normal' }} > Start Date:{moment(goal.goalStartTime).format('DD-MM-YYYY')}</Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography style={{ fontSize: '16px', fontWeight: 'normal' }} > End Date:{moment(goal.goalEndTime).format('DD-MM-YYYY')}</Typography>
            </Grid>
          </Grid>
          <Grid
            alignItems="flex-end"
            container
            justifyContent="flex-end"
          >
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

GoalStatus.propTypes = {
  className: PropTypes.string,
  goal: PropTypes.object,
  organisation: PropTypes.object,
  project: PropTypes.object,
  handleTabChangeForGoal: PropTypes.func,
  handleChangeForGoal: PropTypes.func,
  handleGoalSave: PropTypes.func,
  handleEditPopupOpen: PropTypes.func
};

export default GoalStatus;
