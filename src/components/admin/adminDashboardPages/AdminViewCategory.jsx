import { useState } from "react";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";
import AdminViewAllCategory from "../adminDashboardComponents/AdminViewAllCategory";


function AdminViewCategory() {
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
            <AdminViewAllCategory/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminViewCategory;
