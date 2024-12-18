
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, Theme } from '@mui/material';
import RichEditor from '../../components/RichEditor';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function ProjectDetails({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Project details" />
      <CardContent>
        <RichEditor placeholder="Say something about the product..." />
      </CardContent>
    </Card>
  );
}

ProjectDetails.propTypes = {
  className: PropTypes.string
};

export default ProjectDetails;
