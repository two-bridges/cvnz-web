import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FilledInput, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { Autocomplete } from '@mui/material';
import { IGoal, IGoalType } from 'src/redux/model/goal.model';
import { fetchGoalTypes } from 'src/redux/actions/Actions/goalTypesAction';
import uuid from 'uuid/v1';


function GoalsDropdown(props) {
  const dispatch = useDispatch();

  //to disable selected goals
  var selectedGoalList = props.selectedGoalList as IGoalType[];
  var isGoalSelected = props.isGoalSelected as boolean;
  const [selectedGoal, setSelectedGoal] = useState<IGoalType | undefined>(undefined);
  let goalTypeList = useSelector((state: Store) => {
    const idx = state?.goalTypes?.goalTypes;
    let list = idx ? Object.values(idx) : [];
    list = list.sort((a, b) => a.goal > b.goal ? 1 : -1);

    return list;
  });
  useEffect(() => {
    dispatch(fetchGoalTypes());
  }, []);

  useEffect(() => {
    setSelectedGoal(undefined);
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
        <>
          {/* <Autocomplete
            value={selectedGoal ? selectedGoal : null}
            getOptionDisabled={(option) => selectedGoalList && !!selectedGoalList.find(element => element.id === option.id)}
            onChange={(event, value) => setSelectedGoalType(event, value!)}
            options={goalTypeList}
            getOptionLabel={(option) => option.goal}
            renderInput={(params) =>
              <TextField {...params}
                label="Select Goal Type 1"
                variant="outlined"
              />
            }
          /> */}
          <InputLabel htmlFor="goal-list">Select Goals</InputLabel>
          <Select
            fullWidth
            value={selectedGoal || ''}
            onChange={handleChange}
            input={<OutlinedInput name="goals" id="goal-list" placeholder='Select goals' />}
            variant="outlined"
            defaultValue={""}
          >
            {goalTypeList.map(item => (
              <MenuItem key={uuid()} value={item.id} disabled={selectedGoalList && !!selectedGoalList.find(element => element.id === item.id)}>{item.goal}</MenuItem>
            ))}
          </Select>
        </>
      ) :
        <div></div>
      }
    </div>


  );
}

GoalsDropdown.propTypes = {
  setSelectedGoalType: PropTypes.func,
  selectedGoalList: PropTypes.array,
  isGoalSelected: PropTypes.bool,
};

export default GoalsDropdown;

