
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Card, Typography, Avatar, colors
  , Theme
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Label from '../../components/Label';
import gradients from '../../utils/gradients';
import NatureIcon from '@mui/icons-material/Nature';

import * as _ from "underscore";
import { IRecordDeep } from 'src/redux/model/record.model';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
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
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.green,
    height: 48,
    width: 48
  }
}));

function TodaysMoney(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const data = {
    value: '3,300',
    currency: '$',
    difference: '+4.5%'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          Trees Planted
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">

            {props.treesCount}
          </Typography>

        </div>
      </div>
      <Avatar className={classes.avatar}>
        <NatureIcon />
      </Avatar>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array,
  treesCount: PropTypes.number
};

export default TodaysMoney;
