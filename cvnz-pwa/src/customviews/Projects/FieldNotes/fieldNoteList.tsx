import React from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import FieldNotesList from 'src/customviews/FieldNotes/Components/FieldNoteList/FieldNotesList';
import { IProject } from 'src/redux/model/project.model';


function FieldNoteList() {
  return (
    <FieldNotesList></FieldNotesList>
  );
}

FieldNoteList.propTypes = {
  className: PropTypes.string,
};
export default FieldNoteList
  ;

