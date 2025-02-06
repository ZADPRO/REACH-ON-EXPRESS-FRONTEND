import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function PartnersSidebar() {
  const [products, setProducts] = useState([]);
  const [showInputSection, setShowInputSection] = useState(false);
  const [partners, setPartners] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [validity, setValidity] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("partners")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (partners.trim()) {
      const newProducts = [
        ...products,
        {
          id: products.length + 1,
          name: partners,
          contact: contactDetails,
          validity: validity,
        },
      ];
      setProducts(newProducts);
      localStorage.setItem("partners", JSON.stringify(newProducts));
      setPartners("");
      setContactDetails("");
      setValidity("");
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
              placeholder="Partners"
              value={partners}
              onChange={(e) => setPartners(e.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
            <InputText
              placeholder="Contact"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar"></i>
            </span>
            <InputText
              placeholder="Validity"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
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
        <Column field="name" header="Partners"></Column>
        <Column field="contact" header="Contact"></Column>
        <Column field="validity" header="Validity"></Column>
        <Column field="edit" header="Actions" body={quantityTemplate}></Column>
      </DataTable>
    </div>
  );
}
