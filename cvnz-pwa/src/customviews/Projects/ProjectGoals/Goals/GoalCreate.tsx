import { LocalizationProvider, MobileDatePicker, StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import SuccessSnackbar from '../../Create/SuccessSnackbar';
import {
  Button,
  Grid,
  FormControl,
  TextField,
  Switch,
  Theme,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { IGoal } from 'src/redux/model/goal.model';
import { IProject } from 'src/redux/model/project.model';
import TooltipDialog from 'src/customviews/CommonComponents/TooltipDialog';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { useDispatch } from 'react-redux';
import { addProjectGoal } from 'src/redux/actions/Actions/projectGoalsActions';
const locales = ['en', 'en-au'] as const;

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%'
  },
  saveButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    height: '30px',
    width: 'auto',
    background: '#4527A0',
    color: '#FCFCFC',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#4527A0'
    }
  },
  labelStyle: {
    fontSize: '16px'
  },
  goalHeader: {
    margin: theme.spacing(2),
  },
  dateDiv: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  }

}));


function GoalCreate(props) {
  const [locale, setLocale] = React.useState<typeof locales[number]>('en-au');

  let goal = props.goal as IGoal;
  let project = props.project as IProject;
  let organisation = props.organisation as IOrganisation;
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [openWarnSnackbar, setOpenWarnSnackbar] = useState<any>(false);
  const [message, setMessage] = useState<string>("");
  const [warnMessage, setWarnMessage] = useState<string>("");
  const classes = useStyles({});
  const [showTooltipMessage, setShowTooltipMessage] = useState<boolean>(false);
  const [toolTipMessage, setTooltipMessage] = useState<string>('');
  const handleChange = event => {
    if (event.target.type === 'checkbox') {
      goal.isActive = event.target.checked;
    } else {
      goal[event.target.name] = event.target.value
    }
    props.handleChangeForGoal(event, goal);
  };

  const handleNameChange = event => {
    goal[event.target.name] = event.target.value
  };

  const constHandleGoalDateChange = (name, value) => {
    let value1 = moment(value).toISOString();
    goal[name] = value1;
    props.updateHandlerForGoal(goal, name, value1);
  }

  const handleSubmit = async (event, goal: IGoal) => {
    if (!goal.goalName) {
      setOpenWarnSnackbar(true);
      setWarnMessage("Please enter goal name");
    } else {
      event.preventDefault();
      await dispatch(addProjectGoal({ projectGoal: goal, organisationId: organisation ? organisation?.id : '', projectId: project.id, type: goal.id ? "update" : 'add' }));
      setOpenSnackbar(true);
      setMessage('Saved successfully');
      props.handleEditPopupClose()
    }

  };
  const showMessage = (event, message: string) => {
    setShowTooltipMessage(true);
    setTooltipMessage(message);
  }
  const handleCloseTooltipMessage = () => {
    setShowTooltipMessage(false);
  }
  const handleClose = (event) => {
    event.preventDefault();
    props.handleEditPopupClose();
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }

  const closeWarnSnackbar = () => {
    setOpenWarnSnackbar(false);
  }
  return (
    //add component HTML here
    <div>
      <MessageSnackbar open={openSnackbar} onClose={closeSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
      <MessageSnackbar open={openWarnSnackbar} onClose={closeWarnSnackbar} message={warnMessage} panelStatus={'warn'}></MessageSnackbar>

      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >{goal.goalName}
        </DialogTitle>

        <DialogContent>
          <form>
            <Grid container>
              <Grid item md={1} xs={1}>
                <TooltipDialog open={showTooltipMessage} message={toolTipMessage} handleClose={handleCloseTooltipMessage}></TooltipDialog>
                <Tooltip onClick={(event) => showMessage(event, 'Slide switch to Activate this Goal for Field Note Reporting')} title="Slide switch to Activate this Goal for Field Note Reporting" placement="top" className={classes.tooltipIcon}>
                  <IconButton style={{ padding: '0px', marginTop: '6px' }} size="large">
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item md={3} xs={11}>
                <Switch
                  checked={goal.isActive}
                  name="isActive"
                  onChange={handleChange}
                  value={goal.isActive}
                  color="primary"
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Goal Name"
                    name="goalName"
                    onChange={handleNameChange}
                    defaultValue={goal.goalName}
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Type"
                    name="type"
                    defaultValue={goal.type}
                    variant="outlined"
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.content
                      },
                    }}
                    type="number"
                    label={goal?.goalUnit ?? 'Target'}
                    name="goalAmount"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder={"Target"}
                    // value={goal.goalAmount}
                    value={Number(goal.goalAmount).toString()}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item md={3} xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.labelStyle,
                      },
                    }}
                    fullWidth
                    label="Metric"
                    name="metric"
                    onChange={handleChange}
                    value={goal?.goalUnit}
                    variant="outlined"
                    disabled
                  />
                </FormControl>
              </Grid> */}


              <Grid container spacing={2} className={classes.dateDiv} >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={locale}
                >
                  <Grid container spacing={2}>

                    <Grid item md={1} xs={2} container>
                      <Tooltip onClick={(event) => showMessage(event, 'Project data range (START to FINISH) is measured across the duration of the date ranges for each goal')}
                        title="Project data range (START to FINISH) is measured across the duration of the date ranges for each goal" placement="top" className={classes.tooltipIcon}>
                        <IconButton size="large">
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item md={5} xs={10}>
                      <FormControl variant="outlined" fullWidth>
                        <StaticDatePicker
                          // inputVariant="outlined"
                          // disableToolbar
                          // variant="inline"
                          // autoOk
                          // format="dd/MM/yyyy"
                          // margin="normal"
                          // id="from"
                          // label="From"
                          // name="goalStartTime"
                          // onChange={(value) => constHandleGoalDateChange("goalStartTime", value)}
                          // value={goal.goalStartTime}
                          // KeyboardButtonProps={{
                          //   'aria-label': 'change date'
                          // }}
                          displayStaticWrapperAs="desktop"
                          openTo="year"
                          value={goal.goalStartTime}
                          onChange={(value) => constHandleGoalDateChange("goalStartTime", value)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <StaticDatePicker
                          // inputVariant="outlined"
                          // disableToolbar
                          // variant="inline"
                          // autoOk
                          // format="dd/MM/yyyy"
                          // margin="normal"
                          // id="to"
                          // label="To"
                          // name="goalEndTime"
                          // value={goal.goalEndTime}
                          // onChange={(value) => constHandleGoalDateChange("goalEndTime", value)}
                          // KeyboardButtonProps={{
                          //   'aria-label': 'change date'
                          // }}
                          displayStaticWrapperAs="desktop"
                          openTo="year"
                          value={goal.goalEndTime}
                          onChange={(value) => constHandleGoalDateChange("goalEndTime", value)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="flex-end" spacing={1}
              style={{ marginBottom: '10px' }}
            >
              <Button
                onClick={(event) => handleClose(event)}
                type="submit"
                variant="contained"
                color='primary'
                size='small'
                style={{ marginTop: '20px', marginRight: '20px' }}
              >
                Cancel
              </Button>
              <Button
                onClick={(event) => handleSubmit(event, goal)}
                type="submit"
                variant="contained"
                color='primary'
                size='small'
                style={{ marginTop: '20px' }}
              >
                Save
              </Button>
            </Grid>

          </form>
          <SuccessSnackbar onClose={props.handleSnackbarClose} open={props.openSnackbar} />

        </DialogContent>
      </Dialog>
    </div>
  );
}

GoalCreate.propTypes = {
  goal: PropTypes.object,
  organisation: PropTypes.object,
  open: PropTypes.bool,
  project: PropTypes.object,
  updateHandlerForGoal: PropTypes.func,
  handleChangeForGoal: PropTypes.func,
  openSnackbar: PropTypes.bool,
  handleSnackbarClose: PropTypes.func,
  handleActiveGoal: PropTypes.func,
  handleEditPopupClose: PropTypes.func,
};

export default GoalCreate;
