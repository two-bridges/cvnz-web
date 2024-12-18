
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  Hidden
  , Theme
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOffOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import StatusBullet from '../../../components/StatusBullet';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
  backButton: {
    marginRight: theme.spacing(2),
    '@media (min-width: 864px)': {
      display: 'none'
    }
  },
  user: {
    flexShrink: 0,
    flexGrow: 1
  },
  activity: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBullet: {
    marginRight: theme.spacing(1)
  },
  search: {
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    flexBasis: 300,
    marginLeft: 'auto',
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 auto'
    }
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  },
  searchInput: {
    flexGrow: 1
  }
}));

function ConversationToolbar({ conversation, className = "", ...rest }) {
  const classes = useStyles({});
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState<any>(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Toolbar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Tooltip title="Back">
        <IconButton
          className={classes.backButton}
          component={RouterLink}
          edge="start"
          to="/chat"
          size="large">
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      <div className={classes.user}>
        <Typography variant="h6">{conversation.otherUser.name}</Typography>
        <div className={classes.activity}>
          {conversation.otherUser.active ? (
            <>
              <StatusBullet
                className={classes.statusBullet}
                color="success"
                size="small"
              />
              <Typography variant="body2">Active now</Typography>
            </>
          ) : (
            <Typography variant="body2">
              Active
              {' '}
              {moment(conversation.otherUser.lastActivity).fromNow()}
            </Typography>
          )}
        </div>
      </div>
      <Hidden lgDown>
        <Paper
          className={classes.search}
          elevation={1}
        >
          <SearchIcon className={classes.searchIcon} />
          <Input
            className={classes.searchInput}
            disableUnderline
            placeholder="Search email"
          />
        </Paper>
      </Hidden>
      <Tooltip title="More options">
        <IconButton onClick={handleMenuOpen} ref={moreRef} size="large">
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        keepMounted
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Block user" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete conversation" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive conversation" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NotificationsOffIcon />
          </ListItemIcon>
          <ListItemText primary="Mute notifications" />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}

ConversationToolbar.propTypes = {
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired
};

export default ConversationToolbar;
