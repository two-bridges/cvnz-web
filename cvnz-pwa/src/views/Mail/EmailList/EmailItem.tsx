
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Checkbox,
  IconButton,
  ListItem,
  Tooltip,
  Typography,
  colors
  , Theme
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import getInitials from '../../../utils/getInitials';
import Label from '../../../components/Label';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50]
    }
  },
  new: {
    position: 'relative',
    '&:before': {
      content: '" "',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      width: 4,
      backgroundColor: theme.palette.error.main
    },
    '& $name, & $subject': {
      fontWeight: theme.typography.fontWeightBold
    }
  },
  selected: {
    backgroundColor: colors.grey[50]
  },
  checkbox: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  favoriteButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  starIcon: {
    cursor: 'pointer'
  },
  starFilledIcon: {
    color: colors.amber[400]
  },
  details: {
    minWidth: 1,
    display: 'flex',
    flexGrow: 1
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  name: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      minWidth: 180,
      flexBasis: 180
    }
  },
  content: {
    minWidth: 1,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1
    }
  },
  subject: {
    maxWidth: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  separator: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  message: {
    maxWidth: 800,
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 'auto',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  labels: {
    display: 'flex',
    marginRight: theme.spacing(2),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  date: {
    whiteSpace: 'nowrap'
  }
}));

function EmailItem({
  email,
  selected,
  onOpen,
  onToggle,
  className = "",
  ...rest
}) {
  const classes = useStyles({});
  const [favorited, setFavorited] = useState<any>(email.favorited);

  const handleFavorite = () => {
    setFavorited((prevFavorited) => !prevFavorited);
  };

  return (
    <ListItem
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.new]: !email.seen,
          [classes.selected]: selected
        },
        className
      )}
      divider
    >
      <Checkbox
        checked={selected}
        className={classes.checkbox}
        color="primary"
        onChange={onToggle}
      />
      <Tooltip title="Add to favs">
        <IconButton className={classes.favoriteButton} onClick={handleFavorite} size="large">
          {favorited ? (
            <StarIcon
              className={clsx(classes.starIcon, classes.starFilledIcon)}
            />
          ) : (
            <StarBorderIcon className={classes.starIcon} />
          )}
        </IconButton>
      </Tooltip>
      <div
        className={classes.details}
        onClick={onOpen}
      >
        <Avatar
          className={classes.avatar}
          src={email.receiver.avatar}
        >
          {getInitials(email.receiver.name)}
        </Avatar>
        <div className={classes.content}>
          <Typography className={classes.name}>
            {email.receiver.name}
          </Typography>
          <Typography className={classes.subject}>{email.subject}</Typography>
          <Typography className={classes.message}>
            <span className={classes.separator}>-</span>
            {email.message}
          </Typography>
          <div className={classes.labels}>
            {email.labels.map((label) => (
              <Label
                color={label.color}
                key={label.text}
              >
                {label.text}
              </Label>
            ))}
          </div>
          <Typography
            className={classes.date}
            variant="body2"
          >
            {moment(email.created_at).format('DD MMM YYYY')}
          </Typography>
        </div>
      </div>
    </ListItem>
  );
}

EmailItem.propTypes = {
  className: PropTypes.string,
  email: PropTypes.object.isRequired,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  selected: PropTypes.bool.isRequired
};

export default EmailItem;
