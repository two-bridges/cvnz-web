
/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
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
import navConfig, { NavItemType } from './navConfig';
import { RootState, Store } from '../../redux/reducers/rootReducer';
import * as sessionReducer from '../../redux/reducers/sessionReducer';
import * as saveBarActions from "../../redux/actions/saveBarActions";
import { IOrganisation } from 'src/redux/model/organisation.model';
import { IUserSession } from 'src/redux/model/userSession.model';
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

function renderNavItems(props: {
  // eslint-disable-next-line react/prop-types
  items: NavItemType[],
  subheader: string,
  key: number,
  pathname: string,
  depth: number,
  session: IUserSession,
}) {
  return (
    <List key={props.key}>
      {props.subheader && <ListSubheader disableSticky>{props.subheader}</ListSubheader>}
      {/* eslint-disable-next-line react/prop-types */}
      {props.items
        .filter(n => {
          if (props.session?.isOrgAdmin) {
            return true;
          } else if (n.orgAdminOnly) {
            return false;
          } else {
            return true;
          }
        })
        .reduce(
          // eslint-disable-next-line no-use-before-define
          (acc, item) => {
            reduceChildRoutes({
              acc,
              pathname: props.pathname,
              item,
              depth: props.depth,
              session: props.session,
            });
            return acc;
          },
          []
        )}
    </List>
  );
}

function reduceChildRoutes(props:
  {
    acc: any[],
    pathname: string,
    item: NavItemType,
    depth: number,
    session: IUserSession,
  }
) {
  let href = (props.item.href ?? '')
    .split('/')
    .reduce((memo, next) => {
      let paramKey = next.split(':')[1];
      if (paramKey === 'organisation' || paramKey === 'orgId') {
        memo.push(props.session?.orgId ?? '____');
      } else {
        memo.push(next);
      }
      return memo;
    }, [] as string[])
    .join('/');

  if (props.item.items) {
    const open = true;

    props.acc.push(
      <NavItem
        depth={props.depth}
        href={href}
        icon={props.item.icon}
        key={props.item.key}
        label={props.item.label}
        open={Boolean(open)}
        title={props.item.title}
      >
        {renderNavItems({
          items: props.item.items,
          subheader: '',
          key: props.item.key,
          pathname: props.pathname,
          depth: props.depth + 1,
          session: props.session,
        })}
      </NavItem>
    );
  } else {
    props.acc.push(
      <NavItem
        depth={props.depth}
        href={href}
        icon={props.item.icon}
        key={props.item.key}
        label={props.item.label}
        title={props.item.title}
        open={false}
      />
    );
  }

  return props.acc;
}

type FnVisible = (args: saveBarActions.ISetVisibleCriteria) => boolean;
function NavBar(props) {
  const { visible, openMobile, onMobileClose, className = "", saveBar, ...rest } = props;
  const organisationState = useSelector((state: Store) => state?.editableOrganisation);
  const session = useSelector((state: Store) => state?.userSessionV2);
  const isOrgAdmin = session?.isOrgAdmin;
  const organisation = organisationState?.entity;
  // console.log(`organisation: ${JSON.stringify(organisation)}`);
  let toLink: string = '';
  if (session.orgId) {
    toLink = `/auth/${session.orgId}/login`
  } else {
    toLink = `/auth/admin/login`
  }
  const classes = useStyles({});
  const location = useLocation();
  const [status, setStatus] = useState<any>('online');

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

          {session?.loggedIn ? (
            <Grid>
              <Typography variant="h5">Welcome</Typography>
              <Typography variant="body2">{session?.user ? `${session.user?.firstName} ${session.user?.lastName}` : 'User'}</Typography>
              <Typography variant="body2">{version}</Typography>
            </Grid>
          )
            :
            (
              <Grid>
                <Button
                  component={RouterLink} to={toLink}
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
          session?.loggedIn && renderNavItems({
            items: navConfig.items ?? [],
            subheader: "",
            key: navConfig.key,
            pathname: location.pathname,
            depth: 0,
            session,
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
