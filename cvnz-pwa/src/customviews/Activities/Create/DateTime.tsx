
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateFnsUtils from '@date-io/date-fns';

// https://mui.com/x/react-date-pickers/localization/
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/x-date-pickers';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    //margin: theme.spacing(1),
    minWidth: '100%'
  },
  labelStyle: {
    fontSize: '16px'
  }
  //add your style classes here
}));

const locales = ['en', 'en-au'] as const;

function DateTime(props) {
  const [locale, setLocale] = React.useState<typeof locales[number]>('en-au');

  const { activity } = props;
  const classes = useStyles({});


  const handleChange = (name, value) => {
    let value1 = moment(value).toISOString()
    props.handleChangeNameAndValue(name, value1);
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={8} xs={12}>
        <Typography variant="h5" style={{ padding: '6px', fontWeight: 'normal' }}>When is the activity?</Typography>
      </Grid>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={locale}
      // variant="outlined"
      >
        <Grid item md={6} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            {/* MUI DatePicker: https://mui.com/x/react-date-pickers/date-picker/ */}
            <MobileDatePicker
              className={classes.labelStyle}
              // inputVariant="outlined"
              // disableToolbar
              // variant="inline"
              // format="dd/MM/yyyy"
              // mar gin="normal"
              // id="date"
              label="Date"
              value={props.activity.activityDate}
              onChange={(value) => handleChange("activityDate", value)}
              // KeyboardButtonProps={{
              //   'aria-label': 'change date'
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            {/* TimePicker: https://mui.com/x/react-date-pickers/time-picker/ */}
            <TimePicker
              className={classes.labelStyle}
              // inputVariant="outlined"
              // margin="normal"
              label="Start Time"
              value={props.activity.startTime}
              onChange={(value) => handleChange("startTime", value)}
              // KeyboardButtonProps={{
              //   'aria-label': 'change time'
              // }}
              renderInput={(params) => <TextField {...params} />}
            // keyboardIcon={<AccessTimeIcon />}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TimePicker
              className={classes.labelStyle}
              // inputVariant="outlined"
              // margin="normal"
              label="End Time"
              value={props.activity.endTime}
              onChange={(value) => handleChange("endTime", value)}
              // KeyboardButtonProps={{
              //   'aria-label': 'change time'
              // }}
              renderInput={(params) => <TextField {...params} />}
            // keyboardIcon={<AccessTimeIcon />}
            />

          </FormControl>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}

DateTime.propTypes = {
  //add properties and types here
  activity: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeNameAndValue: PropTypes.func,
};

export default DateTime;
