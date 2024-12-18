
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Grid,
  Button,
  colors
  , Theme
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import Label from '../../../components/Label';
import Application from './Application';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  applyButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

function Header({ project, className = "", ...rest }) {
  const classes = useStyles({});
  const [openApplication, setOpenApplication] = useState<any>(false);

  const handleApplicationOpen = () => {
    setOpenApplication(true);
  };

  const handleApplicationClose = () => {
    setOpenApplication(false);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Browse projects
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            {project.title}
          </Typography>
          <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined"
          >
            Active project
          </Label>
        </Grid>
        <Grid item>
          <Button
            className={classes.shareButton}
            variant="contained"
          >
            <ShareIcon className={classes.shareIcon} />
            Share
          </Button>
          <Button
            className={classes.applyButton}
            onClick={handleApplicationOpen}
            variant="contained"
          >
            Apply for a role
          </Button>
        </Grid>
      </Grid>
      <Application
        author={project.author}
        onApply={handleApplicationClose}
        onClose={handleApplicationClose}
        open={openApplication}
      />
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

Header.defaultProps = {};

export default Header;
