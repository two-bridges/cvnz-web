
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import * as _ from "underscore";
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';

import { IOrganisation } from 'src/redux/model/organisation.model';
import { Store } from 'src/redux/reducers/rootReducer';
import { getLocalFieldNoteProject } from 'src/redux/actions/Actions/orgProjectActions';
import FieldNoteStepper from './FieldNoteStepper';

function FieldNotes(props) {
  const { className = "", ...rest } = props;
  const dispatch = useDispatch();

  const activeProject = useSelector((state: Store) => state?.orgProjects?.single);


  useEffect(() => {
    if (!activeProject) {
      dispatch(getLocalFieldNoteProject());
    }
  }, [activeProject]);



  return (
    <Page title="Field Notes">
      <Container maxWidth="lg">
        <FieldNoteStepper project={activeProject}></FieldNoteStepper>
      </Container>
    </Page >
  );
}
FieldNotes.propTypes = {

};
export default FieldNotes;