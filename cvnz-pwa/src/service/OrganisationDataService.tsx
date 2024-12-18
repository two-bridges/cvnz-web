
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { IOrganisation } from "src/redux/model/organisation.model";
import * as organisationActions from 'src/redux/actions/organisationActions';
import { connect } from "react-redux";
import { RootState } from "src/redux/reducers/rootReducer";
import { bindActionCreators, Dispatch } from 'redux';
import { store } from "src/redux/store/configureStore";

const OrganisatonContext = createContext({});

type FnOrganisations = (args: organisationActions.ICreateOrganisationCriteria)
  =>
  Promise<{ payload: IOrganisation[], type: string, meta: { arg: organisationActions.ICreateOrganisationCriteria, requestId: string } }>;

function OrganisationsProvider(props) {
  const [organisations, setOrganisations] = useState<IOrganisation[]>([]);

  const actions = props.actions as {
    loadOrganisations: FnOrganisations
  };

  useEffect(() => {
    let mounted = true;
    actions.loadOrganisations({})
      .then(response => {
        if (mounted) {
          var organisationList = response.payload;
          if (organisationList?.length > 0) {
            setOrganisations(organisationList);
          }
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <OrganisatonContext.Provider value={organisations}></OrganisatonContext.Provider>
  );
}

export function useOrganisations() {
  const context = useContext(OrganisatonContext);
  if (!context) throw new Error("useUser must be used within a CountProvider");
  console.log("organisations in userorganisations", context)
  const organisations = context as IOrganisation[];
  return organisations;
}

function mapStateToProps(state: RootState) {
  var user = state.userSessionV2.user;
  return {
    user,
  };
}

const loadOrganisations = bindActionCreators(organisationActions.fetchOrganisations, store.dispatch);


function mapDispatchToProps() {
  return {
    actions: {
      loadOrganisations
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationsProvider as any);
