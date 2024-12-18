
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Fab, Theme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
  //add your style classes here
}));

function AddButtonIcon({ handleClickEvent }) {
  const classes = useStyles({});
  return (
    //add component HTML here
    <Fab
      onClick={handleClickEvent}
      className={classes.fab}
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
}

AddButtonIcon.propTypes = {
  //add properties and types here
  onToggle: PropTypes.func
};

export default AddButtonIcon;
