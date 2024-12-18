// https://mui.com/x/react-date-pickers/localization/
import { LocalizationProvider, MobileDatePicker, StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React, { useEffect } from 'react';
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
  TextField,
  Select,
  Typography,
  Icon,
  Theme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import * as _ from 'underscore';
import axios from '../../../utils/axios';
import BookIcon from '@mui/icons-material/Book';
import moment from 'moment';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';
const locales = ['en', 'en-au'] as const;

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  icon: {
    //marginTop: '15px',
    color: '#979797'
  },
  mainContainer: {
    marginLeft: theme.spacing(3),
  }
  //add your style classes here
}));

function SelectProject(props) {
  const [locale, setLocale] = React.useState<typeof locales[number]>('en-au');

  const { project, projects, record, className = "", ...rest } = props;
  const classes = useStyles({});


  const handleChange = event => {
    props.handleChange(event);
  };

  const handleChangeNameAndValue = (name, value) => {
    let value1 = moment(value).toISOString()
    props.handleChangeNameAndValue(name, value1);
  }

  return (
    //add component HTML here
    <Card >
      <CardHeader title="Project" />
      <Grid container alignItems="center" className={classes.mainContainer}>
        <Grid item md={8} sm={12} xs={12}>

          <Grid container spacing={2} alignItems="center">
            <Grid item sm={1} xs={1}>
              <BookRoundedIcon className={classes.icon} />
            </Grid>
            <Grid item md={8} lg={8} sm={8} xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                  labelId="project-label"
                  id="project-label-outlined"
                  name="projectId"
                  value={props.record.projectId || ""}
                  onChange={handleChange}
                  label="Project"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {props.projects.map((item, i) => (
                    <MenuItem key={i} value={item.id}>{item.projectName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={8} sm={12} xs={12}>

          <Grid container spacing={2} alignItems="center">
            <Grid item sm={1} xs={1}>
              <RoomRoundedIcon className={classes.icon} />
            </Grid>
            <Grid item md={8} lg={8} sm={8} xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  fullWidth
                  label="Meeting Point"
                  name="meetingPoint"
                  onChange={handleChange}
                  value={props.record.meetingPoint}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>


        <Grid item md={8} sm={12} xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item sm={1} xs={1}>
              <DateRangeRoundedIcon className={classes.icon} />
            </Grid>
            <Grid item md={8} lg={8} sm={8} xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={locale}>
                  <StaticDatePicker
                    displayStaticWrapperAs="mobile"
                    openTo="year"
                    value={props.record.recordDate}
                    onChange={(value) => handleChangeNameAndValue("recordDate", value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={8} sm={12} xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item sm={1} xs={1}>
              <NoteRoundedIcon className={classes.icon} />
            </Grid>
            <Grid item md={8} lg={8} sm={8} xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows="5"
                  onChange={handleChange}
                  value={props.record.address1}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

      </Grid>


    </Card>
  );
}

SelectProject.propTypes = {
  children: PropTypes.node,
  projects: PropTypes.array,
  project: PropTypes.object,
  record: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeNameAndValue: PropTypes.func
  //add properties and types here
};

export default SelectProject;
