

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Grid, Theme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { getLocalFieldNoteImages } from 'src/redux/actions/FieldNoteActions/fieldNoteImageActions';
import uuid from 'uuid/v1';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function PhotoUploadedList(props) {
  const classes = useStyles({});
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getLocalFieldNoteImages());
  }, []);

  return (
    <Grid
      style={{ maxHeight: '400px' }}
      className={classes.root}
      container
      spacing={3}
    >
      {props.imageObj?.images?.map(img => (
        <div key={uuid()}>
          <img src={img} style={{ height: '150px', width: '150px', marginLeft: '10px', marginTop: '10px' }} />

        </div>
      ))}
    </Grid>
  );
}

PhotoUploadedList.propTypes = {
  className: PropTypes.string,
  imageObj: PropTypes.object,
};

export default PhotoUploadedList;
