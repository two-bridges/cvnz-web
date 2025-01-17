
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Checkbox,
  Button,
  Avatar
  , Theme
} from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderOutlined';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function DenseLists({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        xs={12}
      >
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
        >
          <List
            dense
            disablePadding
          >
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  edge="start"
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  edge="start"
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  edge="start"
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid
        item
        lg={4}
        xs={12}
      >
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
        >
          <List
            dense
            disablePadding
          >
            <ListItem divider>
              <ListItemAvatar>
                <Avatar src="/images/avatars/avatar_3.png">
                  CM
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="contact@devias.io" />
              <Button
                size="small"
                variant="contained"
              >
                Send Invite
              </Button>
            </ListItem>
            <ListItem divider>
              <ListItemAvatar>
                <Avatar src="/images/avatars/avatar_4.png">
                  PT
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="contact@devias.io" />
              <Button
                size="small"
                variant="contained"
              >
                Send Invite
              </Button>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/images/avatars/avatar_5.png">
                  DS
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="contact@devias.io" />
              <Button
                size="small"
                variant="contained"
              >
                Send Invite
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid
        item
        lg={4}
        xs={12}
      >
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
        >
          <List
            dense
            disablePadding
          >
            <ListItem divider>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="My Music"
                secondary="1GB in Total"
              />
            </ListItem>
            <ListItem divider>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="My Documents"
                secondary="674MB in Total"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Workspace"
                secondary="2.5GB in Total"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

DenseLists.propTypes = {
  className: PropTypes.string
};

export default DenseLists;
