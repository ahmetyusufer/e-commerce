import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useDeleteBasketItem } from "../hooks/useDeleteBasketItem";
import { useAddOrIncrementBasketItem } from "../hooks/useAddOrIncrementBasket";
import { useDecrementBasketItem } from "../hooks/useDecrementBasketItem";
import { useNavigate } from "react-router";

function BasketItem({ item }) {
  const navigate = useNavigate();

  const deleteBasketItem = useDeleteBasketItem();
  const addBasket = useAddOrIncrementBasketItem();
  const decrementBasketItem = useDecrementBasketItem();

  return (
    <div className="mb-3">
      <hr className="my-3 text-muted" />

      <div
        className="row align-items-center"
        onClick={() => navigate(`/product/${item.product._id}`)}
      >
        {/* Ürün Bilgisi */}
        <div className="col-md-6 d-flex gap-3 align-items-center">
          <img
            src={item.product?.image}
            alt={item.product?.title}
            style={{ width: "70px", height: "70px", objectFit: "contain" }}
            className="bg-light p-2 rounded"
          />
          <span className="fw-medium text-dark">{item.product?.title}</span>
        </div>

        {/* Adet Kontrol */}
        <div className="col-md-2 text-center d-flex justify-content-center align-items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={(e) => {
              decrementBasketItem.mutate(item.product?._id);
              e.stopPropagation();
            }}
          >
            <FaMinus />
          </Button>
          <span className="text-dark">{item.quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={(e) => {
              addBasket.mutate(item.product?._id);
              e.stopPropagation();
            }}
          >
            <FaPlus />
          </Button>
        </div>

        {/* Fiyat */}
        <div className="col-md-2 text-center text-dark">
          ₺{(item.product?.price * item.quantity).toLocaleString("tr-TR")}
        </div>

        {/* Sil */}
        <div className="col-md-2 text-center">
          <button
            onClick={(e) => {
              deleteBasketItem.mutate(item.product?._id);
              e.stopPropagation();
            }}
            className="border-0 bg-transparent"
          >
            <FaTrash role="button" className="text-danger" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
