import { useState } from "react";
import SellerProductForm from "../sellerDashboardComponents/SellerProductForm";
import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";


function SellerCreateProduct() {
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
            <SellerProductForm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerCreateProduct;
