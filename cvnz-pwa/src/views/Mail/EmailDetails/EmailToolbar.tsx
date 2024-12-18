
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Input,
  Paper,
  Tooltip
  , Theme
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    height: 68,
    display: 'flex',
    alignItems: 'center'
  },
  backButton: {
    marginRight: theme.spacing(2)
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
  },
  moreButton: {
    marginLeft: theme.spacing(2)
  }
}));

function EmailToolbar({ onBack, className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Tooltip title="Back">
        <IconButton
          className={classes.backButton}
          onClick={onBack}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
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
      <Tooltip title="Delete">
        <IconButton
          className={classes.moreButton}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="More options">
        <IconButton
          className={classes.moreButton}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous email">
        <IconButton
          className={classes.previousButton}
          size="small"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Next email">
        <IconButton
          className={classes.nextButton}
          size="small"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
EmailToolbar.propTypes = {
  className: PropTypes.string,
  onBack: PropTypes.func
};

export default EmailToolbar;
