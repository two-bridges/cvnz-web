
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox
  , Theme
} from '@mui/material';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  options: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  }
}));

function Preferences({ className = "", ...rest }) {
  const classes = useStyles({});

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Preferences" />
      <CardContent>
        <Typography
          gutterBottom
        // variant="h6"
        >
          Privacy
        </Typography>
        <Typography variant="body2">
          You will recieve emails in your business email address
        </Typography>
        <div className={classes.options}>
          <FormControlLabel
            control={(
              <Checkbox
                color="primary"
                defaultChecked //
              />
            )}
            label="Allow teamates invite others"
          />
          <FormControlLabel
            control={(
              <Checkbox
                color="primary"
                defaultChecked //
              />
            )}
            label="Private Project"
          />
        </div>
      </CardContent>
    </Card>
  );
}

Preferences.propTypes = {
  className: PropTypes.string
};

export default Preferences;
