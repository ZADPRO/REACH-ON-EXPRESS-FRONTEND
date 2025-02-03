import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Booking() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div>
      <div className="primaryNav">
        <p>Booking</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="bookingTab">
        <div className="flex">
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
            checkmark={true}
            highlightOnSelect={false}
          />
        </div>
      </div>
    </div>
  );
}
