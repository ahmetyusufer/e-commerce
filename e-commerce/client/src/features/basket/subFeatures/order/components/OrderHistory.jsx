import {
  Spinner,
  Card,
  Row,
  Col,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
import { useGetOrderById } from "../hooks/useGetOrderById";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

function OrderHistory() {
  const { data: orderData, isLoading } = useGetOrderById();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  console.log(orderData);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Sipariş Geçmişi</h2>

      <Card
        className="shadow-sm border-0 mb-4"
        style={{ backgroundColor: "var(--bs-card)", borderRadius: "10px" }}
      >
        <Card.Body>
          <Row
            className="align-items-center mb-3 border-bottom pb-2"
            style={{ borderColor: "var(--bs-border)" }}
          >
            <Col md={4} sm={6} xs={12} className="mb-2">
              <strong className="text-dark">Sipariş Tarihi:</strong>
              <div className="text-muted">
                {new Date(orderData.createdAt).toLocaleString()}
              </div>
            </Col>
            <Col md={4} sm={6} xs={12} className="mb-2">
              <strong className="text-dark">Durum:</strong>
              <div>
                <Badge bg={"primaryy"} className="px-2 py-1 rounded-pill">
                  {orderData.status}
                </Badge>
              </div>
            </Col>
            <Col md={4} sm={6} xs={12} className="mb-2">
              <strong className="text-dark">Toplam Tutar:</strong>
              <div className="text-success fw-bold">
                {orderData.totalAmount}₺
              </div>
            </Col>
          </Row>

          <h5 className="mt-4 mb-3 text-primary">Ürünler</h5>
          <div className="d-flex flex-column gap-3">
            {orderData.items.map((order) => (
              <Link
                to={`/product/${order.product._id}`}
                className="text-decoration-none"
              >
                <Card
                  key={order._id}
                  className="border-0 shadow-sm"
                  style={{
                    backgroundColor: "var(--bs-card)",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <img
                      src={order.product.image}
                      alt={order.product.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid var(--bs-border)",
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="text-dark mb-1">{order.product.title}</h6>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <span className="me-2">
                          <strong>Kategori:</strong> {order.product.category}
                        </span>
                        <span className="me-2">
                          <strong>Fiyat:</strong>{" "}
                          <span className="text-success">
                            {order.product.price}₺
                          </span>
                        </span>
                        <span>
                          <strong>Adet:</strong> {order.quantity}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center gap-1"
                    >
                      <span>Detay</span>
                      <FaArrowRight size={12} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default OrderHistory;
