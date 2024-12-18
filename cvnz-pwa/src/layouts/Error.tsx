
import React, { Suspense, FunctionComponent } from 'react';
import { renderRoutes, RouteConfigComponentProps, RouteConfig } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Theme } from '@mui/material';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden'
  }
}));

interface IProps extends RouteConfigComponentProps<any> {
  route?: RouteConfig;
}

const Error: FunctionComponent<IProps> = (props) => {
  const classes = useStyles({});
  // debugger;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(props.route ? props.route.routes : undefined)}
        </Suspense>
      </div>
    </div>
  );
}

export default Error;
