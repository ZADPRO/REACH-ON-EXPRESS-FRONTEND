import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
// import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import axios from "axios";
import decrypt from "../../helper";

export default function Booking() {
  const [vendors, setVendors] = useState(null);
  const [partners, setPartners] = useState(null);
  const [value, setValue] = useState("");
  const [parcelType, setParcelType] = useState(null);

  const getPartners = () => {
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
        console.log("data.partners", data.partners);
        setVendors(data.partners);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  };

  const handlePdfDownload = () => {
    window.open("/testingPDF", "_blank");
  };

  const handlePayload = () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/route/bookingTest",
        {
          partnersName: "DTDC",
          type: "Express",
          origin: "New York",
          destination: "Los Angeles",
          consignorName: "John Doe",
          consignorAddress: "123 Main St",
          consignorGSTnumber: "27ABCDE1234F1Z5",
          consignorPhone: "9876543210",
          consignorEmail: "john@example.com",
          customerRefNo: "CUST123",
          consigneeName: "Jane Smith",
          consigneeAddress: "456 Elm St",
          consigneeGSTnumber: "07ABCDE1234F1Z5",
          consigneePhone: "9876543211",
          consigneeEmail: "jane@example.com",
          contentSpecification: "Electronics",
          paperEnclosed: "Yes",
          declaredValue: 15000,
          NoOfPieces: 5,
          actualWeight: 10.5,
          dimension: false,
          paymentId: 1,
          customerType: true,
          refCustomerId: 1,
        },
        {
          headers: { Authorization: localStorage.getItem("JWTtoken") },
        }
      )
      .then(() => getPartners())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPartners();
  }, []);

  const parcels = [
    { name: "Non-Document", code: 1 },
    { name: "Document", code: 2 },
  ];

  const [checked, setChecked] = useState(true);

  return (
    <div>
      <div className="primaryNav">
        <p>Booking</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="bookingTab m-4">
        {/* <TabView> */}
        {/* <TabPanel header="Place New Order" className=""> */}
        <div className="mt-2">
          <div className="flex justify-content-between gap-3">
            <FloatLabel>
              <Dropdown
                value={partners}
                inputId="partnerDropDown"
                onChange={(e) => setPartners(e.value)}
                options={vendors}
                optionLabel="partnersName"
                className="w-full md:w-14rem"
                checkmark={true}
                highlightOnSelect={false}
              />
              <label htmlFor="partnerDropDown">Select Partners</label>
            </FloatLabel>

            <FloatLabel>
              <Dropdown
                value={parcelType}
                inputId="docType"
                onChange={(e) => setParcelType(e.value)}
                options={parcels}
                optionLabel="name"
                className="w-full md:w-14rem"
                checkmark={true}
                highlightOnSelect={false}
              />
              <label htmlFor="docType">Type</label>
            </FloatLabel>

            <p className="flex align-items-center">
              <b>Origin : </b> Erode
            </p>
            <FloatLabel>
              <InputText
                id="username"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <label htmlFor="username">Destination</label>
            </FloatLabel>
          </div>
          <Divider />

          <div className="flex card justify-content-between">
            <div className="flex flex-column align-items-start gap-3">
              <p>Consignor</p>
              <div className="flex flex-column gap-3 align-items-center justify-content-around">
                <div className="card flex flex-column md:flex-row gap-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Consignor's Name" />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">$</span>
                    <InputText placeholder="Consignor's Address" />
                  </div>
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">$</span>
                  <InputText placeholder="GST Number" />
                </div>
                <div className="card flex flex-column md:flex-row gap-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Phone" />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">$</span>
                    <InputText placeholder="Email" />
                  </div>
                </div>
              </div>
            </div>
            {/* =================== */}
            <Divider layout="vertical" />
            {/* =================== */}
            <div className="flex flex-column align-items-start gap-3">
              <p>Consignee</p>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">$</span>
                <InputText placeholder="Customer Ref No." />
              </div>
              <div className="card flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Consignor's Name" />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">$</span>
                  <InputText placeholder="Consignor's Address" />
                </div>
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">$</span>
                <InputText placeholder="GST Number" />
              </div>
              <div className="card flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Phone" />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">$</span>
                  <InputText placeholder="Email" />
                </div>
              </div>
            </div>
          </div>

          <Divider />
          <div className="card flex flex-column md:flex-row gap-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Content Specification" />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Paper Enclosed" />
            </div>
          </div>

          <Divider />

          <div className="card flex flex-column md:flex-row gap-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Declared Value" />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="No. Of Pieces" />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Actual Weight" />
            </div>
          </div>

          <Divider />

          <InputSwitch
            checked={checked}
            onChange={(e) => setChecked(e.value)}
          />

          <div className="card flex mt-3 flex-column md:flex-row gap-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Height" disabled={!checked} />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Weight" disabled={!checked} />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Breadth" disabled={!checked} />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Charged Weight" disabled={!checked} />
            </div>
          </div>
        </div>
        <div className="flex gap-3" style={{ paddingBottom: "30px" }}>
          <div style={{ marginTop: "20px" }} onClick={() => handlePayload()}>
            <Button>Book Parcel</Button>
          </div>
          <div
            style={{ marginTop: "20px" }}
            onClick={() => handlePdfDownload()}
          >
            <Button>DOWNLOAD</Button>
          </div>
        </div>
        {/* </TabPanel> */}
        {/* <TabPanel header="Previous Transactions"></TabPanel> */}
        {/* </TabView> */}
      </div>
    </div>
  );
}
