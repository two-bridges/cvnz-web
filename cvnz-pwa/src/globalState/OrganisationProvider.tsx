
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
const OrganisationContext = React.createContext({});

export default function OrganisationProvider(props) {

  //your variables
  //example
  const [organisationList, setOrganisationList] = useState('');

  return (
    <OrganisationContext.Provider
      value={{ organisation: organisationList, setOrganisationList }}
    >
      {props.children}
    </OrganisationContext.Provider>
  );
}
