
import { myFirebase } from "../../../firebase/firebase";
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from "redux";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Container, colors, Theme, Button } from '@mui/material';
import Page from '../../../components/Page';
import uuid from 'uuid/v1';
import ProjectCreate from './ProjectCreate';
import { connect, useDispatch, useSelector } from "react-redux";
import * as projectActions from '../../../redux/actions/projectActions';
import * as activityActions from '../../../redux/actions/activityActions';
import * as recordActions from '../../../redux/actions/recordActions';
import * as _ from "underscore";
import { store } from 'src/redux/store/configureStore';
import { RootState, Store } from 'src/redux/reducers/rootReducer';
import { IProject, IProjectDeep } from '../../../redux/model/project.model';
import { CreateNewGoal, IGoal, IGoalDeep, IGoalType } from 'src/redux/model/goal.model';
import { IActivityDeep } from 'src/redux/model/activity.model';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IRecordDeep } from 'src/redux/model/record.model';
import { IOrganisation } from "src/redux/model/organisation.model";
import * as organisationActions from 'src/redux/actions/organisationActions';
import * as goalTypeActions from 'src/redux/actions/goalTypesAction';
import * as goalActions from 'src/redux/actions/goalActions';
import * as projectGoalActions from 'src/redux/actions/projectGoalActions';
import * as projectGoalsActions from 'src/redux/actions/Actions/projectGoalsActions';
import * as riskActions from "src/redux/actions/riskActions";
import * as projectRiskActions from "src/redux/actions/Actions/projectRiskActions";
import { IProjectRisk } from "src/redux/model/risk.model";
import ProjectRiskList from "../Risks/ProjectRiskList";
import MessageSnackbar from "src/customviews/SnackBar/MessageSnackBar";
import ManageRisk from "../Risks/ManageRisk";
import ProjectGoalList from "../ProjectGoals/ProjectGoalList";
import AddRisk from "../Risks/AddRisk";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";
import FieldNoteList from "../FieldNotes/fieldNoteList";
import { HelperService } from "src/lib/helper";
import OrgGoalsDropdown from "src/customviews/CommonComponents/OrgGoalsDropdown";
import ConfirmPopup from "./ConfirmPopup";
import GoalCreate from "../ProjectGoals/Goals/GoalCreate";
import { addProjectGoal, fetchProjectGoals, updateProjectGoal, updateProjectGoalDates } from "src/redux/actions/Actions/projectGoalsActions";
import GoalStatus from "../ProjectGoals/Goals/GoalStatus";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },

  archiveButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.orange[800],
    '&:hover': {
      backgroundColor: colors.orange[900]
    }
  },
  goal: {
    spacing: theme.spacing(5),

  },
  tabs: {
    backgroundColor: '#FCFCFC',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)',

  },
  bigIndicator: {
    height: 4,
  },
  pageSetting: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  createCard: {
    marginTop: theme.spacing(2),
  }
}));

type FnCreateProject = (args: projectActions.ICreateProjectCriteria) => Promise<{ payload: IProject, type: string, meta: { arg: projectActions.ICreateProjectCriteria, requestId: string } }>;
type FnProject = (args: projectActions.ICreateProjectCriteria) => Promise<{ payload: IProject[], type: string, meta: { arg: projectActions.ICreateProjectCriteria, requestId: string } }>;
type FnCreateActivity = (args: activityActions.ICreateActivityCriteria) => Promise<{ payload: IActivityDeep, type: string, meta: { arg: activityActions.ICreateActivityCriteria, requestId: string } }>;
type FnActivity = (args: activityActions.ICreateActivityCriteria) => Promise<{ payload: IActivityDeep[], type: string, meta: { arg: activityActions.ICreateActivityCriteria, requestId: string } }>;
type FnLoadRecordList = (args: recordActions.IFetchRecordsCriteria) => Promise<{ payload: IRecordDeep[], type: string, meta: { arg: recordActions.IFetchRecordsCriteria, requestId: string } }>;
type FnGoalsTypeList = (args: goalTypeActions.IFetchGoalTypeCriteria) => Promise<{ payload: IGoalType[], type: string, meta: { arg: goalTypeActions.IFetchGoalTypeCriteria, requestId: string } }>;
type FnGoal = (args: goalActions.ICreateSingleGoalCriteria) => Promise<{ payload: IGoalDeep, type: string, meta: { arg: goalActions.ICreateSingleGoalCriteria, requestId: string } }>;
type FnLoadGoalList = (args: projectGoalActions.IFetchGoalCriteria) => Promise<{ payload: IGoalDeep[], type: string, meta: { arg: projectGoalActions.IFetchGoalCriteria, requestId: string } }>;
type FnGoalActions = (args: projectGoalActions.ICreateAndAddGoalCriteria) => Promise<{ payload: IGoalDeep, type: string, meta: { arg: projectGoalActions.ICreateAndAddGoalCriteria, requestId: string } }>;

