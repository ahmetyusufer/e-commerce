import { FaStar } from "react-icons/fa";

import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

import { useSelector, useDispatch } from "react-redux";
import {
  setComment,
  setNullAll,
  setUserName,
} from "../slices/productReviewSlice";
import { useCreateProductReview } from "../hooks/useCreateProductReview";
import SelectStar from "../../ui/SelectStar";
import ShowSelectedStar from "../../ui/ShowSelectedStar";
import { getAveragePoint } from "../../utils/ProductUtils";
import { useAddOrIncrementBasketItem } from "../../basket/hooks/useAddOrIncrementBasket";
import { useGetOrderAll } from "../../basket/subFeatures/order/hooks/useGetOrderAll";

function ProductDetails() {
  const { data: orderAll, isLoading } = useGetOrderAll();

  const addOrIncreaseBasketItem = useAddOrIncrementBasketItem();
  const dispatch = useDispatch();
  const { userName, point, comment } = useSelector(
    (state) => state.productReview
  );
  const { id: productId } = useParams();

  const { data: productData, isLoading: productLoading } =
    useProduct(productId);

  const productReview = useCreateProductReview();

  if (productLoading || isLoading) {
    return <Spinner />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    productReview.mutate({ productId, userName, point, comment });
    dispatch(setNullAll());
  }

  const averageStars = getAveragePoint(productData.reviews);

  return (
    <div className="container py-5">
      {/* Ürün Bilgileri */}
      <div className="row align-items-center g-5 mb-5">
        <div className="col-lg-4">
          <img
            src={productData.image}
            alt={productData.title}
            className="img-fluid rounded-4 shadow-sm border"
            style={{ backgroundColor: "#f9fafb", padding: "20px" }}
          />
        </div>

        <div className="col-lg-8 border-start border-3 border-muted">
          <h2 className="fw-bold mb-3">{productData.title}</h2>
          <p className="text-muted mb-2">
            Kategori: <strong>{productData.category}</strong>
          </p>
          <div className="d-flex align-items-center mb-2">
            <ShowSelectedStar point={averageStars} />
          </div>
          <h3 className="text-primary fw-bold mb-3">
            ₺{productData.price.toLocaleString("tr-TR")}
          </h3>
          {/* //eklenecek */}
          {/* <p className="text-muted mb-4">{product.description}</p> */}
          <button
            className="btn btn-lg btn-primary px-4 shadow-sm"
            onClick={() => {
              addOrIncreaseBasketItem.mutate(productData._id);
            }}
          >
            Sepete Ekle
          </button>
        </div>
      </div>

      {/* Yorumlar */}
      <div className="bg-light rounded-4 p-4 mb-5">
        <h4 className="fw-bold mb-4">Kullanıcı Yorumları</h4>
        {productData.reviews.map((review, i) => (
          <div key={i} className="border-bottom pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>{review.userName}</strong>
              <span className="text-muted">{review.date}</span>
            </div>
            <div className="text-warning mb-2">
              <ShowSelectedStar point={review.point} />
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Yorum Formu  */}
      {orderAll &&
        orderAll.some((ord) =>
          ord.items.some((item) => item.product._id === productId)
        ) && (
          <div className="p-4 bg-white shadow-sm rounded-4 border">
            <h4 className="fw-bold mb-3">Yorum Yap</h4>
            <form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center gap-5">
                <div>
                  <label className="form-label">İsim</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => dispatch(setUserName(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Puan</label>
                  <div>
                    <SelectStar />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Yorum</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => dispatch(setComment(e.target.value))}
                />
              </div>

              <button type="submit" className="btn btn-primary px-4">
                Gönder
              </button>
            </form>
          </div>
        )}
    </div>
  );
}

export default ProductDetails;
