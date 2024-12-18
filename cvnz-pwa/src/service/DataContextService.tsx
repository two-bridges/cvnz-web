
import React from "react";
import OrganisationProvider from "./OrganisationDataService";
import UserProvider from "./ReferenceDataContext";

export default function DataContextService({ children }) {

  return (
    <div>
      <UserProvider>{children}</UserProvider>
      <OrganisationProvider></OrganisationProvider>
    </div>

  );
}
