import React from "react";
import ManagementListPage from "./ManagementListPage";
import defaultDepartments from "../../data/departmentList.json";

const Department = () => (
  <ManagementListPage
    storageKey="sms_management_departments"
    defaultItems={defaultDepartments}
    formTitle="Create Department"
    listTitle="Department List"
    primaryField="type"
    fields={[
      {
        name: "type",
        label: "Type Name",
        placeholder: "e.g., academic",
      },
    ]}
    columns={[{ key: "type", label: "Type", className: "w-[80%]" }]}
  />
);

export default Department;
