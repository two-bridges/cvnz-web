
/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { bindActionCreators, Dispatch } from 'redux';
import { store } from '../../redux/store/configureStore';
import { Provider as StoreProvider, connect } from 'react-redux';
import {
  Drawer,
  Divider,
  Avatar,
  List,
  ListSubheader,
  Typography,
  Hidden,
  IconButton,
  Badge,
  Link,
  colors,
  Button
  , Theme,
  Grid
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import NavItem from '../../components/NavItem';
import navConfig from './navConfig';
import { RootState, Store } from '../../redux/reducers/rootReducer';
import * as sessionReducer from '../../redux/reducers/sessionReducer';
import { myFirebase, db } from "../../firebase/firebase";
import { ISession } from 'src/redux/model/session.model';
import * as saveBarActions from "../../redux/actions/saveBarActions";
import { version } from 'src/environment/environment';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  navigation: {
    overflow: 'auto',
    padding: theme.spacing(0, 2, 2, 2),
    flexGrow: 1
  },
  profile: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  },
  badgeDot: {
    height: 9,
    minWidth: 9
  },
  onlineBadge: {
    backgroundColor: colors.green[600]
  },
  awayBadge: {
    backgroundColor: colors.orange[600]
  },
  busyBadge: {
    backgroundColor: colors.red[600]
  },
  offlineBadge: {
    backgroundColor: colors.grey[300]
  },
  avatar: {
    cursor: 'pointer',
    width: 40,
    height: 40
  },
  details: {
    marginLeft: theme.spacing(2)
  },
  moreButton: {
    marginLeft: 'auto',
    color: colors.blueGrey[200]
  }
}));

function renderNavItems({
  // eslint-disable-next-line react/prop-types
  items,
  subheader = "",
  key,
  pathname,
  ...rest
}) {
  return (
    <List key={key}>
      {subheader && <ListSubheader disableSticky>{subheader}</ListSubheader>}
      {/* eslint-disable-next-line react/prop-types */}
      {items.filter(i => !i.hidden).reduce(
        // eslint-disable-next-line no-use-before-define
        (acc, item) => reduceChildRoutes({ acc, pathname, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  if (item.items) {

    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={item.key}
        label={item.label}
        open={true}
        title={item.title}

      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
          key: item.key
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={item.key}
        label={item.label}
        title={item.title}
        open={false}
      />
    );
  }

  return acc;
}
interface INavBar {
  actions?: {
    visibility: FnVisible
  },
}
type FnVisible = (args: saveBarActions.ISetVisibleCriteria) => boolean;
function NavBar(props) {
  const { visible, openMobile, onMobileClose, className = "", saveBar, ...rest } = props;
  const classes = useStyles({});
  const location = useLocation();
  const [status, setStatus] = useState<any>('online');
  const session = useSelector((state: RootState) => state.userSessionV2);
  let userState = useSelector((state: Store) => state?.userSessionV2.user);
  if (!userState) {
    const localStoredFieldNote = localStorage.getItem('loggedInAdmin');
    if (localStoredFieldNote) {
      userState = JSON.parse(localStoredFieldNote);
    }
  }
  console.log(`NavBar > User session: ${session?.loggedIn}`);

  const handleStatusToggle = () => {
    const statusSeq = {
      online: 'away',
      away: 'busy',
      busy: 'offline',
      offline: 'online'
    };

    setStatus(prevStatus => statusSeq[prevStatus]);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    props.actions && props.actions.visibility({ visible: false });
  }, [location.pathname]);
  console.log(`session.loggedIn: ${session?.loggedIn}`);
  const content = (
    <div {...rest} className={clsx(classes.root, className)}>
      {/*user profile goes here*/}
      <div className={classes.profile}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          classes={{
            dot: classes.badgeDot,
            badge: clsx({
              [classes.badge]: true,
              [classes.onlineBadge]: status === 'online',
              [classes.awayBadge]: status === 'away',
              [classes.busyBadge]: status === 'busy',
              [classes.offlineBadge]: status === 'offline'
            })
          }}
          variant="dot"
        >
          <Avatar
            alt="Person"
            onClick={handleStatusToggle}
            className={classes.avatar}
          />
        </Badge>
        <div className={classes.details}>
          {session.loggedIn ? (
            <Grid>
              <Typography variant="h5">Sys Admin</Typography>
              <Typography variant="body2">{session?.user ? `${session.user?.firstName} ${session.user?.lastName}` : 'User'}</Typography>
              <Typography variant="body2">{version}</Typography>
            </Grid>
          )
            :
            (
              <Grid>
                <Button
                  component={RouterLink} to="/auth/admin/login"
                  variant="text"
                >Sign In
                </Button>
              </Grid>
            )}

        </div>
      </div>
      <Divider className={classes.divider} />

      {/*menu items goes here*/}
      <nav className={classes.navigation}>
        {
          session?.loggedIn && session?.isSysAdmin && renderNavItems({
            items: navConfig.items,
            subheader: "",
            pathname: location.pathname,
            key: navConfig.key
          })
        }
      </nav>
    </div>
  );

  return <>
    <Hidden lgUp>
      <Drawer
        anchor="left"
        classes={{
          paper: classes.mobileDrawer
        }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </Drawer>
    </Hidden>
    <Hidden xlDown>
      <Drawer
        anchor="left"
        classes={{
          paper: classes.desktopDrawer
        }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  </>;
}

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};
function mapStateToProps(state: RootState, props) {

  return {
    saveBar: state.saveBar
  };
}

const visibility = bindActionCreators(saveBarActions.setVisible, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      visibility
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar as any);
