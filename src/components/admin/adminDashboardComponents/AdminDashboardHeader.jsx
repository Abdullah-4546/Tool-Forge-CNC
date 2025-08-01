import { useDispatch, useSelector } from "react-redux";
import menuIcon from "../../../assets/menu-icon.svg";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authAction";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../../redux/reducers/authReducer";

function AdminDashboardHeader(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, message} = useSelector((state) => state.auth);
  const handleLogoutFunc = () => {
    dispatch(logoutUser())
  }


  useEffect(() => {
    if(error) {
      toast.error(error.message);
      dispatch(clearError())
    }
    if(message) {
      toast.success(message);
      dispatch(clearMessage())
      navigate("/")
    }
  },[navigate, dispatch, error, message, toast])
  
  
  return (
    <>
      <div className="dash-header">
        <div className="flex justify-between items-center w-full">
          <div
            className="header-menu"
            onClick={() => props.setControlNavbar(!props.controlNavbar)}
          >
            <img src={menuIcon} alt="menu" />
          </div>
          <div onClick={handleLogoutFunc} className="header-logout">Logout</div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardHeader;
