
import React, { useEffect } from 'react';

import uuid from 'uuid/v1';
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
  colors,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Person from '../Person';
import PropTypes from 'prop-types';
import { IStaff } from "../../../redux/model/record.model";
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },

  icon: {
    // marginTop: '15px',
    color: '#979797'
  },
  addButton: {
    marginLeft: theme.spacing(2),
    height: '40px',
    width: 'auto',
    background: '#4527A0',
    color: '#FCFCFC',
    borderRadius: '3px'
  },
  //add your style classes here
}));

function People(props) {
  const { record, className = "", ...rest } = props;
  const classes = useStyles({});
  const handleChange = (event) => {
    props.handleChange(event);
  };
  const handleNumberChange = (event) => {
    props.handleNumberChange(event);
  };
  const handleChangeStaff = (event, staff) => {
    props.handleChangeStaff(staff, event);
  };

  const addPerson = (name, value) => {
    let newStaff: IStaff = {
      Email: "",
      IsAttending: false,
      Name: "",
      IsStaff: value,
      id: uuid()
    };
    props.addPerson([
      ...record.staff,
      newStaff
    ]);
  };

  return (
    //add component HTML here
    <div>
      <Card>
        <CardHeader title="People" />
        {/* Staff */}
        <Grid container spacing={2} alignItems="center" style={{ marginLeft: '20px' }}>
          <Grid item>
            <AccessibilityRoundedIcon className={classes.icon} />
          </Grid>
          <Grid item md={4} xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                label="No. of staff"
                name="numberOfStaff"

                onChange={handleNumberChange}
                value={props.record.numberOfStaff}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                label="Hours"
                name="staffHours"
                onChange={handleNumberChange}
                value={props.record.staffHours}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Volunteers */}
        <Grid container spacing={2} alignItems="center" style={{ marginLeft: '20px' }}>
          <Grid item>
            <AccessibilityRoundedIcon className={classes.icon} />
          </Grid>
          <Grid item md={4} xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                label="No. of volunteers"
                name="numberOfVolunteers"
                onChange={handleNumberChange}
                value={props.record.numberOfVolunteers}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                fullWidth
                label="Hours"
                name="volunteersHours"
                type="number"
                onChange={handleNumberChange}
                value={props.record.volunteersHours}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>

        <br />
      </Card>
      <br />
      <Card>
        <CardHeader title="Staff" />

        {record.staff && record.staff
          // TODO: filter Staff only
          .filter(person => !!person.IsStaff)
          .map((person, i) => {
            return <Person key={i} staff={person} record={record} handleChange={handleChangeStaff} />;
          })}
        <br />
        <CardActions disableSpacing>
          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}
          >
            <Button
              className={classes.addButton}
              onClick={(e) => addPerson("IsStaff", true)}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </CardActions>
      </Card>

      <br />
      <Card>
        <CardHeader title="Volunteer" />

        {record.staff && record.staff
          .filter(person => !person.IsStaff)
          .map((person, i) => {
            return <Person key={i} staff={person} record={record} handleChange={handleChangeStaff} />;
          })}
        <br />
        <CardActions disableSpacing>


          <Grid item alignItems="flex-end"
            container
            justifyContent="flex-end"
            spacing={3}>
            <Button
              className={classes.addButton}
              onClick={(e) => addPerson("IsStaff", false)}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </Grid>


        </CardActions>
      </Card>
    </div >
  );
}

People.propTypes = {
  //add properties and types here
  record: PropTypes.object,
  handleChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  addPerson: PropTypes.func,
  handleChangeStaff: PropTypes.func,
};

export default People;
