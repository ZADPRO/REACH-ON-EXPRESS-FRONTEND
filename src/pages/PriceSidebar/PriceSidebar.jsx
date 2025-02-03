import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Minimize2, Maximize2, IndianRupee } from "lucide-react";

export default function PriceSidebar() {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedPartners = JSON.parse(localStorage.getItem("partners")) || [];
    setPartners(storedPartners);
  }, []);

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

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("partners")) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div className="m-4">
      <div>
        <Dropdown
          value={selectedPartner}
          onChange={(e) => setSelectedPartner(e.value)}
          options={partners}
          optionLabel="name"
          placeholder="Select a Partner"
          className="w-full md:w-14rem"
        />
        <Divider />
        <div className="flex gap-2">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <Minimize2 size={17} />
            </span>
            <InputText placeholder="Min. Weight" />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <Maximize2 size={17} />{" "}
            </span>
            <InputText placeholder="Max. Weight" />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <IndianRupee size={17} />{" "}
            </span>
            <InputText placeholder="Price" />
          </div>
          <Button label="Add" severity="success" />
        </div>
        <DataTable
          scrollable
          stripedRows
          className="partnersVendorId mt-3"
          value={products}
          // header={header}
          showGridlines
        >
          <Column
            field="id"
            header="S.No"
            body={(_, rowIndex) => rowIndex.rowIndex + 1}
          ></Column>
          <Column field="name" header="Min. Weight"></Column>
          <Column field="name" header="Max. Weight"></Column>
          <Column field="name" header="Price"></Column>
          <Column
            field="edit"
            header="Actions"
            body={quantityTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
