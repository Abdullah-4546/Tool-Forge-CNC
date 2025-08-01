import { useState } from "react";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";
import AdminEditCategoryForm from "../adminDashboardComponents/AdminEditCategoryFrom";
import AdminGetAllProducts from "../adminDashboardComponents/AdminGetAllProducts";


function AdminProducts() {
  const [controlNavbar, setControlNavbar] = useState(false);
  return (
    <>
      <div className={controlNavbar ? "dashboard active" : "dashboard"}>
        <AdminNavbarVertical controlNavbar={controlNavbar} />

        <div className="dash-page-content">
          <AdminDashboardHeader
            controlNavbar={controlNavbar}
            setControlNavbar={setControlNavbar}
          />

          <div className="py-12 px-6">
          <AdminGetAllProducts/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
