import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { CreateNewGoal, IGoal } from 'src/redux/model/goal.model';
import uuid from 'uuid/v1';
import { fetchProjectGoals } from 'src/redux/actions/Actions/projectGoalsActions';
import { useParams } from 'react-router';

function OrgProjectGoalsDropdown(props) {
  const dispatch = useDispatch();
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  //to disable selected goals
  var selectedGoalList = props.selectedGoalList as IGoal[];
  var isGoalSelected = props.isGoalSelected as boolean;
  const [selectedGoal, setSelectedGoal] = useState<IGoal | undefined>(undefined);
  const session = useSelector((state: RootState) => state.userSessionV2);

  let projectGoalList = useSelector((state: Store) => {
    const projList = state?.projectGoals?.projectGoals;
    let list = projList ? Object.values(projList) : [];
    list = _.filter(list, l => !l.deleted_utc && l.isActive);
    let response = CreateNewGoal();
    response.goalName = "Unplanned";
    response.type = "Unplanned";
    list.push(response);
    return list;
  });

  useEffect(() => {
    dispatch(fetchProjectGoals({ organisationId: session.orgId ?? '', projectId: fieldNoteParams.projectId }));
  }, [session]);

  useEffect(() => {
    setSelectedGoal(undefined);
  }, [isGoalSelected]);

  if (projectGoalList) {
    projectGoalList = projectGoalList.sort((a, b) => a.goalTypeId > b.goalTypeId ? 1 : -1);
  }

  const setSelectedGoalType = async (event, selectedGoalType: IGoal) => {
    event.preventDefault();
    setSelectedGoal(selectedGoalType);
    props.setSelectedGoalType(event, selectedGoalType);
  }
  const handleChange = (event) => {
    const iGoalSelected = _.find(projectGoalList, l => l.goalName === event.target.value)
    if (iGoalSelected) {
      setSelectedGoalType(event, iGoalSelected)
    }
  };

  return (
    <div>
      {projectGoalList ? (
        <Box>
          <FormControl fullWidth>
            <InputLabel style={{ top: '-6px', width: props.title?.length * 9, left: '12px' }} id="demo-simple-select-label">{props.title ? props.title : 'Select outcome'}</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedGoal?.goalName} label={props.title ? props.title : 'Select outcome'} onChange={handleChange} variant="outlined" defaultValue={""}>
              {projectGoalList.map(item => (
                <MenuItem key={uuid()} value={item.goalName}
                  // disabled={selectedGoalList && !!selectedGoalList.find(element => {
                  //   let unPlannedGoal = projectGoalList.find(g => g.goalName === 'Unplanned');
                  //   console.log("element.goalName", element.goalName, unPlannedGoal?.goalName);
                  //   return (element.goalTypeId === parseInt(item.id) && ((unPlannedGoal ? unPlannedGoal.goalName : "") != element.goalName));
                  // })}
                  disabled={selectedGoalList && !!selectedGoalList.find(element => {
                    return (element.goalName === item.goalName);
                  })}
                >
                  {item.goalName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) :
        <div></div>
      }
    </div>
  );
}

OrgProjectGoalsDropdown.propTypes = {
  setSelectedGoalType: PropTypes.func,
  selectedGoalList: PropTypes.array,
  isGoalSelected: PropTypes.bool,
  title: PropTypes.string,
};

export default OrgProjectGoalsDropdown;

