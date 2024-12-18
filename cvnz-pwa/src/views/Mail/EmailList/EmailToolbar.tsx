
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Checkbox,
  Typography,
  IconButton,
  Input,
  Paper,
  Tooltip
  , Theme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
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
  refreshButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  moreButton: {
    marginLeft: theme.spacing(2)
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  paginationDetails: {
    whiteSpace: 'nowrap'
  }
}));

function EmailToolbar({
  selectedEmails,
  totalEmails,
  onSelectAll,
  onDeselectAll,
  onBack,
  className = "",
  ...rest
}) {
  const classes = useStyles({});

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      if (onSelectAll) {
        onSelectAll();
      }
    } else if (onDeselectAll) {
      onDeselectAll();
    }
  };

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
      <div className={classes.select}>
        <Checkbox
          checked={selectedEmails.length === totalEmails}
          className={classes.checkbox}
          color="primary"
          indeterminate={
            selectedEmails.length > 0 && selectedEmails.length < totalEmails
          }
          onChange={handleCheckboxChange}
        />
        <Typography variant="h6">Select all</Typography>
      </div>
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
      <Tooltip title="Refresh">
        <IconButton
          className={classes.refreshButton}
          size="small"
        >
          <RefreshIcon />
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
      <div className={classes.pagination}>
        <Tooltip title="Next page">
          <IconButton size="small">
            <KeyboardArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <Typography
          className={classes.paginationDetails}
          variant="body2"
        >
          1 - 50 of 200
        </Typography>
        <Tooltip title="Previous page">
          <IconButton size="small">
            <KeyboardArrowRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

EmailToolbar.propTypes = {
  className: PropTypes.string,
  onBack: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onSelectAll: PropTypes.func,
  selectedEmails: PropTypes.array.isRequired,
  totalEmails: PropTypes.number.isRequired
};

export default EmailToolbar;
