
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Grid
  , Theme
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    textAlgin: 'left'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 200,
    width: '100%'
  },
  removeBotton: {
    width: '100%'
  },
  media: {
    height: 20,
    width: 20
  },
  groups: {
    marginTop: theme.spacing(5)
  },
  group: {
    marginTop: theme.spacing(2)
  }
}));

function ProfileDetails({ profile, groups, className = "", ...rest }) {
  const classes = useStyles({});
  var userGroup = groups.find(item => item.groupOwners === 'Sam Rye');
  let organisation = useSelector((state: Store) => {
    const org = state?.activeOrganisationReducers?.single;
    return org

  });
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardMedia className={classes.avatar} image={profile.avatar} />
        <CardContent className={classes.content}>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h3"
            align="left"
          >
            {`${profile.firstName} ${profile.lastName}`}
          </Typography>
          <Typography align="left" variant="body1">
            {profile.role}
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.groups}>
        <CardContent>
          <Typography variant="h3" align="left" gutterBottom>
            Groups
          </Typography>
          <Divider />
          <Grid className={classes.group} container spacing={1}>
            <Grid item xl={2} lg={2} md={2} xs={4}>
              <CardMedia
                className={classes.media}
                image={organisation?.imageUrl}
              ></CardMedia>
            </Grid>
            <Grid item xl={10} lg={10} md={10} xs={10}>
              <Typography variant="h5" color="textSecondary">
                {userGroup.groupName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
