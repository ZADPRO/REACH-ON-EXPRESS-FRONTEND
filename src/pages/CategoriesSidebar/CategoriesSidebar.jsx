import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function CategoriesSidebar() {
  const [showInputSection, setShowInputSection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
    const storedData = JSON.parse(localStorage.getItem("subCategories")) || [];
    setData(storedData);
  }, []);

  const handleDropdownChange = (e) => {
    if (e.value.id === "add_new") {
      setShowInput(true);
      setSelectedCategory(null);
    } else {
      setSelectedCategory(e.value);
      setShowInput(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const updatedCategories = [
        ...categories,
        { name: newCategory, id: categories.length + 1 },
      ];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewCategory("");
      setShowInput(false);
    }
  };

  const handleAddSubCategory = () => {
    console.log("selectedCategory", selectedCategory);
    console.log(
      "selectedCategory && subCategory.trim()",
      selectedCategory && subCategory.trim()
    );
    if (selectedCategory) {
      const newData = [
        ...data,
        { id: data.length + 1, category: selectedCategory.name, subCategory },
      ];
      console.log("newData", newData);
      setData(newData);
      localStorage.setItem("subCategories", JSON.stringify(newData));
      setSubCategory("");
    }
  };

  const categoryOptions = [
    ...(categories || []),
    { name: "Add New Category", id: "add_new" },
  ];

  const representativeBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.category}</span>
      </div>
    );
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

  return (
    <div>
      <h3>Categories Sidebar</h3>
      <div className="flex flex-wrap gap-2 mb-3 align-items-center justify-content-end">
        <Button
          label="Add"
          severity="success"
          onClick={() => setShowInputSection(!showInputSection)}
        />
      </div>
      {showInputSection && (
        <div className="flex flex-column mb-3 gap-2">
          <Divider />
          <div className="flex align-items-center gap-2">
            <p>Categories:</p>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <Dropdown
                value={selectedCategory}
                onChange={handleDropdownChange}
                options={categoryOptions}
                optionLabel="name"
                filter
                placeholder="Select Category"
                style={{ maxWidth: "14rem" }}
                checkmark={true}
                highlightOnSelect={false}
              />
            </div>
            {showInput && (
              <div className="flex flex-1 align-items-center gap-2">
                <InputText
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                />
                <Button
                  label="Add"
                  icon="pi pi-check"
                  onClick={handleAddCategory}
                />
              </div>
            )}
          </div>
          <div className="flex align-items-center gap-2">
            <p>Sub-Categories:</p>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Add Sub Category"
                style={{ maxWidth: "14rem" }}
              />
            </div>
          </div>
          <div className="flex gap-3 align-items-center justify-content-end">
            <Button
              label="Add"
              severity="info"
              onClick={handleAddSubCategory}
            />
            <Button
              label="Cancel"
              severity="danger"
              onClick={() => setShowInputSection(false)}
            />
          </div>
          <Divider />
        </div>
      )}
      <DataTable
        value={data}
        showGridlines
        stripedRows
        scrollable
        scrollHeight="300px"
        rowGroupMode="rowspan"
        groupRowsBy="category"
        sortMode="single"
        sortField="category"
        sortOrder={1}
      >
        <Column
          header="S.No"
          headerStyle={{ width: "3rem" }}
          body={(data, options) => options.rowIndex + 1}
        ></Column>
        <Column
          field="category"
          header="Category"
          body={representativeBodyTemplate}
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="subCategory"
          header="Sub Category"
          style={{ minWidth: "200px" }}
        ></Column>
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
