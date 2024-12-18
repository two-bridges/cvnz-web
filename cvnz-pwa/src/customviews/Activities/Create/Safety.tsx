
import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {
  Input,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  useTheme,
  FormHelperText,
  Typography,
  Theme,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    //margin: theme.spacing(1),
    minWidth: '100%'
  }
  //add your style classes here
}));

function Safety(props) {
  const { activity } = props;
  const classes = useStyles({});


  const handleSafetyChange = (event) => {
    props.handleSafetyChange(event)
  }
  return (
    //add component HTML here Is there a site risk assessment in place for this activity
    <Grid container spacing={1}>
      <Grid item md={8} xs={12}>
        <Typography variant="h5" style={{ padding: '6px', fontWeight: 'normal' }}>Is there a site risk assessment in place for this activity?</Typography>

      </Grid>
      <Grid item md={6} xs={12}>
        <FormControlLabel
          className={classes.formControl}
          control={
            <Switch
              checked={props.activity.isSafteyChecked}
              onChange={handleSafetyChange}
              value={props.activity.isSafteyChecked}
              color="primary"
              name="isSafteyChecked"
            />
          }

          label={<span style={{ fontSize: '16px' }}>Yes, we have undertaken a risk assessment.</span>}
        />
      </Grid>
    </Grid>
  );
}

Safety.propTypes = {
  //add properties and types here
  activity: PropTypes.object,
  handleChange: PropTypes.func,
  handleSafetyChange: PropTypes.func.isRequired
};

export default Safety;
