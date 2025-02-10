import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Sidebar } from "primereact/sidebar";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

import "./Key.css";
import UploadExcelSidebar from "../../pages/UploadExcelSidebar/UploadExcelSidebar";

export default function Key() {
  const toast = useRef(null);

  const [globalFilter, setGlobalFilter] = useState(null);
  const [customers, setCustomers] = useState([]);
  const dt = useRef(null);
  const [selectedVendors, setSelectedVendors] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [dates, setDates] = useState(null);

  const vendors = JSON.parse(localStorage.getItem("partners"));
  console.log("vendorsData", vendors);

  const state = [
    { name: "Not Assigned", code: 1 },
    { name: "Assigned", code: 2 },
    { name: "Dispatched", code: 3 },
    { name: "Delivered", code: 4 },
    { name: "Cancelled", code: 5 },
  ];

  const generateTrackingId = (id, date) => {
    const paddedNumber = String(id).padStart(5, "0");
    const formattedDate = new Date(date)
      .toLocaleDateString("en-US", {
        month: "2-digit",
        year: "2-digit",
      })
      .replace("/", "");
    return `R${paddedNumber}${formattedDate}`;
  };

  const generateRandomVendorLeaf = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const calculateValidity = (purchasedDate) => {
    const date = new Date(purchasedDate);
    date.setDate(date.getDate() + 90);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    const data = [
      {
        id: 1,
        vendorLeaf: generateRandomVendorLeaf(),
        vendor: vendors[0].name,
        status: state[0].name,
        purchasedDate: "2024-01-20",
        validity: calculateValidity("2024-01-20"),
      },
    ];

    setCustomers(data);
  }, []);

  const handleEdit = (rowData) => {
    toast.current.show({
      severity: "info",
      summary: "Edit Action",
      detail: `Tracking ID: ${rowData.trackingId}`,
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-info"
          onClick={() => handleEdit(rowData)}
          tooltipOptions={{ position: "bottom" }}
          tooltip="Edit"
        />
      </div>
    );
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

  const exportCSV = () => {
    dt.current.exportCSV();
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
      <h4 className="m-0">Transaction Details</h4>
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
    <>
      <Toast ref={toast} />

      <div className="primaryNav">
        <p>Transaction Mapping</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="m-3">
        <div className="flex gap-2">
          <MultiSelect
            value={selectedVendors}
            onChange={(e) => setSelectedVendors(e.value)}
            options={vendors}
            optionLabel="name"
            filter
            placeholder="Partners"
            maxSelectedLabels={3}
            className="w-full md:w-14rem"
          />
          <MultiSelect
            value={selectedState}
            onChange={(e) => setSelectedState(e.value)}
            options={state}
            optionLabel="name"
            filter
            placeholder="Status"
            maxSelectedLabels={3}
            className="w-full md:w-14rem"
          />
          <Calendar
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="multiple"
            readOnlyInput
            placeholder="Pick Multiple Dates"
            showButtonBar
            className="w-full md:w-14rem"
          />
          <Calendar
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
            showButtonBar
            placeholder="Pick Date Range"
            hideOnRangeSelection
            className="w-full md:w-14rem"
          />
        </div>
        <Toolbar
          className="mb-2 mt-2"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          value={customers.map((customer, index) => ({
            ...customer,
            trackingId: generateTrackingId(index + 1, customer.purchasedDate),
          }))}
          ref={dt}
          scrollable
          showGridlines
          stripedRows
          header={header}
          globalFilter={globalFilter}
          scrollHeight="300px"
        >
          <Column
            field="id"
            header="S.No"
            style={{ minWidth: "3rem" }}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column
            field="trackingId"
            header="Tracking ID"
            frozen
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="vendorLeaf"
            header="Vendor Leaf"
            frozen
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="vendor"
            header="Vendor"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="purchasedDate"
            header="Purchased Date"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="validity"
            header="Validity"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ textAlign: "center", minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "70vw" }}
        onHide={() => setVisibleRight(false)}
      >
        <UploadExcelSidebar />
      </Sidebar>
    </>
  );
}
