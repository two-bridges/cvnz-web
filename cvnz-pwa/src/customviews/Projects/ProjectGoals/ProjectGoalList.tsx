import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { IGoal } from 'src/redux/model/goal.model';
import { HelperService } from 'src/lib/helper';
import GoalCreate from './Goals/GoalCreate';
import * as projectGoalActions from "src/redux/actions/Actions/projectGoalsActions";
import GoalStatus from './Goals/GoalStatus';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  createCard: {
    marginTop: theme.spacing(2),
  }
}));

function ProjectGoalList(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});

  const { organisation, project, className = "", ...rest } = props;
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  var projectGoals: IGoal[] = [];

  const projectGoalsList = useSelector((state: Store) => state?.projectGoals?.projectGoals, (prev, next) => {
    return prev === next;
  });
  if (projectGoalsList) {
    projectGoals = HelperService.getArrayFromObjectList(projectGoalsList) as IGoal[];
    projectGoals = projectGoals.sort((a, b) => a.goalName > b.goalName ? 1 : -1)
  }
  //goal list
  function getProjectGoals() {
    if (organisation && project?.id) {
      dispatch(projectGoalActions.fetchProjectGoals({ organisationId: organisation.id, projectId: project?.id }));
    }
  }

  useEffect(() => {
    getProjectGoals();
  }, []);


  const handleGoalSave = async (event, goal: IGoal) => {
    event.preventDefault();
    await dispatch(projectGoalActions.addProjectGoal({ projectGoal: goal, organisationId: organisation.id, projectId: project.id, type: "update" }));
    setMessage("Saved Successfully");
    setOpenSnackbar(true);
  }

  const handleChangeForGoal = async (event, goal: IGoal) => {
    await dispatch(projectGoalActions.updateProjectGoal({ projectGoal: goal, event: event }));


  }
  const updateHandlerForGoal = (goal: IGoal, name, value) => {
    dispatch(projectGoalActions.updateProjectGoalDates({ projectGoal: goal, name: name, value: value }));
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleTabChangeForGoal = (event, value) => {
    props.handleTabChangeForGoal(event, value);
  }

  return (
    <div>
      <Grid
        container
        spacing={1}
      >
        {
          projectGoals.map((item, i) => (
            item.isActive &&
            <Grid key={i} item lg={4} md={6} xl={4} xs={12} >
              <GoalStatus
                goal={item}
                handleTabChangeForGoal={handleTabChangeForGoal}
                handleChangeForGoal={handleChangeForGoal}
                handleGoalSave={handleGoalSave}
              />
            </Grid>
          ))
        }
      </Grid>

      {projectGoals ? (
        <div>
          {projectGoals.map((item, i) => (
            !item.isActive &&
            <Grid item key={i} lg={12} md={12} xl={12} xs={12} className={classes.createCard}>
              <GoalCreate
                project={project}
                goal={item}
                updateHandlerForGoal={updateHandlerForGoal}
                openSnackbar={openSnackbar ? openSnackbar : false}
                handleSnackbarClose={handleSnackbarClose}
                handleChangeForGoal={handleChangeForGoal}
              />
            </Grid>
          ))}
        </div>
      ) :
        (<div></div>)
      }
    </div>


  );
}

ProjectGoalList.propTypes = {
  organisation: PropTypes.object,
  project: PropTypes.object,
  handleTabChangeForGoal: PropTypes.func,
};

export default ProjectGoalList;

