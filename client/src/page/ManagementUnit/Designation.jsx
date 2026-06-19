import React from "react";
import ManagementListPage from "./ManagementListPage";
import defaultDesignations from "../../data/designationList.json";

const Designation = () => (
  <ManagementListPage
    storageKey="sms_management_designations"
    defaultItems={defaultDesignations}
    formTitle="Create Designation"
    listTitle="Designation List"
    primaryField="designation"
    fields={[
      {
        name: "designation",
        label: "Type Name",
        placeholder: "e.g., teacher",
      },
      {
        name: "type",
        label: "Type",
        type: "select",
        defaultValue: "",
        options: ["Teaching", "Non-Teaching"],
      },
    ]}
    columns={[
      { key: "designation", label: "Designation", className: "w-[45%]" },
      { key: "type", label: "Type", className: "w-[35%]" },
    ]}
  />
);

export default Designation;
