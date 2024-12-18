
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  Typography
  , Theme
} from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from '../../utils/axios';
import Paginate from '../../components/Paginate';
import ProjectCard from '../../components/ProjectCard';
import { IActivity, IActivityDeep } from 'src/redux/model/activity.model';
import ActivityCard from './ActivityCard';
import AddButtonIcon from '../../components/AddButtonIcon';
import { useHistory } from 'react-router-dom';
import _ from 'underscore';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

function Activities(props) {

  const { activities, className = "", ...rest } = props;
  const classes = useStyles({});
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState<any>(false);
  const [selectedSort, setSelectedSort] = useState<any>('Most popular');
  const [mode, setMode] = useState<any>('grid');

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };
  const history = useHistory();

  const handleClickEvent = () => {
    let activityProject = _.find(props.activities as IActivityDeep[], activity => activity.projectId);
    if (activityProject) {
      history.push(`/activities/createForProject/${activityProject.projectId}`);
    } else {
      history.push('/activities/create');
    }
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.header}>
        {/*  <Typography className={classes.title} variant="h5">
          Showing {projects.length} projects
        </Typography> */}
        <div className={classes.actions}>
          {/* <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button> */}
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <Grid container spacing={3}>
        {props.activities.map(activity => (
          <Grid
            item
            key={activity.id}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xl={mode === 'grid' ? 4 : 12}
            lg={mode === 'grid' ? 4 : 12}
            xs={12}>
            <ActivityCard activity={activity} />

          </Grid>
        ))}
        <AddButtonIcon handleClickEvent={handleClickEvent} />
      </Grid>

      <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
        elevation={1}
      >
        {['Most recent', 'Popular', 'Price high', 'Price low', 'On sale'].map(
          option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>

      <Grid className={classes.paginate}
      >
        <Paginate pageCount={3} />
      </Grid>
    </div>



  );
}

Activities.propTypes = {
  className: PropTypes.string,
  activities: PropTypes.array.isRequired
};

export default Activities;
