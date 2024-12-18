
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
import { IData } from 'src/redux/model/record.model';
import ActivityDataComp from '../ActivityData';
import AddIcon from '@mui/icons-material/Add';


import uuid from 'uuid/v1';
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

function Data(props) {

  const { record, className = "", ...rest } = props;
  const classes = useStyles({});

  const handleChange = (event, data) => {
    //console.log(`record.data handleChange: ${JSON.stringify(data, null, 2)}`);
    props.handleChangeData(data, event);
  };

  const handleNumberChange = (event, data) => {
    //console.log(`record.data handleChange: ${JSON.stringify(data, null, 2)}`);
    props.handleDataNumberChange(data, event);
  };

  const addData = event => {
    let newData: IData = {
      type: "",
      number: 0,
      id: uuid()
    };
    props.addData([
      ...record.data,
      newData
    ]);
  };
  console.log(`record.data: ${JSON.stringify(record.data, null, 2)}`);
  return (
    //add component HTML here
    <div>
      {
        record.data && record.data
          .map((data, i) => {
            return <ActivityDataComp
              key={i}
              index={i + 1}
              data={data}
              record={record}
              handleChange={handleChange}
              handleNumberChange={handleNumberChange}
            />;
          })
      }
      <CardActions disableSpacing>


        <Grid item alignItems="flex-end"
          container
          justifyContent="flex-end"
          spacing={3}>
          <Button
            className={classes.addButton}
            onClick={addData}
            color="primary"
            variant="contained"
          >
            Add Activity
          </Button>
        </Grid>


      </CardActions>
      <br />
      <br />
      <br />
    </div>
  );
}

Data.propTypes = {
  //add properties and types here
  record: PropTypes.object,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  addData: PropTypes.func,
  handleChangeData: PropTypes.func,
  handleDataNumberChange: PropTypes.func,
};

export default Data;
