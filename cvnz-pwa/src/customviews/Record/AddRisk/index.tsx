
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
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  title: {
    marginLeft: '10px'
  }
  //add your style classes here
}));

function AddRisk(props) {
  const { index, record, risk, className = "", ...rest } = props;
  const classes = useStyles({});

  const handleChange = event => {
    props.handleChange(event, risk);
  };
  const RiskTypes = ["Site", "Bush"];
  const Likelihood = ["Low", "Medium", "High"];
  const Severity = ["Low", "Medium", "High"];
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title} gutterBottom>
            Risk {index}
          </Typography>

          <Grid container spacing={2} alignItems="center">

            <Grid item md={5} xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Project"
                  fullWidth
                  name="type"
                  value={risk.type}
                  onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {RiskTypes.map(name => (
                    <MenuItem value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item md={5} xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={risk.description}
                  variant="outlined"
                />
              </FormControl>
            </Grid>


          </Grid>
          <Grid container spacing={2} alignItems="center">

            <Grid item md={5} xs={10} >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Likelihood</InputLabel>
                <Select
                  label="Likelihood"
                  fullWidth
                  name="likelihood"
                  value={risk.likelihood}
                  onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Likelihood.map(name => (
                    <MenuItem value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item md={5} xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Severity</InputLabel>
                <Select
                  label="severity"
                  fullWidth
                  name="severity"
                  value={risk.severity}
                  onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Severity.map(name => (
                    <MenuItem value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>


          </Grid>
          <br />
        </CardContent>

      </Card>
      <br />
      <br />
    </div>
  );
}

AddRisk.propTypes = {
  //add properties and types here
  risk: PropTypes.object,
  record: PropTypes.object,
  index: PropTypes.number,
  handleChange: PropTypes.func
};

export default AddRisk;
