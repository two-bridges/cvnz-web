
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Grid, Theme } from '@mui/material';
import axios from '../../utils/axios';
import ProjectCard from '../../components/ProjectCard';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function Projects({ className = "", ...rest }) {
  const classes = useStyles({});
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = () => {
      if (mounted) {
        axios
          .get('/api/users/1/projects')
          .then((response) => setProjects(response.data.projects));
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        container
        spacing={3}
      >
        {projects.map((project) => (
          <Grid
            item
            key={project.id}
            lg={4}
            md={6}
            xs={12}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Projects.propTypes = {
  className: PropTypes.string
};

export default Projects;
