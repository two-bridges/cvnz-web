
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@mui/styles';
import {
  Card, CardHeader, CardContent, Divider
  , Theme
} from '@mui/material';
import GenericMoreButton from '../../../components/GenericMoreButton';
import Chart from './Chart';
import { ReportDataOutcome } from 'src/customviews/OrganisationReport';
import _ from 'underscore';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  content: {},
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginLeft: theme.spacing(1)
    }
  },
  inner: {
    height: 375,
    minWidth: 500
  },
  chart: {
    height: '100%'
  }
}));

function PerformanceOverTime(props) {
  const classes = useStyles({});
  let generatedData: ReportDataOutcome[] = props.generatedData;

  let months: string[] = _.pluck(generatedData, 'month');
  let contribution: number[] = _.pluck(generatedData, 'total');
  let metric: string[] = _.pluck(generatedData, 'metric');

  return (
    <Card>
      <CardHeader
        // action={<GenericMoreButton />}
        title="Performance"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Chart
              className={classes.chart}
              data={contribution}
              labels={months}
              metric={metric}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

PerformanceOverTime.propTypes = {
  className: PropTypes.string,
  monthlyCount: PropTypes.any,
  generatedData: PropTypes.array
};

export default PerformanceOverTime;
