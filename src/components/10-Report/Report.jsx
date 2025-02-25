import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import axios from "axios";
import decrypt from "../../helper";

export default function Report() {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [customersdetail, setCustoemrDetails] = useState(null);

  const toast = useRef(null);

  const getPartners = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/Routes/getCustomers", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setCustoemrDetails(data.Customer);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  const getReportData = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/route/addReport", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  useEffect(() => {
    getPartners();
    getReportData();
  }, []);

  const allowExpansion = (rowData) => {
    console.log("rowData line 66", rowData.refParcelBookings);
    return rowData.refParcelBookings.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    console.log("data ----------- 71", data);
    return (
      <div className="p-3">
        <h5> Data</h5>
        <DataTable value={data.refParcelBookings}>
          <Column
            field="id"
            header="S.No"
            style={{ maxWidth: "1rem" }}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column field="date" header="Date" style={{ maxWidth: "3rem" }} />
          <Column
            field="vendorLeaf"
            header="POD Number"
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="destination"
            header="Destination"
            style={{ maxWidth: "3rem" }}
          />
          <Column field="weight" header="Weight" style={{ maxWidth: "3rem" }} />
          <Column
            field="freight"
            header="Freight"
            style={{ maxWidth: "3rem" }}
          />
          <Column
            field="pickup"
            header="Pick Up"
            style={{ maxWidth: "3rem" }}
          />
          <Column field="amount" header="Amount" style={{ maxWidth: "3rem" }} />
        </DataTable>
      </div>
    );
  };

  const handlePdfDownload = () => {
    window.open("/reportPDF", "_blank");
  };

  const payButtonTemplate = (rowData) => (
    <Button label="Edit" className="p-button-success" />
  );

  return (
    <div>
      <div className="primaryNav">
        <p>Report</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div
        className="m-3"
        style={{ scrollbarWidth: "thin", overflow: "hidden" }}
      >
        <div className="flex mt-3 mb-3 gap-3">
          <Dropdown
            value={selectedVendors}
            onChange={(e) => setSelectedVendors(e.value)}
            options={customersdetail}
            optionLabel="refCustomerName"
            style={{ maxWidth: "14rem" }}
            filter
            className="flex-1"
            placeholder="Customers"
            maxSelectedLabels={3}
          />
          <Calendar
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            placeholder="Pick Start Month"
          />
          <Calendar
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            placeholder="Pick End Date"
          />
          <Button
            label="Generate Report"
            severity="info"
            onClick={() => handlePdfDownload()}
          ></Button>
        </div>
        <Toast ref={toast} />
        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          showGridlines
          scrollable
          stripedRows
          className="reportDatatable"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
        >
          <Column
            field="id"
            header="S.No"
            style={{ width: "1rem" }}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column
            header=""
            expander={allowExpansion}
            style={{ width: "2rem" }}
          />
          <Column field="date" header="Date" style={{ width: "5rem" }} />
          <Column
            field="pod"
            header="POD Number"
            style={{ minWidth: "9rem" }}
          />
          <Column field="leaf" header="Leaf" style={{ width: "8rem" }} />
          <Column
            field="destination"
            header="Destination"
            style={{ width: "5rem" }}
          />
          <Column field="weight" header="Weight" style={{ width: "6rem" }} />
          <Column field="freight" header="Freight" style={{ width: "7rem" }} />
          <Column field="pickup" header="Pick Up" style={{ width: "7rem" }} />
          <Column field="amount" header="Amount" style={{ width: "6rem" }} />
          <Column
            header="Action"
            body={payButtonTemplate}
            style={{ minWidth: "8rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
