
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
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
  , Theme,
  styled
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutline';
import InputIcon from '@mui/icons-material/Input';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../utils/axios';
import NotificationsPopover from '../../components/NotificationsPopover';
import ChatBar from './ChatBar';
import * as saveBarActions from "../../redux/actions/saveBarActions";
import { Dispatch, bindActionCreators } from 'redux';
import { RootState, Store } from 'src/redux/reducers/rootReducer';
import { signOut } from 'src/redux/actions/userSessionActions';

const useStyles = makeStyles<Theme>((theme: Theme) => {
  return {
    root: {
      boxShadow: 'none',
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
  };
});

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

  const [signInLink, setSignInLink] = useState<string>("");
  const userSession = useSelector((state: Store) => state?.userSessionV2);

  const handleLogout = async () => {
    await dispatch(signOut())
    history.push(`/auth/admin/login`);
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
    <AppBar {...rest} color="primary">
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
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--app.svg" />
        </RouterLink>
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
      <ChatBar onClose={handleChatBarClose} open={openChatBar} />
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
