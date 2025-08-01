import { useState } from "react";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";

import AdminDashboardMain from "../adminDashboardComponents/AdminDashboardMain";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";


function AdminDashboard() {
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
            <AdminDashboardMain/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
