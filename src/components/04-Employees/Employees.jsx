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

export default function Employees() {
  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {}, []);

  const exportCSV = () => {
    dt.current.exportCSV();
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
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            scrollable
            stripedRows
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="code"
              header="S.No"
              style={{ minWidth: "4rem" }}
            ></Column>
            <Column
              field="name"
              header="Employee Name"
              frozen
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="name"
              header="Designation"
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="name"
              header="Email"
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="name"
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
        <EmployeeSidebar />
      </Sidebar>
    </div>
  );
}
