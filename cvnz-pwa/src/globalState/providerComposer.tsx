
import React from "react";
import OrganisationProvider from "./OrganisationProvider";

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer
      contexts={[<OrganisationProvider />]}
    >
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
