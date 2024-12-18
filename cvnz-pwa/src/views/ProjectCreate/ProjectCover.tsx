
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, Theme } from '@mui/material';
import FilesDropzone from '../../components/FilesDropzone';

const useStyles = makeStyles<Theme>(() => ({
  root: {}
}));

function ProjectCover({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Project cover" />
      <CardContent>
        <FilesDropzone />
      </CardContent>
    </Card>
  );
}

ProjectCover.propTypes = {
  className: PropTypes.string
};

export default ProjectCover;
