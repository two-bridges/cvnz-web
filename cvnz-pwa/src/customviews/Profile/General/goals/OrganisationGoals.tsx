import { Card, CardContent, CardHeader, Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoalsDropdown from 'src/customviews/CommonComponents/GoalsDropdown';
import { IGoalType } from 'src/redux/model/goal.model';
import * as orgGoalsActions from "src/redux/actions/organisationGoalActions";
import { Store } from 'src/redux/reducers/rootReducer';
import OrganisationGoalList from './OrganisationGoalList';
import { useStyles } from 'src/customviews/Projects/styles/RiskStyle';
import Page from 'src/components/Page';
import { useParams } from 'react-router';
import { addOrganisationGoal } from 'src/redux/actions/organisationGoalActions';

function OrganisationGoals() {
  const dispatch = useDispatch();
  const classes = useStyles({})
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const params = useParams<{ orgId: string }>();

  let orgGoalTypeList = useSelector((state: Store) => {
    const idx = state?.organisationGoalReducers?.list;
    let list = idx ? Object.values(idx) : [];
    return list;
  });


  const setSelectedGoalType = async (event, selectedGoalType: IGoalType) => {
    setIsSelected(false);
    event.preventDefault();
    await dispatch(addOrganisationGoal({ projectGoal: selectedGoalType, organisationId: params.orgId ? params.orgId : '', type: "add" }));
    setIsSelected(true);
  }

  return (
    <Page className={classes.root} title="Add Goals">
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={'Add one or more Organisational Goals from the drop down'}></CardHeader>
          <CardContent>
            {orgGoalTypeList ? (
              <div>
                <GoalsDropdown isGoalSelected={isSelected} selectedGoalList={orgGoalTypeList} setSelectedGoalType={setSelectedGoalType}></GoalsDropdown>
              </div>
            ) :
              (<div></div>)
            }
            <OrganisationGoalList></OrganisationGoalList>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}
export default OrganisationGoals;