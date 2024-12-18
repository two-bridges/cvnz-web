
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
import { IOrganisation } from 'src/redux/model/organisation.model';
import { Store } from 'src/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { useStyles } from './profileStyles';

function ProfileDetails({ className = "", ...rest }) {
  const classes = useStyles({});
  let org: IOrganisation | undefined;
  org = useSelector((state: Store) => state?.activeOrganisationReducers?.single);

  if (!org) {
    let orgStored = sessionStorage.getItem('organisation');
    if (orgStored) {
      org = JSON.parse(orgStored) as IOrganisation;
    }
  }
  return (
    <div {...rest} className={clsx(classes.root, className)}>

      <Card>
        <CardMedia className={classes.avatar} image={org!?.imageUrl} />
        <CardContent>
          <Grid className={classes.group} container >
            <Grid item xl={10} lg={10} md={10} xs={10}>
              <Typography variant="h5" color="textSecondary">
                {org!?.name}
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
};

export default ProfileDetails;
