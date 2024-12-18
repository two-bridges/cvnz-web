
import { useHistory, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, colors, Theme } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProjectList from './ProjectList';
import Page from '../../components/Page';
import SpeedDialTooltipOpen from '../../components/SpeedDial';
import PropTypes from "prop-types";
import * as projectActions from "../../redux/actions/projectActions";
import * as _ from "underscore";
import { IProject } from '../../redux/model/project.model';
import { store } from 'src/redux/store/configureStore';
import * as organisationActions from 'src/redux/actions/organisationActions';
import { IOrganisation } from 'src/redux/model/organisation.model';
import { loadLocalOrganisation, loadOrganisation } from 'src/redux/actions/editableOrganisationActions';
import { Store } from 'src/redux/reducers/rootReducer';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    //paddingTop: theme.spacing(3),
    //paddingBottom: theme.spacing(3)
  },
  tabs: {
    //marginTop: theme.spacing(3)
    backgroundColor: '#FCFCFC',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)'
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  bigIndicator: {
    height: 4,
  },
  //add your style classes here
}));

function ProjectsPage(props) {
  const { className = "", ...rest } = props;
  const organisation = useSelector((state: Store) => state?.editableOrganisation?.entity);
  console.log(`organisation: ${organisation?.id}`);
  const dispatch = useDispatch();

  const actions = props.actions as {
    loadProjectList: projectActions.FnLoadProjectList,
  };
  const classes = useStyles({});
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tab, setTab] = useState<any>('active');

  const tabs = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archive' }
  ];

  const handleTabsChange = (event, value) => {
    setTab(value);
  };

  useEffect(() => {
    dispatch(loadLocalOrganisation());
  }, []);

  useEffect(() => {
    if (organisation) {
      actions.loadProjectList({ orgId: organisation.id }).then(response => {
        setProjects(response.payload);
      });
    }
  }, [organisation]);

  if (!projects || !props.projects) {
    return null;
  } else {
    console.log(`has projects.length ${projects.length}`);
  }
  if (!tab) {
    return <Redirect to={`/projects`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }
  return (
    <Page className={classes.root} title="Project Details">

      <Container maxWidth="lg">

        <Tabs
          value={tab}
          classes={{ indicator: classes.bigIndicator }}
          className={classes.tabs}
          indicatorColor="primary"
          style={{ color: '#263238', boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)' }}
          onChange={handleTabsChange}
          aria-label="disabled tabs example"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} style={{ boxShadow: '0px 4px 8px rgba(176, 190, 197, 0.24)' }} />
          ))}
        </Tabs>
        <div className={classes.content}>
          {tab === 'active' && (
            <ProjectList
              organisation={organisation}
              projects={projects && projects.filter(
                item => item.status !== 'onhold' && item.status !== 'archived'
              )}
            />
          )}
          {tab === 'archived' && (
            <ProjectList
              organisation={organisation}
              projects={projects && projects.filter(
                item => item.status === 'archived'
              )}
            />
          )}
        </div>
        {/* <SpeedDialTooltipOpen organisation={organisation} /> */}
      </Container>
    </Page >
  );
}

ProjectsPage.propTypes = {
  //add properties and types here
  projects: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
  var projects = _.values(state.projects.list);

  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  return {
    projects,
  };
}

const loadProjectList = bindActionCreators(projectActions.fetchProjects, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      loadProjectList,
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage);
