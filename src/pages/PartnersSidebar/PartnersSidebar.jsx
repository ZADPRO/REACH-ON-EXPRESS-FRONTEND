import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import decrypt from "../../helper";

export default function PartnersSidebar() {
  const [partnerDetails, setPartnerDetails] = useState([]);
  const [showInputSection, setShowInputSection] = useState(false);
  const [partners, setPartners] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [validity, setValidity] = useState("");

  useEffect(() => {
    getPartners();
    const storedProducts = JSON.parse(localStorage.getItem("partners")) || [];
    setPartnerDetails(storedProducts);
  }, []);

  const getPartners = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/Routes/getPartner", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setPartnerDetails(data.partners);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  const addProduct = () => {
    if (partners.trim()) {
      const newProducts = [
        ...partnerDetails,
        {
          id: partnerDetails.length + 1,
          name: partners,
          contact: contactDetails,
          validity: validity,
        },
      ];
      setPartnerDetails(newProducts);
      // localStorage.setItem("partners", JSON.stringify(newProducts));
      try {
        const response = axios.post(
          import.meta.env.VITE_API_URL + "/Routes/addPartners",
          {
            partnersName: partners,
            validityDate: validity,
            mobileNumber: contactDetails,
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

        localStorage.setItem("JWTtoken", "Bearer " + data.token);
        getPartners();
      } catch (error) {
        console.error(error);
      }
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
        value={partnerDetails}
        header={header}
        showGridlines
      >
        <Column
          field="id"
          header="S.No"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column field="partnersName" header="Partners"></Column>
        <Column field="phoneNumber" header="Contact"></Column>
        <Column field="validity" header="Validity"></Column>
        <Column field="edit" header="Actions" body={quantityTemplate}></Column>
      </DataTable>
    </div>
  );
}
