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
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const storedPartners = JSON.parse(localStorage.getItem("vendors")) || [];
    setPartners(storedPartners);
  }, []);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("pricingDetails")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    if (!selectedPartner) {
      alert("Please select a partner!");
      return;
    }

    if (!minWeight || !maxWeight || !price) {
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
          <Button label="Add" severity="success" onClick={addProduct} />
        </div>
        <DataTable
          scrollable
          stripedRows
          className="partnersVendorId mt-3"
          value={products}
          showGridlines
        >
          <Column field="id" header="S.No" />
          <Column field="partner" header="Partner" />
          <Column field="minWeight" header="Min. Weight" />
          <Column field="maxWeight" header="Max. Weight" />
          <Column field="price" header="Price" />
        </DataTable>
      </div>
    </div>
  );
}
