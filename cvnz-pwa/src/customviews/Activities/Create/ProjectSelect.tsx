
import React, { useEffect, useState } from 'react';
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
  Typography,
  Theme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import * as _ from 'underscore';
import axios from '../../../utils/axios';
import { IProject } from 'src/redux/model/project.model';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',

  },
  labelStyle: {
    fontSize: '16px'
  }
  //add your style classes here
}));

function ProjectSelect(props) {
  const { activity, project, projects, className = "", ...rest } = props;
  const classes = useStyles({});


  const handleChange = event => {
    props.handleChange(event);
  }


  return (
    //add component HTML here
    <Grid container spacing={2} >
      <Grid item md={8} xs={12}>
        <Typography variant="h5" style={{ padding: '6px', fontWeight: 'normal' }}>What Project is this activity part of?</Typography>

      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.labelStyle}>Projects</InputLabel>
          <Select
            className={classes.labelStyle}
            label="Project"
            fullWidth
            name="projectId"
            value={props.activity.projectId || ""}
            onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.projects.map(item => (
              <MenuItem value={item.id}>{item.projectName}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Grid>
    </Grid>
  );
}

ProjectSelect.propTypes = {
  //add properties and types here
  activity: PropTypes.object,
  project: PropTypes.object,
  projects: PropTypes.array,
  handleChange: PropTypes.func
};

export default ProjectSelect;
