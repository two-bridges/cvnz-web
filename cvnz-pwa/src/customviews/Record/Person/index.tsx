
import React, { useEffect } from 'react';
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
  TextField,
  Select,
  Typography,
  Icon,
  Switch,
  FormControlLabel,
  Theme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%'
  },
  mainContainer: {
    marginLeft: theme.spacing(1),
  }
  //add your style classes here
}));

function Person(props) {
  const { record, staff, className = "", ...rest } = props;
  const classes = useStyles({});

  const handleChange = event => {
    props.handleChange(event, staff);
  };

  return (
    <div>
      <Grid container spacing={4} className={classes.mainContainer} alignItems="center">

        <Grid item md={4} xs={10} >

          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              fullWidth
              label="Name"
              name="Name"
              onChange={handleChange}
              value={staff.Name}
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item md={4} xs={10}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              fullWidth
              label="Email"
              name="Email"
              onChange={handleChange}
              value={staff.Email}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        {/* <Grid item md={2} xs={10}>

          <FormControlLabel
            className={classes.formControl}
            label="IsAttending"
            control={
              <Switch
                checked={staff.IsAttending}
                onChange={handleChange}
                name="IsAttending"
                value="staff.IsAttending"
                color="primary"

              />
            }
          />
        </Grid> */}
      </Grid>
    </div>
  );
}

Person.propTypes = {
  //add properties and types here
  staff: PropTypes.object,
  record: PropTypes.object,
  handleChange: PropTypes.func
};

export default Person;
