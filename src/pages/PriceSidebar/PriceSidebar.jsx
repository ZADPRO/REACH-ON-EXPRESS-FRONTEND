import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { InputSwitch } from "primereact/inputswitch";
import { Minimize2, Maximize2, IndianRupee } from "lucide-react";

export default function PriceSidebar() {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [products, setProducts] = useState([]);
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState([]);

  useEffect(() => {
    const storedPartners = JSON.parse(localStorage.getItem("partners")) || [];
    setPartners(storedPartners);
  }, []);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("pricingDetails")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (!selectedPartner || !minWeight || !maxWeight || !price) {
      alert("Please fill all the fields!");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      partner: selectedPartner.name,
      minWeight,
      maxWeight,
      price,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("pricingDetails", JSON.stringify(updatedProducts));

    setMinWeight("");
    setMaxWeight("");
    setPrice("");
  };

  const quantityTemplate = (rowData) => (
    <Button
      rounded
      outlined
      text
      severity="info"
      icon="pi pi-pencil"
      onClick={() => console.log("Edit quantity for", rowData.id)}
    />
  );

  const filteredProducts = selectedPartners.length
    ? products.filter((p) =>
        selectedPartners.some((sp) => sp.name === p.partner)
      )
    : products;

  return (
    <div className="m-4">
      <h3>Pricing</h3>

      <Dropdown
        value={selectedPartner}
        onChange={(e) => setSelectedPartner(e.value)}
        options={partners}
        optionLabel="name"
        placeholder="Select a Partner"
        className="w-full md:w-14rem"
      />

      <Divider />

      {selectedPartner && (
        <div className="flex flex-column gap-2">
          <div className="flex gap-2">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Minimize2 size={17} />
              </span>
              <InputText
                placeholder="Min. Weight"
                value={minWeight}
                onChange={(e) => setMinWeight(e.target.value)}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Maximize2 size={17} />
              </span>
              <InputText
                placeholder="Max. Weight"
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <IndianRupee size={17} />
              </span>
              <InputText
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex align-items-center">
              <InputSwitch
                checked={checked}
                onChange={(e) => setChecked(e.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Minimize2 size={17} />
              </span>
              <InputText
                placeholder="Length"
                value={minWeight}
                onChange={(e) => setMinWeight(e.target.value)}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Maximize2 size={17} />
              </span>
              <InputText
                placeholder="Breadth"
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <IndianRupee size={17} />
              </span>
              <InputText
                placeholder="Height"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button label="Add" severity="success" onClick={addProduct} />
          </div>
        </div>
      )}

      <Divider />
      <MultiSelect
        value={selectedPartners}
        onChange={(e) => setSelectedPartners(e.value)}
        options={partners}
        optionLabel="name"
        display="chip"
        placeholder="Select Vendors"
        maxSelectedLabels={3}
        className="w-full md:w-14rem"
      />

      <DataTable
        scrollable
        stripedRows
        className="partnersVendorId mt-3"
        value={filteredProducts}
        showGridlines
      >
        <Column field="id" header="S.No" style={{ width: "4rem" }} />
        <Column field="partner" header="Partner" style={{ width: "10rem" }} />
        <Column field="minWeight" header="Min." style={{ width: "5rem" }} />
        <Column field="maxWeight" header="Max." style={{ width: "5rem" }} />
        <Column field="price" header="Price" style={{ width: "5rem" }} />
        <Column
          field="edit"
          header="Actions"
          style={{ width: "4rem" }}
          body={quantityTemplate}
        />
      </DataTable>
    </div>
  );
}
