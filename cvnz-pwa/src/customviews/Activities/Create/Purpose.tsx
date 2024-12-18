
import React from 'react';
import PropTypes from 'prop-types';
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
  Theme,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  labelStyle: {
    fontSize: '16px'
  }
  //add your style classes here
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Planting',
  'Weeding',
  'Rubbish Collection'
];

function getStyles(name, personName, theme) {
  return {

    fontWeight:
      !personName
        ? theme.typography.fontWeightRegular
        : personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
  };
}

function Purpose(props) {
  const { activity } = props;
  const classes = useStyles({});
  const theme = useTheme<Theme>();

  const handleChange = event => {
    props.handleChange(event);
  }
  const handleChangeType = event => {
    props.handleChangeType(event);
  }
  return (
    //add component HTML here
    <Grid container spacing={1}>
      <Grid item md={8} xs={12}>
        <Typography variant="h5" style={{ padding: '6px', fontWeight: 'normal' }}>What’s the purpose of the activity?</Typography>
      </Grid>
      <Grid item md={8} xs={12}>
        <FormControl className={classes.formControl} variant="standard">
          <InputLabel variant="standard" id="demo-mutiple-chip-label" className={classes.labelStyle} style={{ marginTop: '5px', marginBottom: '5px' }}>
            Type of activity
          </InputLabel>

          <Select
            className={classes.labelStyle}
            variant="outlined"
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            name='activityTypes'
            value={props.activity.activityTypes || []}
            onChange={handleChangeType}
            input={<Input
              // variant="outlined" 
              id="select-multiple-chip"
            />}
            renderValue={(selected: any) => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                // variant="outlined"
                key={name}
                value={name}
                style={getStyles(name, props.activity.activityTypes, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select up to 3</FormHelperText>
        </FormControl>

      </Grid>
      <Grid item md={8} xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            InputProps={{
              classes: {
                input: classes.labelStyle,
              },
            }} fullWidth
            label="Notes on project"
            name="notes"
            multiline
            rows="5"
            onChange={handleChange}
            value={props.activity.notes}
            variant="outlined"
          />
        </FormControl>
      </Grid>
    </Grid >
  );
}

Purpose.propTypes = {
  //add properties and types here
  activity: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeType: PropTypes.func,
};

export default Purpose;
