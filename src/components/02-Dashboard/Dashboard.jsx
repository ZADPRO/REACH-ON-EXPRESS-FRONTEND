import { IndianRupee, ShoppingCart, TriangleAlert, Undo2 } from "lucide-react";
import { Divider } from "primereact/divider";

import profile from "../../assets/dashboard/profile.svg";
import coverImg from "../../assets/dashboard/1.jpg";

import "./Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const cardData = [
    {
      id: 1,
      title: "Orders",
      count: "4 new",
      description: "Orders count",
      icon: <ShoppingCart size={40} />,
    },
    {
      id: 2,
      title: "Revenue",
      count: "280",
      description: "Sales count",
      icon: <IndianRupee size={40} />,
    },
    {
      id: 3,
      title: "Return Orders",
      count: "0",
      description: "Returns count",
      icon: <Undo2 size={40} />,
    },
    {
      id: 4,
      title: "Pending Orders",
      count: "0",
      description: "Pending count",
      icon: <TriangleAlert size={40} />,
    },
  ];

  return (
    <div>
      <div className="primaryNav">
        <p>Dashboard</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="dashboardContxt">
        <div className="contents m-3">
          <div className="userProfile">
            <div className="coverImage">
              <img src={coverImg} alt="coverImage" />
            </div>
            <div className="coverContents">
              <img src={profile} alt="userProfile" />
              <div className="userDetails">
                <div className="userDetOne">
                  <div className="userDetPrimary">
                    <p className="username">
                      {user && (
                        <>
                          {user.refUserFName} {user.refUserLName}
                        </>
                      )}
                    </p>
                    <p className="useremail">email@reachonexpress.com</p>
                  </div>
                  <p className="empPosition">Admin</p>
                </div>
                <div className="userDetTwo">
                  <p>
                    {" "}
                    {user && (
                      <>
                        <span>Employee ID </span>: {user.refCustId}
                      </>
                    )}
                  </p>
                  <Divider layout="vertical" />
                  <p>
                    <span>Department </span>: Admin
                  </p>
                  <Divider layout="vertical" />
                  <p>
                    <span>Mobile </span>: +91 9360257667
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardContents">
          {cardData.map((card) => (
            <div className="card" key={card.id}>
              <div className="cardTextContents">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <p>
                  <span>{card.count}</span> since last week
                </p>
              </div>
              <div className="cardIcon">{card.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
