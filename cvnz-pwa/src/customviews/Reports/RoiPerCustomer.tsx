
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Card, Typography, Avatar, Theme } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  }
}));

function RoiPerCustomer(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});

  function prettyContribution(contribution: number) {
    contribution = contribution ? contribution : 0;
    return contribution.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Volunteer Contribution
        </Typography>
        <div className={classes.details}>
          <Typography
            color="inherit"
            variant="h3"
          >
            {prettyContribution(props.volunteerContribution)}
          </Typography>
        </div>
      </div>
      <Avatar
        className={classes.avatar}
        color="inherit"
      >
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
}

RoiPerCustomer.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array,
  volunteerContribution: PropTypes.number
};

export default RoiPerCustomer;
