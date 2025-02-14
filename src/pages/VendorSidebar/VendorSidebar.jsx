import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import axios from "axios";
import decrypt from "../../helper";

export default function VendorSidebar() {
  const [customerDetails, setCustomersDetails] = useState([]);
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
    setCustomersDetails(storedProducts);
    getPartners();
    axios
      .get(import.meta.env.VITE_API_URL + "/Routes/getPartner", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        // setPartnerDetails(data.partners);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, []);

  const getPartners = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/Routes/getCustomers", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setCustomersDetails(data.Customer);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  const addProduct = () => {
    if (customer.trim() && code.trim()) {
      const newProduct = {
        id: customerDetails.length + 1,
        name: customer,
        code: code,
      };
      const newProducts = [...customerDetails, newProduct];

      setCustomersDetails(newProducts);
      // localStorage.setItem("vendors", JSON.stringify(newProducts));
      try {
        const response = axios.post(
          import.meta.env.VITE_API_URL + "/Routes/addCustomer",
          {
            customerName: customer,
            customerCode: code,
            customerType: regularMode,
            notes: notes,
            refAddress: address,
            refPhone: phone,
          },
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
            },
          }
        );

        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);

        localStorage.setItem("JWTtoken", "Bearer " + data.token);
      } catch (error) {
        console.error(error);
      }
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
                <InputText
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
        <InputSwitch
          checked={rowData.refCustomerType}
          onChange={(e) => setChecked(e.value)}
        />
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
        value={customerDetails}
        header={header}
        showGridlines
      >
        <Column
          field="id"
          header="S.No"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column
          field="refCustomerName"
          frozen
          header="Customers"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="refCode"
          header="Code"
          style={{ minWidth: "7rem" }}
        ></Column>
        <Column
          field="refPhone"
          header="Phone"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="refAddress"
          header="Address"
          style={{ minWidth: "16rem" }}
        ></Column>
        <Column
          field="refNotes"
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
