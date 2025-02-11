import { DataView } from "primereact/dataview";
import offersIcon from "../../assets/react.svg";
import category from "../../assets/react.svg";
import restroDoc from "../../assets/react.svg";
import paymentMethods from "../../assets/react.svg";
import money from "../../assets/react.svg";

import PriceSidebar from "../../pages/PriceSidebar/PriceSidebar";

import { Sidebar } from "primereact/sidebar";

import { useState } from "react";
import PartnersSidebar from "../../pages/PartnersSidebar/PartnersSidebar";
import VendorSidebar from "../../pages/VendorSidebar/VendorSidebar";
import CategoriesSidebar from "../../pages/CategoriesSidebar/CategoriesSidebar";

const cardsData = [
  { id: 1, title: "Partners", icon: offersIcon },
  { id: 2, title: "Customers", icon: offersIcon },
  { id: 3, title: "Price", icon: offersIcon },
  { id: 4, title: "Categories", icon: offersIcon },
  { id: 5, title: "Parcel Booking", icon: offersIcon },
  { id: 6, title: "Mapping", icon: category },
  { id: 7, title: "Employee", icon: restroDoc },
  { id: 8, title: "Tracking", icon: paymentMethods },
  { id: 9, title: "Restrictions", icon: money },
];

export default function Settings() {
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const renderCard = (card) => (
    <div
      className="col-12 sm:col-6 lg:col-3"
      onClick={() => handleCardClick(card)}
      style={{ cursor: "pointer" }}
    >
      <div className="card shadow-2 m-2 p-4 border-round">
        <div className="flex align-items-center justify-content-between">
          <span>{card.title}</span>
          <img src={card.icon} width={70} alt={card.title} />
        </div>
      </div>
    </div>
  );

  const handleCardClick = (card) => {
    setSelectedCard(card.title);
    setVisibleSidebar(true);
  };

  const renderSidebarContent = () => {
    switch (selectedCard) {
      case "Price":
        return <PriceSidebar />;
      case "Partners":
        return <PartnersSidebar />;
      case "Customers":
        return <VendorSidebar />;
      case "Categories":
        return <CategoriesSidebar />;
      // case "Payment Methods":
      //   return <PaymentMethodsSidebar />;
      // case "Money Transfer":
      //   return <MoneyTransferSidebar />;
      // default:
      //   return <p>Select an option to view details.</p>;
    }
  };

  return (
    <div>
      <div className="primaryNav">
        <p>Settings</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="flex w-full items-center justify-content-center mt-4">
        <DataView
          value={cardsData}
          layout="grid"
          itemTemplate={renderCard}
          className="p-grid"
        />
      </div>

      <Sidebar
        visible={visibleSidebar}
        position="right"
        style={{ width: "70vw" }}
        onHide={() => setVisibleSidebar(false)}
      >
        {renderSidebarContent()}
      </Sidebar>
    </div>
  );
}
