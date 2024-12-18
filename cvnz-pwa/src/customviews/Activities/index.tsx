
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Theme } from '@mui/material';
import Page from '../../components/Page';
import Header from './Header';
import Results from './Results';
import AddButtonIcon from '../../components/AddButtonIcon';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import * as activityActions from "../../redux/actions/activityActions";
import { store } from 'src/redux/store/configureStore';
import * as _ from "underscore";
import { IActivityDeep } from '../../redux/model/activity.model';
import PropTypes from "prop-types";

import { bindActionCreators, Dispatch } from "redux";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },

  header: {
    marginBottom: theme.spacing(3)
  },
  filter: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(6)
  }
}));

type FnLoadActivityList = (args: activityActions.IFetchActivitiesCriteria) => Promise<{ payload: IActivityDeep[], type: string, meta: { arg: activityActions.IFetchActivitiesCriteria, requestId: string } }>;

function Activities(props) {

  const actions = props.actions as {
    loadActivityList: FnLoadActivityList
  };


  const [activities, setActivites] = useState<IActivityDeep[]>([]);

  const classes = useStyles({});
  const history = useHistory();
  const handleClickEvent = () => {
    history.push('/activities/create');
  };

  useEffect(() => {
    let mounted = true;
    if (activities.length === 0) {
      actions.loadActivityList({})
        .then(response => {
          if (mounted) {
            setActivites(response.payload);
          }
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!activities || !props.activities) {
    return null;
  } else {
    console.log(`has activities.length`, activities);
  }

  return (
    <Page className={classes.root} title="Projects">
      <Container maxWidth="lg">
        <Header className={classes.header} />
        <Results activities={activities} className={classes.results} />
        <AddButtonIcon handleClickEvent={handleClickEvent} />
      </Container>
    </Page>
  );
}

Activities.propTypes = {
  //add properties and types here
  activities: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
  var activities = _.values(state.activities.list);
  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  return {
    activities,
    // loading: state.apiCallsInProgress > 0
  };
}

const loadActivityList = bindActionCreators(activityActions.fetchActivities, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      loadActivityList,
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
