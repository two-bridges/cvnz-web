
import React, { useState } from 'react';
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
  Collapse
  , Theme
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function SimpleLists({ className = "", ...rest }) {
  const classes = useStyles({});
  const [open, setOpen] = useState<any>(true);

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
          <List disablePadding>
            <ListItem
              button
              divider
            >
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem
              button
              divider
            >
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem button>
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
          <List disablePadding>
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
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
          <List disablePadding>
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem
              button
              divider
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItem>
            <ListItem
              button
              onClick={() => setOpen(!open)}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="List Item" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
              >
                <ListItem
                  button
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

SimpleLists.propTypes = {
  className: PropTypes.string
};

export default SimpleLists;
