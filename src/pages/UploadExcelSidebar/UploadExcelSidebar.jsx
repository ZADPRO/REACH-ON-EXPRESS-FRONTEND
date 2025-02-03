import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import * as XLSX from "xlsx";

import sampleExcel from "../../assets/excel/sample.xlsx";

export default function UploadExcelSidebar() {
  const [checked, setChecked] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla porro
        deserunt nam eos quo. Necessitatibus esse ex consectetur libero rerum,
        sunt, aperiam saepe recusandae eum delectus, hic natus explicabo
        quaerat.
      </p>
    </div>
  );

  const formatExcelDate = (excelDate) => {
    if (!excelDate) return "";

    if (!isNaN(excelDate)) {
      const date = new Date((excelDate - 25569) * 86400 * 1000);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    return excelDate;
  };
  const onUploadHandler = (event) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      jsonData = jsonData.map((row) => {
        if (row["Purchased Date"]) {
          row["Purchased Date"] = formatExcelDate(row["Purchased Date"]);
        }
        return row;
      });

      const leafIdSet = new Map();
      const vendorIdSet = new Map();

      jsonData.forEach((row, index) => {
        const leafId = row["leafId"];
        const vendorId = row["vendorLeaf"];

        if (leafId) {
          if (leafIdSet.has(leafId)) {
            const prevIndex = leafIdSet.get(leafId);
            jsonData[prevIndex].duplicate = true;
            row.duplicate = true;
          }
          leafIdSet.set(leafId, index);
        }

        if (vendorId) {
          if (vendorIdSet.has(vendorId)) {
            const prevIndex = vendorIdSet.get(vendorId);
            jsonData[prevIndex].duplicate = true;
            row.duplicate = true;
          }
          vendorIdSet.set(vendorId, index);
        }
      });

      setUploadedData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const rowClassName = (rowData) => {
    return rowData.duplicate ? "p-error" : "";
  };

  const resetUpload = () => {
    setUploadedData(null);
  };

  const uploadToConsole = () => {
    if (uploadedData) {
      console.log("uploadedData", uploadedData);
      console.log("Payload:", JSON.stringify(uploadedData, null, 2));
    } else {
      console.warn("No data to upload.");
    }
  };

  const downloadSampleExcel = () => {
    const link = document.createElement("a");
    link.href = sampleExcel;
    link.download = "Sample_Upload_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div>
      <Toolbar className="mb-2 mt-2" left={leftToolbarTemplate}></Toolbar>
      {!uploadedData ? (
        <>
          <div className="flex align-items-center">
            <Button
              icon="pi pi-download"
              rounded
              text
              onClick={downloadSampleExcel}
            />
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
          <DataTable
            className="uploadDataTable"
            value={uploadedData}
            paginator
            rows={10}
            showGridlines
            rowClassName={rowClassName}
          >
            <Column
              header="S.No"
              body={(rowData, { rowIndex }) => rowIndex + 1}
            />
            {uploadedData &&
              Object.keys(uploadedData[0]).map((key, index) => (
                <Column key={index} field={key} header={formatHeader(key)} />
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
              label="Upload"
              icon="pi pi-cloud-upload"
              aria-hidden={false}
              className="p-button-success ml-2"
              onClick={uploadToConsole}
            />
          </div>
        </div>
      )}
    </div>
  );
}
