import { useState } from "react";
import AdminNavbarVertical from "../adminDashboardComponents/AdminNavbarVertical";
import AdminCreateCategoryForm from "../adminDashboardComponents/AdminCreateCategoryForm";
import AdminDashboardHeader from "../adminDashboardComponents/ADminDashboardHeader";


function AdminCreateCategory() {
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
            <AdminCreateCategoryForm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCreateCategory;
