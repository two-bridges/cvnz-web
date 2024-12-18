
import React, { Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Theme } from '@mui/material';
import NavBar from './NavBar';
import TopBar from './TopBar';

import { RootState, Store } from '../../redux/reducers/rootReducer';
import * as _ from "underscore";
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: '100%',

    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 56
    }
  }
}));

function Dashboard(props) {
  const classes = useStyles({});
  const [openNavBarMobile, setOpenNavBarMobile] = useState<any>(false);
  const session = useSelector((state: RootState) => state.userSessionV2);

  console.log(`Dashboard > User session: ${session?.loggedIn}`);
  return (
    <>
      <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
      <NavBar
        onMobileClose={() => setOpenNavBarMobile(false)}
        openMobile={openNavBarMobile}
      />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {session?.loggedIn && renderRoutes(props.route ? props.route.routes : undefined)}
          </Suspense>
        </div>
      </div>
    </>
  );
}


function mapStateToProps(state: RootState) {
  var user = state.userSessionV2.user;
  return {
    user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard as any);

Dashboard.propTypes = {
  route: PropTypes.object,
  user: PropTypes.object
};
