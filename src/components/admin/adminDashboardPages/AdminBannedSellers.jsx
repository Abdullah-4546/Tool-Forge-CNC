import { useState } from "react";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";
import AdminGetBannedSellers from "../adminDashboardComponents/AdminGetBannedSellers"; 

function AdminBannedSellers() {
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
            <AdminGetBannedSellers /> 
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminBannedSellers;
