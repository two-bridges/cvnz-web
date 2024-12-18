import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { Autocomplete } from '@mui/material';
import { IGoal, IGoalType } from 'src/redux/model/goal.model';
import { fetchGoalTypes } from 'src/redux/actions/Actions/goalTypesAction';
import { fetchOrganisationGoals } from 'src/redux/actions/organisationGoalActions';
import { IOrganisation } from 'src/redux/model/organisation.model';
import uuid from 'uuid/v1';


function OrgGoalsDropdown(props) {
  const dispatch = useDispatch();

  //to disable selected goals
  var selectedGoalList = props.selectedGoalList as IGoal[];
  var isGoalSelected = props.isGoalSelected as boolean;
  const [selectedGoal, setSelectedGoal] = useState<IGoalType | undefined>(undefined);
  const session = useSelector((state: RootState) => state.userSessionV2);

  let goalTypeList = useSelector((state: Store) => {
    const idx = state?.organisationGoalReducers?.list;
    let list = idx ? Object.values(idx) : [];
    list = _.filter(list, l => !l.deleted_utc);
    return list;
  });

  if (goalTypeList) {
    goalTypeList = goalTypeList.sort((a, b) => a.goal > b.goal ? 1 : -1);
  }

  useEffect(() => {
    if (session.orgId) {
      dispatch(fetchOrganisationGoals({ organisationId: session.orgId ?? '' }));
    }
  }, [session]);

  useEffect(() => {
    if (!isGoalSelected) {
      setSelectedGoal(undefined);
    }
  }, [isGoalSelected]);


  const setSelectedGoalType = async (event, selectedGoalType: IGoalType) => {
    setSelectedGoal(selectedGoalType);
    props.setSelectedGoalType(event, selectedGoalType);
    event.preventDefault();
  }
  const handleChange = (event) => {
    const iGoalSelected = _.find(goalTypeList, l => l.id === event.target.value)
    if (iGoalSelected) {
      setSelectedGoalType(event, iGoalSelected)
    }
  };

  return (
    <div>
      {goalTypeList ? (
        <Box>
          <FormControl fullWidth>
            <InputLabel style={{ top: '-6px', width: props.title?.length * 9, left: '12px' }} id="demo-simple-select-label">{props.title ? props.title : 'Select outcome'}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGoal?.goal ? selectedGoal.id : ''}
              label={props.title ? props.title : 'Select outcome'}
              onChange={handleChange}
              variant="outlined"
              defaultValue={""}
            >
              {goalTypeList.map(item => (
                <MenuItem key={uuid()} value={item.id} disabled={selectedGoalList && !!selectedGoalList.find(element => {
                  let unPlannedGoal = goalTypeList.find(g => g.goal === 'Unplanned');
                  return (element.goalTypeId === parseInt(item.id) && ((unPlannedGoal ? parseInt(unPlannedGoal.id) : 0) != element.goalTypeId));
                })}>
                  {item.goal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <Autocomplete
            value={selectedGoal ? selectedGoal : null}
            getOptionDisabled={(option) => selectedGoalList && !!selectedGoalList.find(element => element.goalTypeId === option.id)}
            onChange={(event, value) => setSelectedGoalType(event, value!)}
            options={goalTypeList}
            getOptionLabel={(option) => option.goal}
            renderInput={(params) =>
              <TextField {...params}
                label="Select Goal"
                variant="outlined"
              />
            }
          /> */}
        </Box>

      ) :
        <div></div>
      }



    </div>


  );
}

OrgGoalsDropdown.propTypes = {
  setSelectedGoalType: PropTypes.func,
  selectedGoalList: PropTypes.array,
  isGoalSelected: PropTypes.bool,
  title: PropTypes.string,
};

export default OrgGoalsDropdown;

