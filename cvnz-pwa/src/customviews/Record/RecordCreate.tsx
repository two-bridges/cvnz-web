
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from 'src/redux/reducers/rootReducer';
import { store } from 'src/redux/store/configureStore';
import * as recordActions from '../../redux/actions/recordActions';
import * as saveBarActions from "../../redux/actions/saveBarActions";
import * as _ from "underscore";
import { IRecordDeep, IRecord, IStaff, IData, IRisk } from 'src/redux/model/record.model';
import { IProject } from "src/redux/model/project.model";
import * as projectActions from '../../redux/actions/projectActions';
import Page from 'src/components/Page';
import { Container, Grid } from '@mui/material';
import Record from '../Record';
import SuccessSnackbar from 'src/customviews/Projects/Create/SuccessSnackbar';
import clsx from 'clsx';
import PropTypes from 'prop-types';
const useStyles = makeStyles(theme => ({
  root: {}
  //add your style classes here 
}));

type FnCreateRecord = (args: recordActions.ICreateRecordCriteria) => Promise<{ payload: IRecordDeep, type: string, meta: { arg: recordActions.ICreateRecordCriteria, requestId: string } }>;
type FnRecord = (args: recordActions.ICreateRecordCriteria) => Promise<{ payload: IRecordDeep[], type: string, meta: { arg: recordActions.ICreateRecordCriteria, requestId: string } }>;
type FnProject = (args: projectActions.ICreateProjectCriteria) => Promise<{ payload: IProject[], type: string, meta: { arg: projectActions.ICreateProjectCriteria, requestId: string } }>;
type FnVisible = (args: saveBarActions.ISetVisibleCriteria) => boolean;

