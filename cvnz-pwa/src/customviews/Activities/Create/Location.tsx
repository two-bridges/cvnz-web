
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Typography,
  Theme,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  labelStyle: {
    fontSize: '16px'
  }
  //add your style classes here
}));

function Location(props) {
  const { activity } = props;
  const classes = useStyles({});

  const handleChange = event => {
    props.handleChange(event);
  }
  return (
    //add component HTML here

    <Grid container spacing={1}>
      <Grid item md={8} xs={12}>
        <Typography variant="h5" style={{ padding: '6px', fontWeight: 'normal' }}>Where should people meet?</Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>

          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }}
            fullWidth
            label="Address"
            name="address1"
            onChange={handleChange}
            value={activity.address1}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }}
            fullWidth
            label="Address 2"
            name="address2"
            onChange={handleChange}
            value={activity.address2}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }}
            fullWidth
            label="City"
            name="city"
            onChange={handleChange}
            value={activity.city}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }}
            fullWidth
            label="State"
            name="state"
            onChange={handleChange}
            value={activity.state}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item alignItems="flex-end"
        container
        justifyContent="center">
        <span style={{ fontFamily: 'Roboto' }}>Or</span>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }}
            fullWidth
            label="Coordinates"
            name="coordinates"
            onChange={handleChange}
            value={activity.coordinates}
            variant="outlined"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

Location.propTypes = {
  //add properties and types here
  activity: PropTypes.object,
  handleChange: PropTypes.func
};

export default Location;
