import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function VendorSidebar() {
  const [products, setProducts] = useState([]);
  const [showInputSection, setShowInputSection] = useState(false);
  const [partners, setPartners] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("vendors")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (partners.trim() && code.trim()) {
      const newProduct = {
        id: products.length + 1,
        name: partners,
        code: code,
      };
      const newProducts = [...products, newProduct];

      setProducts(newProducts);
      localStorage.setItem("vendors", JSON.stringify(newProducts));
      setPartners("");
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
        <div className="flex mt-3 gap-2">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="Vendors"
              value={partners}
              onChange={(e) => setPartners(e.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="Vendors"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
      <h3>Vendors</h3>
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
        <Column field="code" header="Code"></Column>
        <Column field="edit" header="Actions" body={quantityTemplate}></Column>
      </DataTable>
    </div>
  );
}
