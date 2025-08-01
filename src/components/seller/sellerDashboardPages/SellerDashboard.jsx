import { useState } from "react";
import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";
import DashboardMain from "../sellerDashboardComponents/DashboardMain";

function SellerDashboard() {
  const [controlNavbar, setControlNavbar] = useState(false);
  return (
    <>
      <div className={controlNavbar ? "dashboard active" : "dashboard"}>
        <SellerNavbarVertical controlNavbar={controlNavbar} />

        <div className="dash-page-content">
          <SellerDashboardHeader
            controlNavbar={controlNavbar}
            setControlNavbar={setControlNavbar}
          />

          <div className="py-12 px-6">
            <DashboardMain />
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerDashboard;
