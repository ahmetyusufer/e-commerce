import { useNavigate } from "react-router";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

import { SlHeart } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

import { useAddOrDeleteFavorite } from "../../favorite/hooks/useAddOrDeleteFavorite";
import { useAddOrIncrementBasketItem } from "../../basket/hooks/useAddOrIncrementBasket";
import { useDecrementBasketItem } from "../../basket/hooks/useDecrementBasketItem";
import { useDeleteBasketItem } from "../../basket/hooks/useDeleteBasketItem";

import { useFavorite } from "../../favorite/hooks/useFavorite";
import { useBasket } from "../../basket/hooks/useBasket";
import SpinnerUI from "../../ui/SpinnerUI";
import ShowSelectedStar from "../../ui/ShowSelectedStar";

function ProductItem({ item }) {
  const favoriteMutation = useAddOrDeleteFavorite();
  const addOrIncreaseBasketItem = useAddOrIncrementBasketItem();
  const decrementBasketItem = useDecrementBasketItem();
  const deleteBasketItem = useDeleteBasketItem();

  const { data: favoriteData, isLoading: favoriteLoading } = useFavorite();
  const { data: basketData, isLoading: basketLoading } = useBasket();

  const navigate = useNavigate();

  if (favoriteLoading || basketLoading) {
    return <SpinnerUI />;
  }

  const basketItem =
    Array.isArray(basketData) &&
    item &&
    basketData.find(
      (basket) => basket.product && basket.product._id === item._id
    );

  return (
    <div
      onClick={() => navigate(`/product/${item._id}`)}
      className="bg-white shadow-sm rounded-4 p-3 h-100 d-flex flex-column justify-content-between position-relative"
      style={{
        border: "1px solid var(--bs-border)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <button
        className="position-absolute p-1 border-0 bg-transparent"
        style={{ top: "12px", right: "16px" }}
        onClick={(e) => {
          e.stopPropagation();
          favoriteMutation.mutate(item._id);
        }}
      >
        {Array.isArray(favoriteData) &&
        favoriteData.find((fav) => fav._id === item._id) ? (
          <FaHeart size={23} className="text-danger" />
        ) : (
          <SlHeart size={23} className="text-danger" />
        )}
      </button>
      <div
        className="rounded-3 d-flex align-items-center justify-content-center mb-3"
        style={{ height: "180px", backgroundColor: "var(--bs-hover)" }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid"
          style={{ maxHeight: "140px", objectFit: "contain" }}
        />
      </div>
      <div className="text-center mb-2">
        <h5 className="text-dark fs-6 fw-bold">{item.title}</h5>
        <p className="text-muted fw-semibold fs-6">
          ₺{item.price.toLocaleString("tr-TR")}
        </p>
      </div>
      <div className="text-center mb-3 text-warning fs-6 d-flex justify-content-center gap-1">
        {
          <ShowSelectedStar
            point={
              item.reviews.length === 0
                ? 0
                : item.reviews.reduce((sum, r) => sum + r.point, 0) /
                  item.reviews.length
            }
          />
        }
      </div>

      {basketItem ? (
        <div className="btn btn-outline-primary w-100 rounded-3 mt-auto no-hover">
          <div className="d-flex justify-content-between align-items-center text-primary">
            {basketItem.quantity === 1 ? (
              <span
                className="btn-iod px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBasketItem.mutate(item._id);
                }}
              >
                <FaTrash />
              </span>
            ) : (
              <span
                className="btn-iod px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  decrementBasketItem.mutate(item._id);
                }}
              >
                <FaMinus />
              </span>
            )}
            <span className="">{basketItem.quantity} adet</span>
            <span
              className="btn-iod px-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                addOrIncreaseBasketItem.mutate(item._id);
              }}
            >
              <FaPlus />
            </span>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-outline-primary w-100 rounded-3 mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            addOrIncreaseBasketItem.mutate(item._id);
          }}
        >
          Sepete Ekle
        </button>
      )}
    </div>
  );
}

export default ProductItem;
