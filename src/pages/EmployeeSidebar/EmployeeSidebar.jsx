import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function EmployeeSidebar() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [date, setDate] = useState(null);

  const cities = [
    { name: "Admin", code: 1 },
    { name: "Finance", code: 2 },
    { name: "Employee", code: 3 },
  ];
  return (
    <div>
      <h3>Add Employee</h3>
      <div className="flex gap-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="First Name" />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Last Name" />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select Designation"
            className="w-full md:w-14rem"
          />{" "}
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Email" />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Mobile" />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <Calendar
            value={date}
            placeholder="Date of birth"
            onChange={(e) => setDate(e.value)}
            className="w-full md:w-14rem"
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Qualification" />
        </div>
      </div>
      <div className="flex mt-3 justify-content-end">
        <Button label="Add" severity="success" />
      </div>
    </div>
  );
}
