import { Button } from "react-bootstrap";
import { SlBasket } from "react-icons/sl";

import { useBasket } from "../hooks/useBasket";
import { useClearBasket } from "../hooks/useClearBasket";

import BasketItem from "./BasketItem";
import EmptyPage from "../../ui/EmptyPage";
import { Link, Navigate } from "react-router";

function Basket() {
  const { data, isLoading, error } = useBasket();
  const clearBasket = useClearBasket();

  if (isLoading) return <p>"veriler yükleniyor..."</p>;

  const productTotal = data
    .map((item) => item.product?.price * item.quantity)
    .reduce((acc, price) => acc + price, 0);
  const shippingFee = 30;
  const grandTotal = productTotal + shippingFee;

  return (
    <div>
      <div className="container">
        {data.length === 0 ? (
          <EmptyPage page={"Sepet"} icon={SlBasket} />
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between mb-5 mt-5">
              <div className="d-flex align-items-center gap-4">
                <h2 className="fw-bold mb-0 text-dark">Sepetim</h2>
                <h5 className="text-primary mb-0">{data.length} ürün</h5>
              </div>
              {data.length > 0 && (
                <div onClick={() => clearBasket.mutate()}>
                  <p className="text-danger mb-0" role="button">
                    🗑 Tümünü Temizle
                  </p>
                </div>
              )}
            </div>

            <div className="row g-4">
              {/* Sepet Listesi */}
              <div className="col-12 col-lg-8">
                <div className="p-4 bg-white rounded-4 shadow-sm">
                  <div className="row fw-semibold  pb-2 mb-3 d-none d-md-flex text-muted">
                    <div className="col-md-6">Ürün</div>
                    <div className="col-md-2 text-center">Adet</div>
                    <div className="col-md-2 text-center">Fiyat</div>
                    <div className="col-md-2 text-center">Sil</div>
                  </div>

                  {data.map((item) => (
                    <BasketItem item={item} key={item._id} />
                  ))}
                </div>
              </div>

              {/* Sipariş Özeti */}
              <div className="col-12 col-lg-4">
                <div className="p-4 bg-white rounded-4 shadow-sm">
                  <h4 className="fw-bold mb-4 border-bottom pb-3 text-dark">
                    Sipariş Özeti
                  </h4>

                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Ürün Toplamı</span>
                    <span>₺{productTotal.toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 text-muted">
                    <span>Kargo</span>
                    <span>₺{shippingFee.toLocaleString("tr-TR")}</span>
                  </div>

                  <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                    <span className="text-dark">Genel Toplam</span>
                    <span className="text-dark">
                      ₺{grandTotal.toLocaleString("tr-TR")}
                    </span>
                  </div>

                  <Link
                    to={"/order"}
                    className="w-100 rounded-3 fw-semibold btn-primary p-2 d-flex text-center justify-content-center text-decoration-none"
                    disabled={data.length === 0}
                  >
                    Siparişi Tamamla
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Basket;