function ReactCreate(props) {
  const { className = "", ...rest } = props;
  const recordId = props && props.match && props.match.params.id;
  const actions = props.actions as {
    loadProjectList: FnProject,
    fetchRecords: FnRecord,
    createRecord: FnCreateRecord,
    saveRecord: FnCreateRecord,
    setVisible: FnVisible

  };
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const classes = useStyles();
  const [record, setRecord] = useState<IRecordDeep | undefined>(undefined);
  const [projects, setProjects] = useState<IProject[] | undefined>(undefined);


  useEffect(() => {
    let mounted = true;
    if (!record) {
      if (!recordId) {
        actions.createRecord({})
          .then(response => {
            if (mounted) {
              setRecord(response.payload);
            }
          });

      }
      else {
        //load existing activities for manage screen
        actions.fetchRecords({})
          .then(response => {
            if (mounted) {
              let currentRec = response.payload.find(el => el.id === recordId);
              setRecord(currentRec);
            }
          });

      }
      actions.loadProjectList({})
        .then(response => {
          if (mounted) {
            setProjects(response.payload);
          }
        });

      actions.setVisible({ visible: true });
      return () => {
        mounted = false;
      };
    }
  }, []);

  useEffect(() => {
    if (props.saveBar && props.saveBar.counter > 0) {
      handleRecordSave(null);
      //console.log(`You clicked ${props.saveBar.counter} times`);
    }
  }, [props.saveBar.counter]); // Only re-run the effect if count changes

  if (!record || !projects) {
    return null;
  }

  const handleRecordSave = async (event) => {
    event && event.preventDefault();
    actions.saveRecord({ entity: record })
      .then(response => {
        setRecord(response.payload);
        setOpenSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    console.log('handleSnackbarClose');
    setOpenSnackbar(false);
  };

  const handleNumberChangeForRecord = (event) => {
    event.preventDefault();
    let value: number | null = parseFloat(event.target.value);
    value = isNaN(value) ? null : value;
    // console.log(`handleNumberChangeForRecord: ${JSON.stringify("value")}`);
    setRecord({
      ...record,
      [event.target.name]: value
    } as any);
  };

  const handleChangeForRecord = (event) => {
    event.preventDefault();

    setRecord({
      ...record,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    } as any);
  };


  const handleDataNumberChange = (data: IData, event) => {
    // console.log(`record.data handleChangeDATA RECORD CREATE: ${JSON.stringify(data, null, 2)}`);
    let value: number | null = parseFloat(event.target.value);
    value = isNaN(value) ? null : value;

    let updatedRecord: IRecordDeep = {
      ...record,
      data: record.data.map(item => {
        if (item.id === data.id) {
          return {
            ...item,
            [event.target.name]: value
          }
        } else {
          return item;
        }
      })
    }
    console.dir(updatedRecord)
    setRecord(updatedRecord);
  };

  const handleChangeData = (data: IData, event) => {
    console.log(`record.data handleChangeDATA RECORD CREATE: ${JSON.stringify(data, null, 2)}`);
    let updatedRecord: IRecordDeep = {
      ...record,
      data: record.data.map(item => {
        if (item.id === data.id) {
          return {
            ...item,
            [event.target.name]: event.target.value
          }
        } else {
          return item;
        }
      })
    }
    console.dir(updatedRecord)
    setRecord(updatedRecord);
  };

  const handleChangeStaff = (staff: IStaff, event) => {

    let updatedRecord: IRecordDeep =
    {
      ...record,
      staff: record.staff.map(item => {
        if (item.id === staff.id) {
          return {
            ...item,
            [event.target.name]:
              event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value

          }
        } else {
          return item;
        }
      })
    }
    console.dir(updatedRecord)
    setRecord(updatedRecord);
  };

  const updateRecordDate = (name, value) => {
    setRecord({
      ...record,
      [name]:
        value
    } as any);
  };

  const handleRiskChange = (risk: IRisk, event) => {
    let updatedRecord: IRecordDeep =
    {
      ...record,
      risk: record.risk.map(item => {
        if (item.id === risk.id) {
          return {
            ...item,
            [event.target.name]: event.target.value
          }
        } else {
          return item;
        }
      })
    }
    console.dir(updatedRecord)
    setRecord(updatedRecord);
  };


  console.log(`record.data after RECORD Change: ${JSON.stringify(record.data, null, 2)}`);

  const addPerson = (staff: IStaff[]) => {
    setRecord({
      ...record,
      staff: staff,
      numberOfStaff: _.filter(staff, s => !!s.IsStaff).length,
      numberOfVolunteers: _.filter(staff, s => !s.IsStaff).length
    } as any);
  };

  const addData = (data) => {
    setRecord({
      ...record,
      data: data
    } as any);
  };
  const addRisk = (risk) => {
    setRecord({
      ...record,
      risk: risk
    });
  };
  return (
    //add component HTML here
    <Page className={classes.root}>
      <Container
        maxWidth="xl">
        <Record
          record={record}
          projects={projects}
          addPerson={addPerson}
          addData={addData}
          addRisk={addRisk}
          handleChange={handleChangeForRecord}
          handleNumberChange={handleNumberChangeForRecord}
          handleSubmit={handleRecordSave}
          handleChangeData={handleChangeData}
          handleDataNumberChange={handleDataNumberChange}
          handleChangeStaff={handleChangeStaff}
          handleRiskChange={handleRiskChange}
          handleChangeNameAndValue={updateRecordDate}
          openSnackbar={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
        // handleChangeForRecordData={handleChangeForRecordData}
        />
      </Container>
      <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar} />
    </Page>

  );
}

ReactCreate.propTypes = {
  //add properties and types here
  className: PropTypes.string,
};

function mapStateToProps(state: RootState, props) {
  var records = _.values(state.records.list);
  return {
    records,
    saveBar: state.saveBar
  };
}

const loadProjectList = bindActionCreators(projectActions.fetchProjects, store.dispatch);
const saveRecord = bindActionCreators(recordActions.saveRecord, store.dispatch);
const createRecord = bindActionCreators(recordActions.createRecord, store.dispatch);
const fetchRecords = bindActionCreators(recordActions.fetchRecords, store.dispatch);
const setVisible = bindActionCreators(saveBarActions.setVisible, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      fetchRecords,
      saveRecord,
      createRecord,
      loadProjectList,
      setVisible
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactCreate);
