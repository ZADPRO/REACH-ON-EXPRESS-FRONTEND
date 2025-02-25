import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function Finance() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const data = Array.from({ length: 6 }, (_, i) => ({
      id: (i + 1).toString(),
      code: `${i + 1}`,
      name: i === 0 ? "Nalla Kadai" : `Client ${i}`,
      invoice: `INV${1000 + i}`,
      outstanding: Math.floor(Math.random() * 15000) + 5000,
      payAmount: "", // Default empty
      balance: "", // Default empty
    }));
    setProducts(data);
  }, []);

  // Handle Pay Amount Change
  const handlePayChange = (e, rowData) => {
    let inputValue = e.target.value;
    let payValue = parseFloat(inputValue) || 0;

    let updatedProducts = products.map((product) => {
      if (product.id === rowData.id) {
        let newBalance =
          payValue > product.outstanding
            ? `+ ${payValue - product.outstanding}`
            : product.outstanding - payValue;

        return { ...product, payAmount: inputValue, balance: newBalance };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  // Invoice Button Template
  const invoiceTemplate = () => (
    <Button icon="pi pi-download" label="Download" className="p-button-text" />
  );

  // Pay Button Template
  const payButtonTemplate = (rowData) => (
    <Button
      label="Pay"
      className="p-button-success"
      onClick={() => {
        setSelectedProduct(rowData);
        setVisible(true);
      }}
    />
  );

  return (
    <div>
      <div className="primaryNav">
        <p>Finance</p>
        <p>Logged in as: Admin</p>
      </div>
      <div className="financeContents m-3">
        <DataTable value={products} dataKey="id" showGridlines stripedRows>
          <Column
            field="code"
            header="S.No"
            frozen
            style={{ minWidth: "3rem" }}
          />
          <Column
            field="name"
            header="Name"
            frozen
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="invoice"
            header="Invoice"
            body={invoiceTemplate}
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="outstanding"
            header="Outstanding"
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="payAmount"
            header="Pay Amount"
            body={(rowData) => (
              <InputText
                type="number"
                value={rowData.payAmount}
                onChange={(e) => handlePayChange(e, rowData)}
              />
            )}
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="balance"
            header="Balance Amount"
            style={{ minWidth: "8rem" }}
          />
          <Column
            header="Action"
            body={payButtonTemplate}
            style={{ minWidth: "8rem" }}
          />
        </DataTable>
      </div>

      {/* Payment Modal */}
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Select Payment Method"
        footer={
          <>
            <Button
              label="GPay"
              icon="pi pi-wallet"
              className="p-button-primary"
            />
            <Button
              label="Cash"
              icon="pi pi-money-bill"
              className="p-button-secondary"
            />
          </>
        }
      >
        <p>Choose a payment method for {selectedProduct?.name}.</p>
      </Dialog>
    </div>
  );
}
