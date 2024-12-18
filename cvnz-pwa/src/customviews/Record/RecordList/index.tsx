
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Container,
  Button,
  colors,
  Card,
  CardContent,
  CardHeader,
  CardActions
  , Theme
} from '@mui/material';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import AddButtonIcon from '../../../components/AddButtonIcon';
import * as _ from "underscore";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { store } from 'src/redux/store/configureStore';
import PropTypes from 'prop-types';
import LatestProjects from '../../Reports/LatestProjects';

import SpeedDialTooltipOpen from '../../../components/SpeedDial';
import * as recordActions from "../../../redux/actions/recordActions";
import { IRecord, IRecordDeep, RecordDeep } from 'src/redux/model/record.model';
const useStyles = makeStyles(theme => ({
  root: {}
  //add your style classes here 
}));

type FnLoadRecordList = (args: recordActions.IFetchRecordsCriteria) => Promise<{ payload: IRecordDeep[], type: string, meta: { arg: recordActions.IFetchRecordsCriteria, requestId: string } }>;

function RecordList(props) {
  const actions = props.actions as {
    loadRecordList: FnLoadRecordList
  };

  const classes = useStyles({});

  const [records, setRecords] = useState<RecordDeep[]>([]);

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

  return (
    //add component HTML here
    <Page className={classes.root} title="Record List">
      <Container maxWidth="lg">
        <Grid className={classes.root}>
          <LatestProjects records={records} />

        </Grid>
      </Container>

      {/* <SpeedDialTooltipOpen /> */}
    </Page>
  );
}
RecordList.propTypes = {
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
)(RecordList);
