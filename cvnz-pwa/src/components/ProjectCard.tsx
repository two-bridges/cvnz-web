
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
  , Theme
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import getInitials from '../utils/getInitials';
import Label from '../components/Label';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3)
  },
  tags: {
    padding: theme.spacing(1, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  learnMoreButton: {
    marginLeft: theme.spacing(5)
  },
  recordButton: {
    marginLeft: theme.spacing(2)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  }
}));

function ProjectCard({ project, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <Avatar alt="Author" src={project.author.avatar}>
            {getInitials(project.author.name)}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography variant="body2">
            by{' '}
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/profile/1/timeline"
            // variant="h6"
            >
              {project.author.name}
            </Link>{' '}
            | Updated: {moment(project.updated_at).fromNow()}
          </Typography>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to="/projects/1/overview"
            variant="h5"
          >
            {project.title}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography color="textSecondary" variant="subtitle2">
            We&apos;re looking for experienced Developers and Product Designers
            to come aboard and help us build succesful businesses through
            software.
          </Typography>
        </div>
        <Divider />
        <div className={classes.tags}>
          {project.tags.map(tag => (
            <Label color={tag.color} key={tag.text}>
              {tag.text}
            </Label>
          ))}
        </div>

        <div className={classes.details}>
          <Grid
            alignItems="flex-end"
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Button
                className={classes.learnMoreButton}
                component={RouterLink}
                size="small"
                to={"/activitymanage/" + project.projectId}
              >
                Edit
              </Button>
              <Button
                className={classes.recordButton}
                color="secondary"
                component={RouterLink}
                size="small"
                to={"/record/" + project.projectId}
              >
                Record
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
