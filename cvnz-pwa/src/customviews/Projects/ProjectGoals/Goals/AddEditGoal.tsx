
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Card, CardHeader, CardContent, Theme } from '@mui/material';
import GoalCreate from './GoalCreate';
import axios from '../../../../utils/axios';
import Page from '../../../../components/Page';
import clsx from 'clsx';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    flexGrow: 1
  }
  //add your style classes here 
}));

function AddEditGoal(props, className = "", ...rest) {
  const classes = useStyles({});
  const [goal, setGoal] = useState<any>(null);
  const goalId = props.match.params.id;

  useEffect(() => {
    let mounted = true;

    //fetch selected project from the api
    const fetchGoal = () => {
      if (goalId) {
        //get all goals if not specified from props
        axios.get('/api/goals').then(response => {
          if (mounted) {
            setGoal(response.data.goals.find(el => el.id === goalId));
          }
        });
      }
    };
    fetchGoal();

    return () => {
      mounted = false;
    };
  }, []);

  if (goalId && !goal) {
    return null;
  }
  if (goalId && !goal) {
    return null;
  }

  return (
    //add component HTML here
    <Page {...rest} className={clsx(classes.root, className)} title="AddGoals">
      <Container
        maxWidth="lg"
      // justify="center"
      // alignitems="stretch"
      >
        <Card>
          <CardHeader>

          </CardHeader>
          <CardContent>
            <GoalCreate
              goal={goal}
            />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

AddEditGoal.propTypes = {
  //add properties and types here
};

export default AddEditGoal;
