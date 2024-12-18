
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Container, Tabs, Tab, Divider, colors, Theme } from '@mui/material';
import axios from '../../utils/axios';
import Subscribers from './Subscribers';
import Page from '../../components/Page';
import SpeedDialTooltipOpen from '../../components/SpeedDial';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  }
  //add your style classes here
}));

function ProjectDetailsNew({ match, history }) {
  const classes = useStyles({});
  const [project, setProject] = useState<any>(null);
  const [tab, setTab] = useState<any>('active');

  const tabs = [
    { value: 'active', label: 'Active' },
    { value: 'onhold', label: 'On Hold' },
    { value: 'archived', label: 'Archived' }
  ];
  const handleTabsChange = (event, value) => {
    setTab(value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchProject = () => {
      axios.get('/api/projects/1').then(response => {
        if (mounted) {
          setProject(response.data.project);
        }
      });
    };

    fetchProject();

    return () => {
      mounted = false;
    };
  }, []);

  if (!tab) {
    return <Redirect to={`/projects`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!project) {
    return null;
  }

  return (
    <Page className={classes.root} title="Project Details">
      <Container maxWidth="lg">
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === 'active' && (
            <Subscribers
              subscribers={project.subscribers.filter(
                item => item.status === 'active'
              )}
            />
          )}
          {tab === 'onhold' && (
            <Subscribers
              subscribers={project.subscribers.filter(
                item => item.status === 'onhold'
              )}
            />
          )}
          {tab === 'archived' && (
            <Subscribers
              subscribers={project.subscribers.filter(
                item => item.status === 'archived'
              )}
            />
          )}
        </div>
        {/* <SpeedDialTooltipOpen /> */}
      </Container>
    </Page>
  );
}

ProjectDetailsNew.propTypes = {
  //add properties and types here
};

export default ProjectDetailsNew;
