import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadExcelSidebar() {
  const [checked, setChecked] = useState(false);
  const [uploadedData, setUploadedData] = useState(null); // To store uploaded Excel data

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla porro
          deserunt nam eos quo. Necessitatibus esse ex consectetur libero rerum,
          sunt, aperiam saepe recusandae eum delectus, hic natus explicabo
          quaerat.
        </p>
      </div>
    );
  };

  // Function to handle file upload and parse Excel data
  const onUploadHandler = (event) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Parse to JSON
      setUploadedData(jsonData); // Save parsed data
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to reset uploaded data and show FileUpload again
  const resetUpload = () => {
    setUploadedData(null); // Clear uploaded data
  };

  return (
    <div>
      <Toolbar className="mb-2 mt-2" left={leftToolbarTemplate}></Toolbar>
      {!uploadedData ? (
        <>
          <div className="flex align-items-center">
            <Button icon="pi pi-download" rounded text />
            <p>Download Bulk Upload Sample Excel</p>
          </div>
          <div className="flex align-items-center mt-2 mb-2">
            <InputSwitch
              checked={checked}
              onChange={(e) => setChecked(e.value)}
            />
            <p>Upload Excel</p>
          </div>
          <FileUpload
            name="demo"
            disabled={!checked}
            url={"/api/upload"}
            accept=".xls,.xlsx,.csv"
            maxFileSize={1000000}
            multiple={false}
            customUpload
            uploadHandler={onUploadHandler}
            emptyTemplate={
              <p className="m-0">
                Drag and drop an Excel or CSV file here to upload.
              </p>
            }
          />
        </>
      ) : (
        <div>
          <DataTable value={uploadedData} paginator rows={10}>
            {uploadedData &&
              Object.keys(uploadedData[0]).map((key, index) => (
                <Column key={index} field={key} header={key} />
              ))}
          </DataTable>
          <div className="mt-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-danger"
              onClick={resetUpload}
            />
            <Button
              label="Reupload"
              icon="pi pi-upload"
              className="p-button-secondary ml-2"
              onClick={resetUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
