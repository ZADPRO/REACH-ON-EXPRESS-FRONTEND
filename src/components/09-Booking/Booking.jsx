import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

export default function Booking() {
  const [partners, setPartners] = useState(null);
  const [value, setValue] = useState("");

  const vendors = JSON.parse(localStorage.getItem("partners"));
  console.log("vendorsData", vendors);

  return (
    <div>
      <div className="primaryNav">
        <p>Booking</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="bookingTab m-4">
        <TabView>
          <TabPanel header="Place New Order">
            <div className="mt-2">
              <div className="flex justify-content-between gap-3">
                <FloatLabel>
                  <Dropdown
                    value={partners}
                    inputId="partnerDropDown"
                    onChange={(e) => setPartners(e.value)}
                    options={vendors}
                    optionLabel="name"
                    className="w-full md:w-14rem"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                  <label htmlFor="partnerDropDown">Select Partners</label>
                </FloatLabel>

                <FloatLabel>
                  <Dropdown
                    value={partners}
                    inputId="partnerDropDown"
                    onChange={(e) => setPartners(e.value)}
                    options={vendors}
                    filter
                    optionLabel="name"
                    className="w-full md:w-14rem"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                  <label htmlFor="partnerDropDown">Type</label>
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
            </div>
          </TabPanel>
          <TabPanel header="Previous Transactions"></TabPanel>
        </TabView>
      </div>
    </div>
  );
}
