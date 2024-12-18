import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardHeader, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import { IProjectRisk } from 'src/redux/model/risk.model';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import Edit from '@mui/icons-material/Edit';
import { useParams } from 'react-router';
import { getFieldNoteRisksFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteRisksActions';
import { getFieldNoteFromFirebase } from 'src/redux/actions/FieldNoteActions/fieldNoteActions';


function FieldNoteRiskList(props) {
  const dispatch = useDispatch();
  const classes = useStyles({});
  const fieldNoteParams = useParams<{ projectId: string, organisation: string, fieldNoteId: string }>();

  let allProjectRisksState = useSelector((state: Store) => state?.fieldNoteRisks?.list, (prev, next) => {
    return prev === next;
  });
  if (allProjectRisksState.length > 0) {
    allProjectRisksState = allProjectRisksState.sort((a, b) => a.name > b.name ? 1 : -1);
  }
  const activeFieldNote = useSelector((state: Store) => state?.fieldNote?.single, (prev, next) => {
    return prev === next;
  });

  useEffect(() => {
    if (!activeFieldNote) {
      dispatch(getFieldNoteFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
    }
  }, [activeFieldNote]);
  useEffect(() => {
    dispatch(getFieldNoteRisksFromFirebase({ organisationId: fieldNoteParams.organisation, projectId: fieldNoteParams.projectId, fieldNoteId: fieldNoteParams.fieldNoteId }));
  }, []);

  function setRisk(event, risk: IProjectRisk) {
    event.preventDefault();
    props.selectedRiskForUpdate(risk);
  }

  function handlePopupOpen() {
    console.log("activeFieldNote", activeFieldNote);
    props.handleAddPopupOpen();
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {
        <div>
          <Card>
            <CardHeader
              title="Risks"
              titleTypographyProps={{ variant: 'h4', fontWeight: 'normal' }}
              subheaderTypographyProps={{ variant: 'body1' }}
            />
            <Divider />
            <CardContent>
              <PerfectScrollbar options={{ suppressScrollY: true }}>
                <div>

                  {allProjectRisksState.length > 0 ? (
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
                        {allProjectRisksState?.map((risk: IProjectRisk) => (
                          <TableRow hover key={risk.id}>
                            <TableCell>{risk.name}</TableCell>
                            <TableCell>{risk.likelihood}</TableCell>
                            <TableCell>{risk.consequence}</TableCell>
                            <TableCell>{risk.risk_rating}</TableCell>
                            <TableCell>
                              {
                                activeFieldNote?.status === 'Complete' ? (<div></div>) : (<div>
                                  <Edit onClick={(event) => setRisk(event, risk)}></Edit>
                                </div>)
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) :
                    (<div></div>)
                  }

                </div>
              </PerfectScrollbar>
              <br />
              <div className={classes.spacing}>
                <Grid alignItems="flex-end" container justifyContent="flex-end" spacing={3}
                >
                  <Grid item>
                    <Button style={{ marginRight: '10px' }} color="primary" variant="contained" size='small' onClick={handlePopupOpen} disabled={activeFieldNote?.status === 'Complete'}> Add</Button>
                  </Grid>
                </Grid>
              </div>
            </CardContent>

          </Card>
        </div>
      }
    </div>
  );
}

FieldNoteRiskList.propTypes = {
  className: PropTypes.string,
  selectedRiskForUpdate: PropTypes.func,
  handleAddPopupOpen: PropTypes.func

};
export default FieldNoteRiskList
  ;

