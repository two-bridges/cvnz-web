
import React, { Suspense, FC, FunctionComponent } from 'react';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Theme } from '@mui/material';
import Topbar from './Topbar';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.down('md')]: {
      paddingTop: 56
    }
  }
}));

interface IProps extends RouteConfigComponentProps<any> {
  route?: RouteConfig;
}

var Auth: FunctionComponent<IProps> = (props) => {
  const classes = useStyles({});

  return (
    <>
      <Topbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(props.route ? props.route.routes : undefined)}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Auth;
