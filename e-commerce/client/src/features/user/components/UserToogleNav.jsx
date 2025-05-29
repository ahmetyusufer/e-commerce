import { Link, useNavigate } from "react-router";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { SlPeople } from "react-icons/sl";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; // iconlar eklendi
import toast from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetAuthData, setIsLogin } from "../../auth/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { resetQuantities } from "../../product/slices/productLengthSlice";

function UserToogleNav() {
  const token = localStorage.getItem("token");
  const { data: user, isLoading } = useGetCurrentUser();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleQuit() {
    localStorage.removeItem("token");
    dispatch(setIsLogin(false));
    dispatch(resetQuantities());
    dispatch(resetAuthData());
    queryClient.clear();
    toast.success("Hesaptan Çıkış Yapıldı");
    navigate("/login");
  }

  if (token && isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {user && token ? (
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="bg-primary">
            <span className="fw-semibol text-primary">
              <FaUser className="me-2" /> {user.name}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/order/all">
              <FaShoppingCart className="me-2" /> Sipariş Geçmişim
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/account">
              <FaUser className="me-2" /> Kullanıcı Bilgilerim
            </Dropdown.Item>

            <Dropdown.Item onClick={handleQuit}>
              <FaSignOutAlt className="me-2" /> Hesabımdan Çık
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link
          to="/login"
          className="icon-hover text-decoration-none d-flex align-items-center gap-1"
        >
          <SlPeople size={20} />
          <span>Giriş</span>
        </Link>
      )}
    </>
  );
}

export default UserToogleNav;
