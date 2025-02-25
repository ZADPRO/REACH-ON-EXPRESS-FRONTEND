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
    const storedData = localStorage.getItem("balanceStaticData");
    if (storedData) {
      setProducts(JSON.parse(storedData));
    } else {
      const staticData = [
        {
          id: "1",
          code: "1",
          name: "Nalla Kadai",
          invoice: "INV1000",
          outstanding: 12000,
          payAmount: "",
          balance: 12000, // Initial balance equals outstanding
        },
        {
          id: "2",
          code: "2",
          name: "Client 1",
          invoice: "INV1001",
          outstanding: 8500,
          payAmount: "",
          balance: 8500,
        },
        {
          id: "3",
          code: "3",
          name: "Client 2",
          invoice: "INV1002",
          outstanding: 13000,
          payAmount: "",
          balance: 13000,
        },
        {
          id: "4",
          code: "4",
          name: "Client 3",
          invoice: "INV1003",
          outstanding: 9500,
          payAmount: "",
          balance: 9500,
        },
        {
          id: "5",
          code: "5",
          name: "Client 4",
          invoice: "INV1004",
          outstanding: 11000,
          payAmount: "",
          balance: 11000,
        },
        {
          id: "6",
          code: "6",
          name: "Client 5",
          invoice: "INV1005",
          outstanding: 14000,
          payAmount: "",
          balance: 14000,
        },
      ];
      setProducts(staticData);
      localStorage.setItem("balanceStaticData", JSON.stringify(staticData));
    }
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
    localStorage.setItem("balanceStaticData", JSON.stringify(updatedProducts));
  };

  // Handle Payment Confirmation
  const confirmPayment = () => {
    let updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? { ...product, outstanding: product.balance }
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem("balanceStaticData", JSON.stringify(updatedProducts));
    setVisible(false);
  };

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
            body={(rowData) => (
              <Button
                label="Pay"
                className="p-button-success"
                onClick={() => {
                  setSelectedProduct(rowData);
                  setVisible(true);
                }}
              />
            )}
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
              onClick={confirmPayment}
            />
            <Button
              label="Cash"
              icon="pi pi-money-bill"
              className="p-button-secondary"
              onClick={confirmPayment}
            />
          </>
        }
      >
        <p>Choose a payment method for {selectedProduct?.name}.</p>
      </Dialog>
    </div>
  );
}