function General(props) {
  const projectId = props.match.params.id;
  const actions = props.actions as {
    loadProjectList: FnProject,
    createProject: FnCreateProject,
    saveProject: FnCreateProject,
    createActivity: FnCreateActivity,
    saveActivity: FnCreateActivity,
    fetchActivities: FnActivity,
    loadRecordList: FnLoadRecordList,
    loadOrganisations: organisationActions.FnLoadOrganisationList,
    loadGoalTypes: FnGoalsTypeList,
    createSingleGoal: FnGoal,
    createAndAddGoal: FnGoalActions,
    loadGoals: FnLoadGoalList
  };

  const { className = "", ...rest } = props;
  const [tab, setTab] = useState<any>('details');
  const [project, setProject] = useState<IProjectDeep | undefined>(undefined);
  const [goals, setGoals] = useState<IGoalDeep[]>([]);
  const [isGoalSelected, setIsGoalSelected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [goalTypes, setGoalTypes] = useState<IGoalType[]>([]);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);

  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [message, setMessage] = useState<string>("");
  const [openArchivePopup, setOpenArchivePopup] = useState<any>(false);

  // RISKS useStates
  const [isUpdateRiskFlag, setIsUpdateRiskFlag] = useState<boolean>(false);
  const [riskSelectedToBeUpdated, setRiskSelectedToBeUpdated] = useState<IProjectRisk | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const tabs = [
    { value: 'details', label: 'Details', enabled: true },
    { value: 'goals', label: 'Goals', enabled: !!project?.id },
    { value: 'risks', label: 'Risks', enabled: !!project?.id },
    { value: 'records', label: 'Field Notes', enabled: !!project?.id }
  ];
  const handleTabsChange = (event, value) => {
    setTab(value);
  };
  const [organisation, setOrganisation] = useState<IOrganisation | undefined>(undefined);
  const dispatch = useDispatch();
  const history = useHistory();
  const [openGoalEditPopup, setOpenGoalEditPopup] = useState<boolean>(false);
  const [selectedGoalFromDropdown, setSelectedGoalFromDropdown] = useState<IGoal | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);

  const projectRiskSaveError = useSelector((state: Store) => state?.projectRisks?.lastError);

  const classes = useStyles({});

  let activeOrganisation: any;

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
      dispatch(fetchProjectGoals({ organisationId: organisation.id, projectId: project?.id }));
    }
  }
  useEffect(() => {
    getProjectGoals();
  }, [organisation, project]);
  function getActiveOrganisation() {
    const sessionOrganisation = sessionStorage.getItem('organisation');
    if (sessionOrganisation) {
      activeOrganisation = JSON.parse(sessionOrganisation);
      setOrganisation(activeOrganisation);
    }
  }
  function getAllRisks() {
    dispatch(riskActions.fetchRisks());
  }

  useEffect(() => {

    getAllRisks();
    getActiveOrganisation();
    getProjectGoals();

    let mounted = true;
    if (!project) {
      if (!projectId) {
        actions.createProject({})
          .then(response => {
            if (mounted) {
              setProject(response.payload);
            }
          });
      }
      else {
        //load the project for a given ID
        //call action and fetch 
        //fetch selected project from the api
        actions.loadProjectList({ id: projectId, orgId: activeOrganisation.id })
          .then(response => {
            if (mounted) {
              let currentproj = response.payload.find(el => el.id === projectId);
              setProject(currentproj);
            }
          });

        //Goal types
        actions.loadGoalTypes({})
          .then(response => {
            if (mounted) {
              setGoalTypes(response.payload);
            }
          });
      }
      return () => {
        mounted = false;
      };
    }

  }, []);

  if (!project || !goals) {
    return null;
  }

  const handleProjectSave = async (event) => {
    event.preventDefault();
    if (project.projectName === "" || project.projectName === undefined || project.city === '' || project.projectType === '' || project.phone === '') {
      setError("*Please enter all project details.");
    } else if (!HelperService.isPhoneValid(project.phone)) {
      setError("*Please enter valid phone number");

    }
    else {
      await actions.saveProject({ entity: project, colPath: `Organisations/${organisation?.id}/Projects` })
        .then(response => {
          setError('');
          setProject(response.payload);
          setOpenSnackbar(true);
          history.push(`/${organisation?.id}/project/${response.payload.id}`);
        });
    }

  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleFileUpload = async (event) => {
    setUploading(true);
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    var uploadFiles = target.files;
    var url = target.value;
    if (uploadFiles !== null && uploadFiles.length !== 0) {

      var file = uploadFiles[0];
      let storage = myFirebase.storage();

      storage.ref(`images/p--${project.id}/${uuid()}--${file.name}`).put(file).then(async (snapshot) => {
        let imgUrl = await snapshot.ref.getDownloadURL();
        setProject({
          ...project,
          files: imgUrl,
          projectImage: url
        } as any);
        setUploading(false);

      }, reason => {
        console.log("oh no.  ");
        console.log(reason);
      });
    }

  }

  //TODO : workout how to type handle evnts (typescript friendly)
  const handleChange = event => {
    event.preventDefault();
    setProject({
      ...project,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    } as any);
  };

  const handlePdfChange = (event, url) => {
    event.preventDefault();
    setProject({
      ...project,
      inductionNotes: url,
    } as any);
  };


  const updateHandler = (name, value) => {
    setProject({
      ...project,
      [name]:
        value
    } as any);

  }


  const handleClick = event => {
    setProject({
      ...project,
      projectImage: null,
      files: null,
    } as any);

  };
  const handleTabChangeForGoal = (event, value) => {
    setTab(value);
  }

  if (!tab) {
    return <Redirect to={`/projects`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!project) {
    return null;
  }

  const setSelectedGoalType = async (event, selectedGoalType: IGoalType) => {
    event.preventDefault();
    if (selectedGoalType) {
      let response = CreateNewGoal()
      if (response) {
        response.goalName = '';
        response.projectId = project ? project.id : '';
        response.goalUnit = selectedGoalType ? selectedGoalType.metric : '';
        response.type = selectedGoalType ? selectedGoalType.goal : '';
        response.goalTypeId = selectedGoalType ? parseInt(selectedGoalType.id) : 0;
        setIsGoalSelected(true);
        setSelectedGoalFromDropdown(response);
        setOpenGoalEditPopup(true);
      }
    } else {
      setIsGoalSelected(false);
      setSelectedGoalFromDropdown(undefined);
      setOpenGoalEditPopup(false);
    }
  }


  // GOOGLE MAPS
  function handleCoordinateChange(coordinates: LatLng, address: string, googleMapId: string) {
    let addressSplit = address.split(",");

    if (addressSplit && project) {
      setProject({
        ...project,
        address: addressSplit[0],
        city: addressSplit[1] ? addressSplit[1] : '',
        state: addressSplit[2] ? addressSplit[2] : '',
        location: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          address,
          googleMapId
        },
      });
    }
  }

  const handleProjectArchive = (event) => {
    setProject({
      ...project,
      status: "archived"
    });

    let project1 = {
      ...project,
      status: 'archived'
    }

    actions.saveProject({ entity: project1, colPath: `Organisations/${organisation?.id}/Projects` })
      .then(response => {
        setError('');
        setProject({ ...response.payload });
        setOpenSnackbar(true);
        closeArchiveConfirmPopup();
        history.push(`/${organisation?.id}/Projects`);
      });
  }


  function handleClose() {
    setOpen(false);
  }

  function riskSelectedForUpdate(risk: IProjectRisk) {
    if (risk) {
      setIsUpdateRiskFlag(true);
      setRiskSelectedToBeUpdated(risk);
      handleUpdateDialogOpen();
    } else {
      setMessage("Please select a Risk");
      setOpenSnackbar(true);
    }
  }

  function handleUpdateDialogOpen() {
    setOpen(true);
  }
  async function updateProjectRisk() {
    if (riskSelectedToBeUpdated) {
      let result = (await dispatch(projectRiskActions.addRisk(riskSelectedToBeUpdated, organisation ? organisation.id : '', project ? project.id : '', "update"))) as any;
      if (result) {
        setMessage(`Project Risk ${riskSelectedToBeUpdated.name} updated successfully`);
        setOpenSuccessSnackbar(true);
        handleClose();
      } else {
        setOpenErrorSnackbar(true);
        setMessage(projectRiskSaveError ? projectRiskSaveError : 'An error occured');
        console.log("error")
      }
    }
  }

  const openArchiveConfirmPopup = () => {
    setOpenArchivePopup(true);
  };

  const closeArchiveConfirmPopup = () => {
    setOpenArchivePopup(false);
  };


  function handleAddPopupOpen() {
    setOpenAddPopup(true);
  }
  function handleCloseAddPopup() {
    setOpenAddPopup(false);
  }

  function selectedGoalForUpdate(event, goal) {
    setSelectedGoalFromDropdown(goal);
    handleEditPopupOpen();
  }
  function handleEditPopupOpen() {
    setOpenGoalEditPopup(true);

  }
  function handleEditPopupClose() {
    setSelectedGoalFromDropdown(undefined);
    setIsGoalSelected(false);
    setOpenGoalEditPopup(false);
  }

  const handleGoalSave = async (event, goal: IGoal) => {
    event.preventDefault();
    await dispatch(addProjectGoal({ projectGoal: goal, organisationId: organisation ? organisation?.id : '', projectId: project.id, type: goal.id ? "update" : 'add' }));
    setSelectedGoalFromDropdown(undefined);
    setIsGoalSelected(false);
    handleEditPopupClose();
  }
  const updateHandlerForGoal = (goal: IGoal, name, value) => {
    dispatch(updateProjectGoalDates({ projectGoal: goal, name: name, value: value }));
  }
  const handleChangeForGoal = async (event, goal: IGoal) => {
    await dispatch(updateProjectGoal({ projectGoal: goal, event: event }));
  }


  const closeErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  }

  const closeSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  }

  return (
    <Page className={classes.root} title="Project Details">
      <Container maxWidth="lg">
        <Tabs
          value={tab}
          classes={{ indicator: classes.bigIndicator }}
          className={classes.tabs}
          indicatorColor="primary"
          style={{ color: '#263238' }}
          onChange={handleTabsChange}
          aria-label="disabled tabs example"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} disabled={!tab.enabled} value={tab.value} style={{ boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)' }} />
          ))}
        </Tabs>
      </Container>

      <Container maxWidth="lg">
        {tab === 'details' && (
          <Grid
            className={clsx(classes.root, className)}
            container
            spacing={2}
          >
            <Grid item lg={12} md={12} xl={12} xs={12} className={classes.createCard}>
              <ProjectCreate
                project={project}
                organisation={organisation}
                onEditLabelChange={updateHandler}
                handleProjectSave={handleProjectSave}
                handleFileUpload={handleFileUpload}
                handleChange={handleChange}
                handlePdfChange={handlePdfChange}
                handleClick={handleClick}
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                handleCoordinateChange={handleCoordinateChange}
                handleProjectArchive={openArchiveConfirmPopup}
                uploading={uploading}
                error={error} />
              <ConfirmPopup saveChanges={handleProjectArchive} handleClose={closeArchiveConfirmPopup} open={openArchivePopup} message={'Are you sure you want to archive the project?'} ></ConfirmPopup>
            </Grid>
          </Grid>
        )}

        {tab === 'goals' && (
          <Grid
          >
            {/* PROJECT GOAL SELECT AND LIST */}
            <div style={{ marginTop: "10px" }}>
              <OrgGoalsDropdown title={'Select Goal'} selectedGoalList={projectGoals} isGoalSelected={isGoalSelected} setSelectedGoalType={setSelectedGoalType} ></OrgGoalsDropdown>
            </div>
            {selectedGoalFromDropdown ? (
              <GoalCreate
                organisation={organisation}
                project={project}
                goal={selectedGoalFromDropdown}
                open={openGoalEditPopup}
                updateHandlerForGoal={updateHandlerForGoal}
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                handleChangeForGoal={handleChangeForGoal}
                handleEditPopupClose={handleEditPopupClose}
              />) : (<div></div>)}

            <Grid
              container
              spacing={3}>
              {
                projectGoals.map((item, i) => (
                  <Grid item key={i} lg={4} md={4} xl={4} xs={12} >
                    <GoalStatus
                      organisation={organisation}
                      project={project}
                      goal={item}
                      handleTabChangeForGoal={handleTabChangeForGoal}
                      handleChangeForGoal={handleChangeForGoal}
                      handleGoalSave={handleGoalSave}
                      handleEditPopupOpen={selectedGoalForUpdate}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}

        {/* RISKS */}
        {tab === 'risks' &&
          project ? (
          <div>
            {/* PROJECT RISKS ADD AND LIST */}
            <AddRisk open={openAddPopup} handleClose={handleCloseAddPopup} project={project} organisation={organisation}></AddRisk>
            <div>
              {project ? (
                <div>
                  <ProjectRiskList handleAddPopupOpen={handleAddPopupOpen} project={project} organisation={organisation} selectedRiskForUpdate={riskSelectedForUpdate}></ProjectRiskList>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
            <ManageRisk
              open={open}
              handleProjectRiskUpdate={updateProjectRisk}
              handleClose={handleClose}
              projectRisk={riskSelectedToBeUpdated}
            ></ManageRisk>
            <MessageSnackbar open={openSnackbar} onClose={handleSnackbarClose} message={message} panelStatus={'warn'}></MessageSnackbar>
            <MessageSnackbar open={openErrorSnackbar} onClose={closeErrorSnackbar} message={message} panelStatus={'error'}></MessageSnackbar>
            <MessageSnackbar open={openSuccessSnackbar} onClose={closeSuccessSnackbar} message={message} panelStatus={'success'}></MessageSnackbar>
            <Grid
              alignItems="flex-end"
              container
              justifyContent="flex-end"
              spacing={3}
            >
            </Grid>
          </div>
        ) : (
          <div></div>
        )}
        {tab === 'records' && (
          <Grid
            className={clsx(classes.root, className)} >
            <div style={{ marginTop: "10px" }}>
              <FieldNoteList></FieldNoteList>
            </div>
          </Grid>
        )}
      </Container>
    </Page >
  );
}

General.propTypes = {
  className: PropTypes.string
};


function mapStateToProps(state: RootState, props) {

  var projects = _.values(state.projects.list);
  var project = _.values(state.projects.single);
  var goals = _.values(state.goals.list);
  var activities = _.values(state.activities.list);
  var activity = _.values(state.activities.single);
  var records = _.values(state.records.list);
  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  return {
    project,
    projects,
    goals,
    activities,
    activity,
    records,
  };
}

const loadProjectList = bindActionCreators(projectActions.fetchProjects, store.dispatch);
const saveProject = bindActionCreators(projectActions.saveProject, store.dispatch);
const createProject = bindActionCreators(projectActions.createProject, store.dispatch);

const fetchActivities = bindActionCreators(activityActions.fetchActivities, store.dispatch);
const createActivity = bindActionCreators(activityActions.createActivity, store.dispatch);
const saveActivity = bindActionCreators(activityActions.saveActivity, store.dispatch);
const loadRecordList = bindActionCreators(recordActions.fetchRecords, store.dispatch);
const loadOrganisations = bindActionCreators(organisationActions.fetchOrganisations, store.dispatch);
const loadGoalTypes = bindActionCreators(goalTypeActions.fetchGoalTypes, store.dispatch);
const createSingleGoal = bindActionCreators(goalActions.createSingleGoal, store.dispatch);

const createAndAddGoal = bindActionCreators(projectGoalActions.createAndAddGoal, store.dispatch);
const loadGoals = bindActionCreators(projectGoalActions.fetchGoals, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      loadProjectList,
      loadOrganisations,
      createProject,
      saveProject,
      fetchActivities,
      createActivity,
      saveActivity,
      loadRecordList,
      loadGoalTypes,
      createSingleGoal,
      createAndAddGoal,
      loadGoals
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);




