import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { SlBasket, SlHeart } from "react-icons/sl";
import { useFavorite } from "../favorite/hooks/useFavorite";
import { useBasket } from "../basket/hooks/useBasket";
import { useDispatch, useSelector } from "react-redux";
import {
  setBasketQuantity,
  setFavoriteQuantity,
} from "../product/slices/productLengthSlice";
import { useEffect } from "react";
import UserToogleNav from "../user/components/UserToogleNav";

function NavHeader() {
  const dispatch = useDispatch();

  const { data: favoriteData } = useFavorite();
  const { data: basketData } = useBasket();

  useEffect(() => {
    if (favoriteData) {
      dispatch(setFavoriteQuantity(favoriteData.length));
    }
  }, [favoriteData, dispatch]);

  useEffect(() => {
    if (basketData) {
      dispatch(setBasketQuantity(basketData.length));
    }
  }, [basketData, dispatch]);

  const { favoriteQuantity, basketQuantity } = useSelector(
    (state) => state.productLength
  );

  return (
    <>
      <Navbar
        expand="lg"
        className="border-bottom border-primary bg-white py-3"
        sticky="top"
      >
        <Container>
          {/* Logo */}
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand className="text-primary fw-bold fs-3">
              STORE
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="main-navbar-offcanvas" />

          <Navbar.Offcanvas
            id="main-navbar-offcanvas"
            aria-labelledby="main-navbar-offcanvas"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="main-navbar-offcanvas">Menü</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Search Form - mobile + desktop */}
              <Form
                className="d-flex mx-lg-auto my-3 my-lg-0"
                style={{ maxWidth: "500px", width: "100%" }}
              >
                <div className="input-group">
                  <Form.Control
                    type="search"
                    placeholder="Ürün ara..."
                    aria-label="Search"
                    className="bg-white border border-primary text-dark"
                  />
                  <Button variant="outline-primary" className="border-primary">
                    Ara
                  </Button>
                </div>
              </Form>

              {/* Navigation Icons */}
              <Nav className="ms-lg-auto d-flex align-items-center gap-4 text-primary flex-row flex-lg-row">
                <UserToogleNav />

                <Link
                  to="/favorite"
                  className="icon-hover text-decoration-none d-flex align-items-center gap-1"
                >
                  <SlHeart size={20} />
                  <span className="d-none d-md-inline">Favoriler</span>
                  <span className="badge bg-opacity-50 text-primary ms-1 px-2 rounded-3 bg-danger">
                    {favoriteQuantity}
                  </span>
                </Link>

                <Link
                  to="/basket"
                  className="icon-hover text-decoration-none d-flex align-items-center gap-1"
                >
                  <SlBasket size={20} />
                  <span className="d-none d-md-inline">Sepet</span>
                  <span className="badge bg-success bg-opacity-50 text-success ms-1 px-2 rounded-3">
                    {basketQuantity}
                  </span>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavHeader;
