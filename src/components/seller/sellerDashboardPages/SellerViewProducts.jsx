import { useState } from "react";
import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";
import SellerProducts from "../sellerDashboardComponents/SellerProducts";


function SellerViewProducts() {
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
            <SellerProducts/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerViewProducts;
