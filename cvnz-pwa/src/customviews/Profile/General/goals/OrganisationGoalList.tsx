import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'src/redux/reducers/rootReducer';
import { IGoal, IGoalType } from 'src/redux/model/goal.model';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import { deleteGoalType, fetchOrganisationGoals } from 'src/redux/actions/organisationGoalActions';
import { IOrganisation } from 'src/redux/model/organisation.model';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import MessageSnackbar from 'src/customviews/SnackBar/MessageSnackBar';
import { loadingAllProjectGoals } from 'src/redux/actions/allProjectGoalsActions';


function OrganisationGoalList(props) {
  const { className = "", ...rest } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  //get organisation
  let organisation = useSelector((state: Store) => state?.activeOrganisationReducers?.single, (prev, next) => {
    return prev === next;
  });

  let orgGoalList = useSelector((state: Store) => {
    const idx = state?.organisationGoalReducers?.list;
    let list = idx ? Object.values(idx) : [];
    return list;
  });


  function getOrg() {
    let orgStored = sessionStorage.getItem('organisation');
    if (orgStored) {
      organisation = JSON.parse(orgStored) as IOrganisation;
    }
  }
  useEffect(() => {
    if (!organisation) {
      getOrg();
    }

    dispatch(fetchOrganisationGoals({ organisationId: organisation ? organisation.id : '' }));
    dispatch(loadingAllProjectGoals(organisation ? organisation.id : ''));
  }, []);

  async function deleteOrganisation(event, goal) {
    if (!organisation) {
      getOrg();
    }
    let test = await dispatch(deleteGoalType(goal, organisation ? organisation.id : ''));
    if (!test) {
      setMessage('Selected goal already in used by a project');
      setOpenSnackbar(true);
    }
  }
  return (
    <div>
      <MessageSnackbar panelStatus={'warn'} onClose={handleSnackbarClose} open={openSnackbar} message={message}></MessageSnackbar>
      {
        orgGoalList.length > 0 ? (
          <PerfectScrollbar options={{ suppressScrollY: true }}>
            <div style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Goal</TableCell>
                    <TableCell>Metric</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orgGoalList.filter(o => !o.deleted_utc).map((goal: IGoalType) => (
                    <TableRow
                      hover
                      key={goal.id}>
                      <TableCell>{goal.goal}</TableCell>
                      <TableCell>{goal.metric}</TableCell>

                      <TableCell><DeleteIcon onClick={(event) => deleteOrganisation(event, goal)} ></DeleteIcon>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        ) : (<div></div>)
      }
    </div>
  );
}

OrganisationGoalList.propTypes = {
  className: PropTypes.string,
};
export default OrganisationGoalList
  ;


