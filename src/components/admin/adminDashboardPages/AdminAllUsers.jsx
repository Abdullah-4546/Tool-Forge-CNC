import { useState } from "react";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";

import AdminGetAllProducts from "../adminDashboardComponents/AdminGetAllProducts";
import AdminGetAllUsers from "../adminDashboardComponents/AdminGetAllUsers";


function AdminAllUsers() {
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
            <AdminGetAllUsers/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAllUsers;
