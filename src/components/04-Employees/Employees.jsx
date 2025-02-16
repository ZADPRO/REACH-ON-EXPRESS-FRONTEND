import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";

import EmployeeSidebar from "../../pages/EmployeeSidebar/EmployeeSidebar";
import decrypt from "../../helper";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/Routes/getEmployee", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data line 62", data);
        setEmployees(data.Employee);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
    // const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const onEmployeeAdded = () => {
    fetchEmployees(); // Refresh the employees list
    setVisibleRight(false); // Close the sidebar
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={() => setVisibleRight(true)}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Employee</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  return (
    <div>
      <div className="primaryNav">
        <p>Employee</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="m-3">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={employees}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            scrollable
            stripedRows
            showGridlines
            paginator
            className="employeeDataTable"
            scrollHeight="350px"
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="code"
              frozen
              header="S.No"
              body={(rowData, rowIndex) => rowIndex.rowIndex + 1}
              style={{ minWidth: "4rem" }}
            ></Column>
            <Column
              field="refCustId"
              header="Employee ID"
              frozen
              style={{ minWidth: "10rem", textTransform: "capitalize" }}
            ></Column>
            <Column
              field="firstName"
              header="Employee Name"
              frozen
              body={(rowData) =>
                `${rowData.refUserFName} ${rowData.refUserLName}`
              }
              style={{ minWidth: "13rem", textTransform: "capitalize" }}
            ></Column>
            <Column
              field="userTypeName"
              header="Designation"
              style={{ minWidth: "13rem", textTransform: "capitalize" }}
            ></Column>
            <Column
              field="refEmail"
              header="Email"
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="refCustMobileNum"
              header="Contact Number"
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="name"
              header="Payroll Status"
              style={{ minWidth: "13rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "70vw" }}
        onHide={() => setVisibleRight(false)}
      >
        <EmployeeSidebar onEmployeeAdded={onEmployeeAdded} />
      </Sidebar>
    </div>
  );
}
