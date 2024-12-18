
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
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import * as _ from 'underscore';
import axios from '../../../utils/axios';
import BookIcon from '@mui/icons-material/Book';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  }
  //add your style classes here
}));

function Notes(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const [notes, setNotes] = React.useState<any>('');

  const handleChange = event => {
    setNotes(event.target.value);
  };


  return (
    //add component HTML here
    <Card>
      <CardHeader title="Notes" />
      <Grid container spacing={4} alignItems="center" style={{ marginLeft: '5px' }}>
        <Grid item md={8} xs={10}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              fullWidth
              label="Description"
              name="notes"
              multiline
              rows="5"
              // onChange={handleChange}
              // value={address}
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </Grid>
      <br />
    </Card>
  );
}

Notes.propTypes = {
  //add properties and types here
};

export default Notes;
