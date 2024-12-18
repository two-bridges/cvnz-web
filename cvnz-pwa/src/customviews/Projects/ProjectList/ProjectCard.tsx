
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Avatar,
  Button
  , Theme
} from '@mui/material';
import Label from '../../../components/Label';
import { IProject } from 'src/redux/model/project.model';
import { IOrganisation } from 'src/redux/model/organisation.model';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0)
  },
  media: {
    height: 225
  },
  content: {
    paddingTop: 0
  },
  avatarContainer: {
    marginTop: -32,
    display: 'flex',
    justifyContent: 'left'
  },
  avatar: {
    height: 64,
    width: 64,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white
  },
  divider: {
    marginTop: theme.spacing(5)
  },
  projectNotes: {
    marginTop: theme.spacing(2)
  },
  projectActions: {
    margin: theme.spacing(1, 0)
  },
  projectName: {
    // margin: theme.spacing(2, 0),
    color: '#FCFCFC',
    fontSize: '24px',
    position: 'absolute'
  }
}));

function ProjectCard({ project, organisation, className = "", ...rest }: { project: IProject, organisation: IOrganisation | undefined, className?: string }) {
  const classes = useStyles({});
  const projectParams = useParams<{ organisation: string }>();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardMedia className={classes.media} image={project.files || "/images/gray-background.jpg"} />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
        </div>

        <div className={classes.divider} >
          <Typography
            align="left"
            display="block"
            variant="subtitle1"
          >
            <b> Project: </b> {project.projectName}
          </Typography>
          <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
            <b>Status: </b>  {project.status}
          </Typography>
        </div>
        {/* <div>
          <Typography className={classes.projectNotes} variant="h5" style={{ fontWeight: 'normal' }}>
            {project.projectType}
          </Typography>
        </div> */}
        <Grid item style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button className={classes.projectActions}
            component={RouterLink}
            color='primary'
            size='small'
            to={`/${projectParams.organisation}/project/` + project.id}
            variant="contained">Manage</Button>

        </Grid>
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  organisation: PropTypes.object
};

export default ProjectCard;
