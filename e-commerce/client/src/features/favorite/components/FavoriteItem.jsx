import { AiOutlineClose } from "react-icons/ai";

import toast from "react-hot-toast";
import { useAddOrIncrementBasketItem } from "../../basket/hooks/useAddOrIncrementBasket";
import { useAddOrDeleteFavorite } from "../hooks/useAddOrDeleteFavorite";
import ShowSelectedStar from "../../ui/ShowSelectedStar";
import { useNavigate } from "react-router";

function FavoriteItem({ item }) {
  const navigate = useNavigate();

  const addOrdeleteFavoriteItem = useAddOrDeleteFavorite();
  const addOrIncremenetBasket = useAddOrIncrementBasketItem();
  return (
    <div
      className="d-flex align-items-center p-4 bg-white text-dark rounded-4 shadow-sm border border-light"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      {/* Resim */}
      <div
        style={{ width: "160px", height: "160px", flexShrink: 0 }}
        className="me-4"
      >
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid rounded-3 h-100 w-100 object-fit-contain bg-light p-2"
        />
      </div>

      {/* Yazılar */}
      <div className="flex-grow-">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="mb-0 text-primary">{item.title}</h5>
            <ShowSelectedStar
              point={
                item.reviews.length === 0
                  ? 0
                  : item.reviews.reduce((sum, r) => sum + r.point, 0) /
                    item.reviews.length
              }
            />
          </div>
          <button
            onClick={(e) => {
              addOrdeleteFavoriteItem.mutate(item._id);
              e.stopPropagation();
            }}
            className="bg-transparent border-0"
          >
            <AiOutlineClose size={22} className="text-danger" />
          </button>
        </div>
        <p className="mb-1 fw-semibold">
          ₺{item.price.toLocaleString("tr-TR")}
        </p>

        <button
          className="btn btn-sm btn-outline-primary mt-2"
          onClick={(e) => {
            addOrIncremenetBasket.mutate(item._id);
            toast.success("Ürün Sepete Eklendi");
            e.stopPropagation();
          }}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
