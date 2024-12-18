
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Grid, Theme } from '@mui/material';
import ProjectCard from './ProjectCard';
import { IProject } from 'src/redux/model/project.model';
import { IOrganisation } from 'src/redux/model/organisation.model';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function ProjectList({ projects, organisation, className = "", ...rest }: { projects: IProject[], organisation: IOrganisation | undefined, className?: string }) {
  const classes = useStyles({});

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      {projects.map(project => (
        <Grid item key={project.id} lg={4} xs={12}>
          <ProjectCard project={project} organisation={organisation} />
        </Grid>
      ))}
    </Grid>
  );
}

ProjectList.propTypes = {
  className: PropTypes.string,
  projects: PropTypes.array.isRequired,
  organisation: PropTypes.object
};

export default ProjectList;
