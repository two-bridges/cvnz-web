import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import _ from 'underscore';
import { Autocomplete } from '@mui/material';
import { HelperService } from 'src/lib/helper';
import { IProject } from 'src/redux/model/project.model';
import { getFieldNoteFromFirebase, setFieldNote } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';
import { fetchOrgProjects, getActiveFieldNoteProject, setFieldNoteProject } from 'src/redux/actions/Actions/orgProjectActions';
import { useParams } from 'react-router';

function ProjectDropdown(props) {
  const dispatch = useDispatch();
  const disabled = !!props?.disabled;

  var orgProjects: IProject[] = [];
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  //get list of all projects in an organisation
  const projectList = useSelector((state: Store) => state?.orgProjects?.list);
  if (projectList) {
    orgProjects = HelperService.getArrayFromObjectList(projectList);
  }

  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single);
  if (!activeFieldNote) {
    dispatch(getFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId ?? 'new', fieldNoteId: fieldNoteParams.fieldNoteId ?? 'new' }));
  }
  const activeProject = useSelector((state: Store) => state?.orgProjects?.single, (prev, next) => {
    return prev === next;
  });

  async function getProjectList() {
    await dispatch(fetchOrgProjects({ organisationId: fieldNoteParams?.organisation ?? '' }));
  }

  async function getActiveProject() {
    await dispatch(getActiveFieldNoteProject({ organisationId: fieldNoteParams?.organisation ?? '', projectId: fieldNoteParams?.projectId ?? '' }));
  }
  //on load
  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    getActiveProject();
  }, [activeFieldNote]);

  async function setSelectedProject(event, project: IProject) {
    event.preventDefault();
    if (project && activeFieldNote) {
      activeFieldNote.projectId = project.id;
      activeFieldNote.location = project.location;
      await dispatch(setFieldNoteProject(project));
      await dispatch(setFieldNote(activeFieldNote));
      props.isProjectSelected();
    }
  }

  return (
    <div>
      {orgProjects ? (
        <Autocomplete
          value={activeProject ? activeProject : null}
          disabled={disabled}
          onChange={(event, value) => setSelectedProject(event, value!)}
          style={{ width: '100%' }}
          options={orgProjects}
          getOptionLabel={(option) => option.projectName}
          renderInput={(params) =>
            <TextField {...params}
              label="Project Selection"
              variant="outlined"
            />
          }
        />
      ) :
        <div></div>
      }
    </div>


  );
}

ProjectDropdown.propTypes = {
  isProjectSelected: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ProjectDropdown;
