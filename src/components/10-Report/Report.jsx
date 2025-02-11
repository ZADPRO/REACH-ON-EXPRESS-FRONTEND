import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function Report() {
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const data = [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
        orders: [
          {
            id: "1000-0",
            productCode: "f230fh0g3",
            date: "2020-09-13",
            amount: 65,
            quantity: 1,
            customer: "David James",
            status: "PENDING",
          },
          {
            id: "1000-1",
            productCode: "f230fh0g3",
            date: "2020-05-14",
            amount: 130,
            quantity: 2,
            customer: "Leon Rodrigues",
            status: "DELIVERED",
          },
          {
            id: "1000-2",
            productCode: "f230fh0g3",
            date: "2019-01-04",
            amount: 65,
            quantity: 1,
            customer: "Juan Alejandro",
            status: "RETURNED",
          },
          {
            id: "1000-3",
            productCode: "f230fh0g3",
            date: "2020-09-13",
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
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        price: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
        orders: [
          {
            id: "1001-0",
            productCode: "nvklal433",
            date: "2020-05-14",
            amount: 72,
            quantity: 1,
            customer: "Maisha Jefferson",
            status: "DELIVERED",
          },
          {
            id: "1001-1",
            productCode: "nvklal433",
            date: "2020-02-28",
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
        name: "Blue Band",
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
            date: "2020-07-05",
            amount: 79,
            quantity: 1,
            customer: "Stacey Leja",
            status: "DELIVERED",
          },
          {
            id: "1002-1",
            productCode: "zz21cz3c1",
            date: "2020-02-06",
            amount: 79,
            quantity: 1,
            customer: "Ashley Wickens",
            status: "DELIVERED",
          },
        ],
      },
      {
        id: "1003",
        code: "244wgerg2",
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
      {
        id: "1004",
        code: "h456wer53",
        name: "Bracelet",
        description: "Product Description",
        image: "bracelet.jpg",
        price: 15,
        category: "Accessories",
        quantity: 73,
        inventoryStatus: "INSTOCK",
        rating: 4,
        orders: [
          {
            id: "1004-0",
            productCode: "h456wer53",
            date: "2020-09-05",
            amount: 60,
            quantity: 4,
            customer: "Mayumi Misaki",
            status: "PENDING",
          },
          {
            id: "1004-1",
            productCode: "h456wer53",
            date: "2019-04-16",
            amount: 2,
            quantity: 30,
            customer: "Francesco Salvatore",
            status: "DELIVERED",
          },
        ],
      },
    ];
    setProducts(data);
  }, []);

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
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

  return (
    <div>
      <div>
        <div className="primaryNav">
          <p>Report</p>
          <p className="">Logged in as: Admin</p>
        </div>
      </div>
      <div className="m-3">
        <Toast ref={toast} />
        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          showGridlines
          scrollable
          scrollHeight="500px"
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
    </div>
  );
}
