
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
  Theme,
  Fab,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import AddRisk from '../AddRisk';
import AddIcon from '@mui/icons-material/Add';
import { IRisk } from 'src/redux/model/record.model';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
  //add your style classes here
}));

function Risk(props) {
  const { record, className = "", ...rest } = props;
  const classes = useStyles({});
  const handleChange = (event, risk) => {
    props.handleRiskChange(risk, event);
  };
  const addRisk = event => {
    let newRisk: IRisk = {
      id: "",
      type: "",
      description: "",
      likelihood: "",
      severity: "",
      Actions: []
    };
    props.addRisk([
      ...record.risk,
      newRisk
    ]);
  };


  return (
    <div>
      {

        record.risk && record.risk
          .map((risk, i) => <AddRisk risk={risk} key={i} index={i + 1} record={record} handleChange={handleChange} />)

      }
      <CardActions disableSpacing>
        <Grid item alignItems="flex-end"
          container
          justifyContent="flex-end"
          spacing={3}>
          <Button
            className={classes.addButton}
            onClick={addRisk}
            color="primary"
            variant="contained">
            Add
          </Button>
        </Grid>
      </CardActions>
      <br />
      <br />
      <br />
    </div>
  );
}

Risk.propTypes = {
  //add properties and types here
  record: PropTypes.object,
  handleChange: PropTypes.func,
  addRisk: PropTypes.func,
  handleRiskChange: PropTypes.func,
};

export default Risk;
