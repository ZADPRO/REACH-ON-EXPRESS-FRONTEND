import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";

export default function VendorSidebar() {
  const [products, setProducts] = useState([]);
  const [showInputSection, setShowInputSection] = useState(false);
  const [customer, setCustomer] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [regularMode, setRegularMode] = useState(false);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("vendors")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (customer.trim() && code.trim()) {
      const newProduct = {
        id: products.length + 1,
        name: customer,
        code: code,
      };
      const newProducts = [...products, newProduct];

      setProducts(newProducts);
      localStorage.setItem("vendors", JSON.stringify(newProducts));
      setCustomer("");
      setCode("");
      setShowInputSection(false);
    }
  };

  const header = (
    <>
      <div className="flex flex-wrap gap-2 align-items-center justify-content-end">
        <Button
          label="Add"
          severity="success"
          onClick={() => setShowInputSection(!showInputSection)}
        />
      </div>
      {showInputSection && (
        <div className="flex flex-column mt-3 gap-2">
          <Divider />
          <div className="flex flex-column gap-2">
            <div className="flex gap-2">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Customers"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputNumber
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1 align-items-center justify-content-between">
                <p>{regularMode ? "Regular" : "Walk-In"}</p>
                <InputSwitch
                  checked={regularMode}
                  onChange={(e) => setRegularMode(e.value)}
                />
              </div>
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 align-items-center justify-content-end">
            <Button label="Add" severity="info" onClick={addProduct} />
            <Button
              label="Cancel"
              severity="danger"
              onClick={() => setShowInputSection(false)}
            />
          </div>
          <Divider />
        </div>
      )}
    </>
  );

  const quantityTemplate = (rowData) => {
    return (
      <div className="flex align-items-center justify-content-center">
        <Button
          rounded
          outlined
          text
          severity="info"
          icon="pi pi-pencil"
          onClick={() => console.log("Edit quantity for", rowData.id)}
        />
      </div>
    );
  };

  const customerTypeTemplate = (rowData) => {
    return (
      <div className="flex align-items-center justify-content-center">
        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
      </div>
    );
  };

  return (
    <div>
      <h3>Customers</h3>
      <DataTable
        scrollable
        stripedRows
        className="partnersVendorId"
        value={products}
        header={header}
        showGridlines
      >
        <Column
          field="id"
          header="S.No"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column
          field="name"
          frozen
          header="Customers"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="code"
          header="Code"
          style={{ minWidth: "7rem" }}
        ></Column>
        <Column
          field="code"
          header="Phone"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="code"
          header="Address"
          style={{ minWidth: "16rem" }}
        ></Column>
        <Column
          field="code"
          header="Notes"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="code"
          header="Reg / Walk"
          body={customerTypeTemplate}
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="edit"
          header="Actions"
          body={quantityTemplate}
          style={{ minWidth: "10rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}
