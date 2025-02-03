import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function PartnersSidebar() {
  const [products, setProducts] = useState([]);
  const [showInputSection, setShowInputSection] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setProducts([]);
  }, []);

  const addProduct = () => {
    if (username.trim()) {
      setProducts([...products, { id: products.length + 1, name: username }]);
      setUsername("");
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
        <div className="flex mt-3 gap-2">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button label="Add" severity="info" onClick={addProduct} />
          <Button
            label="Cancel"
            severity="danger"
            onClick={() => setShowInputSection(false)}
          />
        </div>
      )}
    </>
  );

  const quantityTemplate = (rowData) => {
    return (
      <Button
        rounded
        outlined
        text
        severity="info"
        icon="pi pi-pencil"
        onClick={() => console.log("Edit quantity for", rowData.id)}
      />
    );
  };

  return (
    <div>
      <h3>Partners</h3>
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
        <Column field="name" header="Vendor"></Column>
        <Column
          field="quantity"
          header="Quantity"
          body={quantityTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
