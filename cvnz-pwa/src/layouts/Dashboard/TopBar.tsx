
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, connect, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { store } from 'src/redux/store/configureStore';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Theme,
  Typography
} from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import MenuIcon from '@mui/icons-material/Menu';
import axios from '../../utils/axios';
import NotificationsPopover from '../../components/NotificationsPopover';
import * as saveBarActions from "../../redux/actions/saveBarActions";
import { Dispatch, bindActionCreators } from 'redux';
import { RootState, Store } from 'src/redux/reducers/rootReducer';

import { signOut } from 'src/redux/actions/userSessionActions';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    // backgroundColor: colors.deepPurple[600],
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  chatButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  save: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    color: 'white'
  },
}));

const popularSearches = [
  'Devias React Dashboard',
  'Devias',
  'Admin Pannel',
  'Project',
  'Pages'
];

function TopBar(props) {
  const { onOpenNavBarMobile, actions, className = "", saveBar, ...rest } = props;
  const classes = useStyles({});
  const history = useHistory();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState<any>(false);
  const [searchValue, setSearchValue] = useState<any>('');
  const [notifications, setNotifications] = useState<any>([]);
  const [openNotifications, setOpenNotifications] = useState<any>(false);
  const [openChatBar, setOpenChatBar] = useState<any>(false);
  const userSession = useSelector((state: Store) => state?.userSessionV2);

  const [signInLink, setSignInLink] = useState<string>("");

  console.log(`top bar org2: ${userSession?.orgId}`);

  const handleLogout = async () => {
    await actions.signOut();

    if (userSession?.orgId) {
      history.push(`/auth/${userSession?.orgId}/login`);
    } else {
      history.push(`/auth/admin/login`);
    }

  };

  const handleChatBarOpen = () => {
    setOpenChatBar(true);
  };

  const handleChatBarClose = () => {
    setOpenChatBar(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    actions.incrementCounter(event);

  };


  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then(response => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (userSession?.loggedIn) {
      setSignInLink("Sign Out");
    } else if (!userSession?.loggedIn) {
      setSignInLink("Sign In");
    }
  }, [userSession]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenNavBarMobile}
            size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img alt="Logo" src="/images/logos/logo--app.svg" />
        <div className={classes.flexGrow} />
        <div> {props.saveBar && props.saveBar.visible ? <Button className={classes.save} onClick={handleSave}>Save</Button> : null}</div>
        <Hidden xlDown>
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
            {signInLink}
          </Button>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};


function mapStateToProps(state: RootState) {
  return {
    saveBar: state.saveBar
    // loading: state.apiCallsInProgress > 0
  };
}
const incrementCounter = bindActionCreators(saveBarActions.incrementCounter, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      signOut: bindActionCreators(signOut, dispatch),
      incrementCounter,
      // loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      // deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
