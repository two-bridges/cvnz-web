import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { IProjectRisk } from 'src/redux/model/risk.model';
import _ from 'underscore';
import { HelperService } from 'src/lib/helper';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import * as projectRiskActions from "src/redux/actions/Actions/projectRiskActions";
import { useStyles } from '../styles/RiskStyle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ProjectRiskList(props) {
  const dispatch = useDispatch();
  const { organisation, handleAddPopupOpen, project, saveToFieldNoteRisk, selectedRiskForUpdate, className = "", ...rest } = props;

  const allProjectRisksState = useSelector((state: Store) => state?.projectRisks?.projectRisks, (prev, next) => {
    return prev === next;
  });
  var allProjectRiskLists: IProjectRisk[] = [];
  if (allProjectRisksState) {
    allProjectRiskLists = HelperService.getArrayFromObjectList(allProjectRisksState);
    if (allProjectRiskLists) {
      allProjectRiskLists.sort((a, b) => a.name > b.name ? 1 : -1);
    }
  }

  function fetchProjectRisks() {
    if (organisation?.id && project?.id) {
      dispatch(projectRiskActions.fetchProjectRisks({ organisationId: organisation.id, projectId: project.id }));
    }
  }

  useEffect(() => {
    fetchProjectRisks();
  }, [])

  function setRisk(event, risk) {
    event.preventDefault();
    props.selectedRiskForUpdate(risk);
  }
  function handlePopupOpen() {
    props.handleAddPopupOpen()
  }
  return (
    <Card
      style={{ marginTop: '20px' }}
      {...rest}
    >
      <CardHeader
        title="Project Risks"
        titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
        subheaderTypographyProps={{ variant: 'body1' }}
        action={
          <IconButton aria-label="settings" onClick={handlePopupOpen} size="large">
            {/* TODO: THE BUTTON USED HERE IS THROWING ERROR IN CONSOLE */}
            <AddIcon />

          </IconButton>
        }
      />
      <Divider />
      <PerfectScrollbar options={{ suppressScrollY: true }}>
        <CardContent >
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Risk Type</TableCell>
                  <TableCell>Likelihood</TableCell>
                  <TableCell>Consequence </TableCell>
                  <TableCell>Risk Rating</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProjectRiskLists?.map((risk: IProjectRisk) => (
                  <TableRow hover key={risk.id}>
                    <TableCell>{risk.name}</TableCell>
                    <TableCell>{HelperService.capitalizeFirstLetter(risk.likelihood)}</TableCell>
                    <TableCell>{HelperService.capitalizeFirstLetter(risk.consequence)}</TableCell>
                    <TableCell>{risk.risk_rating}</TableCell>
                    <TableCell>
                      <EditIcon onClick={(event) => setRisk(event, risk)} />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </PerfectScrollbar>
    </Card>
  );
}

ProjectRiskList.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object,
  organisation: PropTypes.object,
  selectedRiskForUpdate: PropTypes.func,
  handleAddPopupOpen: PropTypes.func,
  saveToFieldNoteRisk: PropTypes.bool
};
export default ProjectRiskList
  ;

