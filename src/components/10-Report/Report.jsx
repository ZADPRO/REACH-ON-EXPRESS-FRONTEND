import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function Report() {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
  console.log("vendorsData", vendors);
  const toast = useRef(null);

  useEffect(() => {
    const data = [
      {
        id: "1000",
        date: "16-02-2025",
        pod: "RTP10010-0225",
        name: "Testing Parcel",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        leaf: "NM6O9L558999	",
        price: 65,
        destination: "",
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
        orders: [
          {
            id: "1000-0",
            pod: "RTP10010-0225-001",
            date: "16-02-2025",
            productCode: "f230fh0g3",
            amount: 65,
            quantity: 1,
            customer: "David James",
            status: "PENDING",
          },
          {
            id: "1000-1",
            pod: "RTP10010-0225-002",
            productCode: "f230fh0g3",
            date: "16-02-2025",
            amount: 130,
            quantity: 2,
            customer: "Leon Rodrigues",
            status: "DELIVERED",
          },
          {
            id: "1000-2",
            pod: "RTP10010-0225-003",
            productCode: "f230fh0g3",
            date: "16-02-2025",
            amount: 65,
            quantity: 1,
            customer: "Juan Alejandro",
            status: "RETURNED",
          },
          {
            id: "1000-3",
            pod: "RTP10010-0225-004",
            productCode: "f230fh0g3",
            date: "16-02-2025",
            amount: 195,
            quantity: 3,
            customer: "Claire Morrow",
            status: "CANCELLED",
          },
        ],
      },
      {
        id: "1001",
        code: "nvklal433",
        pod: "RTP10011-10225",
        date: "16-02-2025",
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        price: 72,
        category: "Accessories",
        leaf: "NM6O9L558910",

        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
        orders: [
          {
            id: "1001-0",
            productCode: "nvklal433",
            pod: "RTP10011-0225-001",
            date: "16-02-2025",
            amount: 72,
            quantity: 1,
            customer: "Maisha Jefferson",
            status: "DELIVERED",
          },
          {
            id: "1001-1",
            pod: "RTP10011-0225-002",

            productCode: "nvklal433",
            date: "16-02-2025",
            amount: 144,
            quantity: 2,
            customer: "Octavia Murillo",
            status: "PENDING",
          },
        ],
      },
      {
        id: "1002",
        code: "zz21cz3c1",
        date: "16-02-2025",
        name: "Blue Band",
        pod: "RTP10012-0225",
        leaf: "NM6O9L558911",

        description: "Product Description",
        image: "blue-band.jpg",
        price: 79,
        category: "Fitness",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
        orders: [
          {
            id: "1002-0",
            productCode: "zz21cz3c1",
            date: "16-02-2025",
            amount: 79,
            pod: "RTP10012-0225-001",
            quantity: 1,
            customer: "Stacey Leja",
            status: "DELIVERED",
          },
          {
            id: "1002-1",
            pod: "RTP10012-0225-002",
            productCode: "zz21cz3c1",
            date: "16-02-2025",
            amount: 79,
            quantity: 1,
            customer: "Ashley Wickens",
            status: "DELIVERED",
          },
        ],
      },
      {
        id: "1003",
        pod: "RTP10013-0225",
        leaf: "NM6O9L5589102",

        code: "244wgerg2",
        date: "16-02-2025",
        name: "Blue T-Shirt",
        description: "Product Description",
        image: "blue-t-shirt.jpg",
        price: 29,
        category: "Clothing",
        quantity: 25,
        inventoryStatus: "INSTOCK",
        rating: 5,
        orders: [],
      },
    ];
    setProducts(data);
  }, []);

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Report Expanded",
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Report Collapsed",
      life: 3000,
    });
  };

  const allowExpansion = (rowData) => {
    return rowData.orders.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Orders for {data.name}</h5>
        <DataTable value={data.orders}>
          <Column
            field="id"
            header="S.No"
            style={{ maxWidth: "1rem" }}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column field="date" header="Date" style={{ maxWidth: "3rem" }} />
          <Column
            field="pod"
            header="POD Number"
            style={{ maxWidth: "3rem" }}
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
            options={vendors}
            optionLabel="name"
            style={{ maxWidth: "14rem" }}
            filter
            className="flex-1"
            placeholder="Partners"
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
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
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
            style={{ maxWidth: "1rem" }}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column
            header=""
            expander={allowExpansion}
            style={{ width: "2rem" }}
          />
          <Column field="date" header="Date" style={{ maxWidth: "3rem" }} />
          <Column
            field="pod"
            header="POD Number"
            style={{ maxWidth: "5rem" }}
          />
          <Column field="leaf" header="Leaf" style={{ maxWidth: "5rem" }} />
          <Column
            field="destination"
            header="Destination"
            style={{ maxWidth: "5rem" }}
          />
          <Column field="weight" header="Weight" style={{ maxWidth: "6rem" }} />
          <Column
            field="freight"
            header="Freight"
            style={{ maxWidth: "7rem" }}
          />
          <Column
            field="pickup"
            header="Pick Up"
            style={{ maxWidth: "7rem" }}
          />
          <Column field="amount" header="Amount" style={{ maxWidth: "3rem" }} />
          <Column field="amount" header="Edit" style={{ maxWidth: "3rem" }} />
        </DataTable>
      </div>
    </div>
  );
}
