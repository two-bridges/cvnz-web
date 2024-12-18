
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
import getInitials from '../../utils/getInitials';
import Label from '../../components/Label';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 3, 1, 3),
    height: 'auto',
    width: 'auto',
    borderRadius: '8px'
  },
  header: {
    paddingBottom: 0
  },

  tags: {
    //padding: theme.spacing(1, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  learnMoreButton: {
    marginLeft: theme.spacing(5)
  },
  recordButton: {
    marginLeft: theme.spacing(2),
    height: '40px',
    width: '80px',
    background: '#4527A0',
    color: '#FCFCFC',
    borderRadius: '3px'
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  },
  headerTitle: {
    padding: 0,
    // 
  },
  tagLabel: {
    backgroundColor: '#4527A0',
    color: '#FCFCFC',
    borderRadius: "99px",
    height: "32px",
    width: "auto",
    fontSize: '14px'
  },
}));

function ActivityCard(props) {
  const classes = useStyles({});
  const { activity, className = "", ...rest } = props;
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        className={classes.headerTitle}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={activity.project && activity.project.files ? activity.project.files : ''}>
          </Avatar>
        }
        title={moment(activity.activityDate).format('DD-MMMM-YYYY')}
        titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
        subheader={activity.project ? activity.project.projectName : ''}
        subheaderTypographyProps={{ variant: 'body1' }}
      />
      <br />
      <CardContent>
        <div >
          <Typography color="textSecondary" variant="h5" style={{ fontWeight: 'normal', color: '#263238', height: 80 }}>

            {activity.notes}
          </Typography>

        </div>
        <br />

        {/* <Grid container spacing={4}>
          <Grid item md={6} xs={4}>
            Start Time:{moment(activity.startTime).format('hh:mm A')}
          </Grid>
          <Grid item md={6} xs={6}>
            End Time:{moment(activity.endTime).format('hh:mm A')}
          </Grid>
        </Grid> */}

        {/* {activity.project ? (
          <div className={classes.tags}>
            <Label color="#4527A0" className={classes.tagLabel} key={activity.project.projectName}>
              {activity.project.projectName}
            </Label>

          </div>
        ) : (
            <div className={classes.tags}>

              <Label color="white" key={undefined}>
                {undefined}
              </Label>

            </div>
          )

        }
        <br /> */}
        <Divider />

        {/* <div className={classes.tags}>
          {props.activity.map(tag => (
            <Label color={tag.color} key={tag.text}>
              {tag.text}
            </Label>
          ))}
        </div> */}


        <div className={classes.details}>
          <Grid
            alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}
          >
            <Grid item>
              <Button
                className={classes.learnMoreButton}
                component={RouterLink}
                size="small"
                to={"/activities/create/" + activity.id}
              >
                Edit
              </Button>
              {/* <Button
                className={classes.recordButton}
                color="secondary"
                component={RouterLink}
                size="small"
                to={"/record/" + activity.id}
              >
                Record
              </Button> */}
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.object.isRequired
};

export default ActivityCard;
