import { useState } from "react";

import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";
import SellerEditProductForm from "../sellerDashboardComponents/SellerEditProductForm";


function SellerEditProduct() {
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
            <SellerEditProductForm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerEditProduct;
