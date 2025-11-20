import { createContext, useContext, useState } from "react";

const viewOrganizationContext = createContext(null);

export const ViewOrganizationProvider = ({ children }) => {
  const [searchOrganizationData, setSearchOrganizationData] = useState({
    OrganizationContactName: "",
    OrganizationContactEmail: "",
    OrganizationDateFrom: "",
    OrganizationDateTo: "",
    OrganizationName: "",
    OrganizationSubscriptionStatus: {
      value: 0,
      label: "",
    },
    OrganizationDateToView: "",
    OrganizationDateFromView: "",
  });
  const [showsearchText, setShowSearchText] = useState(false);

  const viewOrganizationData = {
    searchOrganizationData,
    setSearchOrganizationData,
    showsearchText,
    setShowSearchText,
    // Add any state or functions related to viewing organizations here
  };

  return (
    <viewOrganizationContext.Provider value={viewOrganizationData}>
      {children}
    </viewOrganizationContext.Provider>
  );
};

export const useViewOrganization = () => {
  const context = useContext(viewOrganizationContext);
  if (!context) {
    throw new Error(
      "useViewOrganization must be used within a ViewOrganizationProvider"
    );
  }
  return context;
};
