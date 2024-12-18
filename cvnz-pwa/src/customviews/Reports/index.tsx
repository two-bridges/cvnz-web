
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Theme } from '@mui/material';
import Page from '../../components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import SystemHealth from './SystemHealth';
import PerformanceOverTime from './PerformanceOverTime';
import { IRecordDeep, RecordDeep } from 'src/redux/model/record.model';
import * as _ from "underscore";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { store } from 'src/redux/store/configureStore';
import PropTypes from 'prop-types';
import * as recordActions from "../../redux/actions/recordActions";
import { mdiMagnify } from '@mdi/js';
import moment from 'moment';
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  stretchRowItem: {
    height: '100%'
  }
}));

type FnLoadRecordList = (args: recordActions.IFetchRecordsCriteria) => Promise<{ payload: IRecordDeep[], type: string, meta: { arg: recordActions.IFetchRecordsCriteria, requestId: string } }>;

function Reports(props) {
  const actions = props.actions as {
    loadRecordList: FnLoadRecordList
  };
  const [records, setRecords] = useState<RecordDeep[]>([]);

  const classes = useStyles({});
  useEffect(() => {
    let mounted = true;
    if (records.length === 0) {
      actions.loadRecordList({})
        .then(response => {
          if (mounted) {
            let newed = response.payload ? response.payload.map(raw => { return new RecordDeep(raw); }) : [];
            setRecords(newed);
          }
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!records || !props.records) {
    return null;
  } else {
    console.log(`has records.length ${records.length}`);
  }

  function getVolunteersContribution(): number {
    var contribution: number = 0;
    contribution = _.reduce(records, (memo, r) => memo + r.totalContribution(), 0);
    return contribution;
  }

  function getTreesPlanted() {
    var treesPlanted: number = 0;
    _.each(records, record => {
      _.each(record.data, data => {
        if (data.type === 'Planting') {
          treesPlanted = Number(treesPlanted) + Number(data.number);
        }
      });
    });
    return treesPlanted;
  }

  function getWeedingCount() {
    var weedingCount: number = 0;
    _.each(records, record => {
      _.each(record.data, data => {
        if (data.type === 'Weed Control') {
          weedingCount = Number(weedingCount) + Number(data.number);
        }
      });
    });
    return weedingCount;
  }

  function getVolunteersCount() {
    var totalVolunteers: number = 0;
    totalVolunteers = _.reduce(records, (memo: number = 0, r) => {
      return (memo + Number(r.numberOfVolunteers));
    }, 0);
    return totalVolunteers
  }

  function getDataBymonth() {
    var result = _.reduce(records, (memo, record) => {
      memo[moment(record.recordDate).month()] += record.totalContribution();
      return memo;
    }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    return result;
  }

  return (
    <Page className={classes.root} title="Default Dashboard">
      <Container maxWidth={false}>

        <Grid container spacing={3} className={classes.grid}>

          <Grid item lg={3} sm={6} xs={12}>
            <RoiPerCustomer className={classes.stretchRowItem} records={records} volunteerContribution={getVolunteersContribution()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TodaysMoney className={classes.stretchRowItem} records={records} treesCount={getTreesPlanted()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <NewProjects className={classes.stretchRowItem} records={records} weedingCount={getWeedingCount()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <SystemHealth className={classes.stretchRowItem} records={records} volunteersCount={getVolunteersCount()} />
          </Grid>

          <Grid item lg={12} xs={12}>
            <PerformanceOverTime className={classes.stretchRowItem} monthlyCount={getDataBymonth()} />
          </Grid>

          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <LatestProjects records={records} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}

Reports.propTypes = {
  //add properties and types here
  records: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
  var records = _.values(state.records.list);
  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  return {
    records,
    // loading: state.apiCallsInProgress > 0
  };
}

const loadRecordList = bindActionCreators(recordActions.fetchRecords, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      loadRecordList
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
