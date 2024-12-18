
import React, { useState, useRef, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions
  , Theme
} from '@mui/material';
import SuccessSnackbar from 'src/customviews/Projects/Create/SuccessSnackbar';
import Page from 'src/components/Page';
import { rest } from 'underscore';
import clsx from 'clsx';
import Results from 'src/views/CustomerManagementList/Results';
import Activity from '../Activities/Create';
import { IActivityDeep } from 'src/redux/model/activity.model';
import { IProject } from 'src/redux/model/project.model';
import { RootState } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { bindActionCreators, Dispatch } from "redux";
import { store } from 'src/redux/store/configureStore';
import { connect } from "react-redux";
import * as activityActions from '../../redux/actions/activityActions';
import * as projectActions from '../../redux/actions/projectActions';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  actions: {
    textAlign: 'right',
    flexGrow: 1,
    display: 'inherit'
  },
  expand: {
    marginLeft: 'auto'
  }
}));

type FnCreateActivity = (args: activityActions.ICreateActivityCriteria) => Promise<{ payload: IActivityDeep, type: string, meta: { arg: activityActions.ICreateActivityCriteria, requestId: string } }>;
type FnActivity = (args: activityActions.ICreateActivityCriteria) => Promise<{ payload: IActivityDeep[], type: string, meta: { arg: activityActions.ICreateActivityCriteria, requestId: string } }>;
type FnCreateProject = (args: projectActions.ICreateProjectCriteria) => Promise<{ payload: IProject, type: string, meta: { arg: projectActions.ICreateProjectCriteria, requestId: string } }>;
type FnProject = (args: projectActions.ICreateProjectCriteria) => Promise<{ payload: IProject[], type: string, meta: { arg: projectActions.ICreateProjectCriteria, requestId: string } }>;

function ActivityCreate(props) {
  const { className = "", ...rest } = props;
  const activityId = props.match && props.match.params.id;

  const projectId = props.match && props.match.params.projectId;

  const actions = props.actions as {
    loadProjectList: FnProject,
    createProject: FnCreateProject,
    createActivity: FnCreateActivity,
    saveActivity: FnCreateActivity,
    fetchActivities: FnActivity
  };
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [activity, setActivity] = useState<IActivityDeep | undefined>(undefined);
  const [activities, setActivities] = useState<IActivityDeep[] | undefined>(undefined);
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const [projects, setProjects] = useState<IProject[] | undefined>(undefined);
  const classes = useStyles({});

  useEffect(() => {
    let mounted = true;
    if (!activity) {
      if (!activityId) {
        actions.createActivity({})
          .then(response => {
            if (mounted) {
              setActivity(response.payload);
            }
          });

      }
      else {
        //load existing activities for manage screen
        actions.fetchActivities({})
          .then(response => {
            if (mounted) {
              let currentAct = response.payload.find(el => el.id === activityId);
              setActivity(currentAct);
            }
          });

      }
      actions.loadProjectList({})
        .then(response => {
          if (mounted) {
            setProjects(response.payload);
            let currentproj = response.payload.find(el => el.id === projectId);
            setProject(currentproj);
            if (currentproj) {
              actions.createActivity({})
                .then(response => {
                  if (mounted) {
                    setActivity(response.payload);
                    setActivity({
                      ...response.payload,
                      projectId: projectId
                    } as any);
                  }
                });
            }
          }
        });

      return () => {
        mounted = false;
      };
    }
  }, []);

  if (!activity || !projects) {
    return null;
  }

  const handleActivitySave = async (event) => {
    event.preventDefault();
    actions.saveActivity({ entity: activity })
      .then(response => {

        setActivity(response.payload);
        setOpenSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChangeForActivity = (event) => {
    event.preventDefault();
    setActivity({
      ...activity,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    } as any);
  };

  const handleChangeActivityType = (event) => {
    event.preventDefault();
    setActivity({
      ...activity,
      activityTypes: event.target.value as string[]
    } as any);
  };
  const updateHandlerForActivity = (name, value) => {
    setActivity({
      ...activity,
      [name]:
        value
    } as any);
  };
  const updateTitle = (name, value) => {
    setActivity({
      ...activity,
      [name]:
        value
    } as any);
  };

  const handleSafetyChange = (event) => {
    setActivity({
      ...activity,
      [event.target.name]:
        event.target.checked
    } as any);
  };

  return (
    <Page className={classes.root}>
      <Container
        maxWidth="lg">
        <Grid
          {...rest}
          className={clsx(classes.root, className)}
          container
          spacing={2}>
          <Activity
            project={activity.project}
            projects={projects}
            activity={activity}
            handleChangeForActivity={handleChangeForActivity}
            handleChangeNameAndValue={updateHandlerForActivity}
            handleChangeType={handleChangeActivityType}
            handleSafetyChange={handleSafetyChange}
            handleSave={handleActivitySave}
            openSnackbar={openSnackbar}
            handleSnackbarClose={handleSnackbarClose} />
        </Grid> </Container>
      <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} />
    </Page>

  );
}

ActivityCreate.propTypes = {
  className: PropTypes.string
};


function mapStateToProps(state: RootState, props) {
  //if id get project from the list - filter
  //else - 
  var activities = _.values(state.activities.list);
  var activity = _.values(state.activities.single);
  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  return {
    activities,
    activity
    // loading: state.apiCallsInProgress > 0
  };
}

const loadProjectList = bindActionCreators(projectActions.fetchProjects, store.dispatch);
const createProject = bindActionCreators(projectActions.createProject, store.dispatch);
const fetchActivities = bindActionCreators(activityActions.fetchActivities, store.dispatch);
const createActivity = bindActionCreators(activityActions.createActivity, store.dispatch);
const saveActivity = bindActionCreators(activityActions.saveActivity, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      loadProjectList,
      createProject,
      fetchActivities,
      createActivity,
      saveActivity
      // loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      // deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityCreate);
