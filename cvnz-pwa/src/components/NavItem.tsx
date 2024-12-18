
import React, { useState, ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { ListItem, Button, Collapse, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    color: 'primary',
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    color: 'primary',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    ...theme.typography.button,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    ...theme.typography.button,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  icon: {
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  expandIcon: {
    marginLeft: 'auto',
    height: 16,
    width: 16
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

function NavItem({
  title,
  href,
  depth,
  icon: Icon,
  className = "",
  open: openProp,
  label: Label,
  ...rest
}) {
  const classes = useStyles({});
  const [open, setOpen] = useState<any>(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft
  };

  if (rest.children) {
    var children = rest.children;
    return (
      <ListItem
        {...rest}
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
      >
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={style}
        >
          {Icon && <Icon className={classes.icon} />}
          {title}
          {open ? (
            <ExpandLessIcon
              className={classes.expandIcon}
              color="inherit"
            />
          ) : (
            <ExpandMoreIcon
              className={classes.expandIcon}
              color="inherit"
            />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      {...rest}
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && <Icon className={classes.icon} />}
        {title}
        {Label && (
          <span className={classes.label}>
            <Label />
          </span>
        )}
      </Button>
    </ListItem>
  );
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavItem.defaultProps = {
  open: false
};

export default NavItem;
