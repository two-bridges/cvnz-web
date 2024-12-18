
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
import ActivityData from '../ActivityData';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: '0 2px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  title: {
    // marginLeft: '10px'
    margin: theme.spacing(1),
  }

  //add your style classes here
}));

function ActivityDataComp(props) {
  const { index, record, data, className = "", ...rest } = props;
  const classes = useStyles({});

  const handleChange = event => {
    props.handleChange(event, data);
  };
  const handleNumberChange = event => {
    props.handleNumberChange(event, data);
  };

  const activityTypes = ["Tree Planting", "Weed Control", "Rubbish Cleanup"];
  return (
    <div>
      <Card className={classes.root} >
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title} gutterBottom >
            Activity Data {index}
          </Typography>
          <Grid container spacing={4} alignItems="center">

            <Grid item md={6} xs={8}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Project"
                  fullWidth
                  name="type"
                  value={data.type}
                  onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {activityTypes.map((name, i) => {
                    return <MenuItem key={i} value={name}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>

            </Grid>

            <Grid item md={6} xs={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  fullWidth
                  label="Number"
                  name="number"
                  onChange={handleNumberChange}
                  value={data.number}
                  variant="outlined"
                />
              </FormControl>
            </Grid>


          </Grid>
        </CardContent>
      </Card >
      <br />
    </div >
  );
}

ActivityDataComp.propTypes = {
  //add properties and types here
  data: PropTypes.object,
  record: PropTypes.object,
  index: PropTypes.number,
  handleChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
};

export default ActivityDataComp;
