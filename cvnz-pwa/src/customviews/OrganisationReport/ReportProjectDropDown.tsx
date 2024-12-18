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
import { CreateNewProject, IProject } from 'src/redux/model/project.model';
import { fetchOrgProjects } from 'src/redux/actions/Actions/orgProjectActions';

function ReportProjectDropDown(props) {
  const dispatch = useDispatch();
  const params = useParams<{ organisation: string }>();

  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(undefined);

  let projectOrgList = useSelector((state: Store) => {
    const projList = state?.orgProjects?.list;
    let list = projList ? Object.values(projList) : [];
    let response = CreateNewProject();
    response.projectName = "All";
    response.projectType = "All";
    list.push(response);

    list = list.sort((a, b) => a > b ? 1 : -1);
    return list;
  });

  useEffect(() => {
    dispatch(fetchOrgProjects({ organisationId: params?.organisation ?? '' }));

  }, []);

  const setProject = async (event, selectedProj: IProject) => {
    event.preventDefault();
    setSelectedProject(selectedProj);
    props.setSelectedProject(event, selectedProj);
  }
  const handleChange = (event) => {
    const iProjSelected = _.find(projectOrgList, l => l.projectName === event.target.value)
    if (iProjSelected) {
      setProject(event, iProjSelected)
    }
  };

  return (
    <div>
      {projectOrgList ? (
        <Box>
          <FormControl fullWidth>
            <InputLabel style={{ top: '-6px', left: '12px' }} id="demo-simple-select-label">{'Select Project'}</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedProject?.projectName} label={"Select Project"} onChange={handleChange} variant="outlined" defaultValue={""}>
              {projectOrgList.map(item => (
                <MenuItem key={uuid()} value={item.projectName}>
                  {item.projectName}
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

ReportProjectDropDown.propTypes = {
  setSelectedProject: PropTypes.func,
};

export default ReportProjectDropDown;

