import { useState , useEffect} from "react";
import SellerDashboardHeader from "../sellerDashboardComponents/SellerDashboardHeader";
import SellerNavbarVertical from "../sellerDashboardComponents/SellerNavbarVertical";
import SellerContainers from "../sellerDashboardComponents/SellerContainers"; 
import { getAllContainers } from "../../../redux/actions/containerAction"; 
import { useDispatch } from "react-redux";

function SellerViewContainers() {
  const dispatch = useDispatch();

  const [controlNavbar, setControlNavbar] = useState(false);
  useEffect(() => {
    dispatch(getAllContainers()); // Fetch all bids
  }, [dispatch]);

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
            <SellerContainers />
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerViewContainers;
