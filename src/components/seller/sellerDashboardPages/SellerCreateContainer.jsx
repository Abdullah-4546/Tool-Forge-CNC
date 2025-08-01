import { useState } from "react";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";
import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerContainerForm from "../sellerDashboardComponents/SellerContainerForm";

function SellerCreateContainer() {
  const [controlNavbar, setControlNavbar] = useState(false);

  return (
    <div className={controlNavbar ? "dashboard active" : "dashboard"}>
      <SellerNavbarVertical controlNavbar={controlNavbar} />

      <div className="dash-page-content">
        <SellerDashboardHeader
          controlNavbar={controlNavbar}
          setControlNavbar={setControlNavbar}
        />

        <div className="py-12 px-6">
          <SellerContainerForm />
        </div>
      </div>
    </div>
  );
}

export default SellerCreateContainer;
