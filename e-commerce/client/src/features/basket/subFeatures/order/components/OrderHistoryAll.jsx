import { useGetOrderAll } from "../hooks/useGetOrderAll";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router"; // ✅ Doğru router import
import { FaArrowRight } from "react-icons/fa";

function OrderHistoryAll() {
  const { data: allOrders, isLoading } = useGetOrderAll();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Tüm Siparişler</h2>

      <div className="d-flex flex-column gap-3">
        {allOrders.map((order) => (
          <Card
            key={order._id}
            className="shadow-sm border-0"
            style={{
              borderRadius: "15px",
              backgroundColor: "var(--bs-card)",
              overflow: "hidden",
            }}
          >
            <Link to={`/order/${order._id}`} className="text-decoration-none">
              <div className="d-flex flex-wrap align-items-center p-3">
                {/* Ürün küçük resmi */}
                <div
                  className="d-flex align-items-center mb-2"
                  style={{ overflowX: "auto" }}
                >
                  {order.items.map((item) => (
                    <img
                      key={item._id}
                      src={item.product?.image}
                      alt={item.product?.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid var(--bs-border)",
                        marginRight: "8px",
                      }}
                    />
                  ))}
                </div>

                {/* Orta kısım: Tarih ve status */}
                <div className="flex-grow-1">
                  <div
                    className="text-muted mb-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div
                    className={`badge bg-primaryy`}
                    style={{
                      fontSize: "0.75rem",
                      padding: "5px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Sağ kısım: Toplam tutar ve buton */}
                <div className="d-flex align-items-center gap-3 ms-auto">
                  <div className="text-success fw-bold fs-5">
                    {order.totalAmount.toFixed(2)}₺
                  </div>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center gap-1"
                  >
                    <span>Detay</span>
                    <FaArrowRight size={12} />
                  </Button>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default OrderHistoryAll;
