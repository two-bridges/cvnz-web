
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Card, Typography, Avatar, colors
  , Theme
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpenOutlined';
import Label from '../../components/Label';
import gradients from '../../utils/gradients';
import { mdiSprout } from '@mdi/js';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.blue,
    height: 48,
    width: 48
  }
}));

function NewProjects(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const data = {
    value: '830',
    difference: '-10%'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          Weeding
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{props.weedingCount}</Typography>

        </div>
      </div>
      {/* <mdiSprout /> */}
      <Avatar className={classes.avatar}>
        {/* <mdiSprout /> */}
      </Avatar>
    </Card>
  );
}

NewProjects.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array,
  weedingCount: PropTypes.number
};

export default NewProjects;
