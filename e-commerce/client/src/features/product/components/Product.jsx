import { useSearchParams } from "react-router";
import { useProducts } from "../hooks/useProducts";

import ProductItem from "./ProductItem";
import FilterCategory from "../../home/filter/FilterCategory";
import SortProduct from "../../home/sort/SortProduct";
import { getAveragePoint } from "../../utils/ProductUtils";

function Product() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");

  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error.message}</p>;

  var filteredProduct = [...data];

  if (category && category !== "all") {
    filteredProduct = data.filter(
      (item) => item.category.toLowerCase() === category
    );
  }

  if (sort === "price-asc") {
    filteredProduct.sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    filteredProduct.sort((a, b) => b.price - a.price);
  }

  if (sort === "star-asc") {
    filteredProduct.sort(
      (a, b) => getAveragePoint(a.reviews) - getAveragePoint(b.reviews)
    );
  }
  if (sort === "star-desc") {
    filteredProduct.sort(
      (a, b) => getAveragePoint(b.reviews) - getAveragePoint(a.reviews)
    );
  }

  return (
    <div
      className="text-dark min-vh-100 py-5"
      style={{ backgroundColor: "var(--bs-bg)" }}
    >
      <div className="container">
        <div className="d-flex  gap-4">
          <h1 className="text-dark mb-4 fw-bold">Ürünler</h1>
          <FilterCategory />
          <SortProduct />
        </div>

        <div className="row g-4">
          {filteredProduct.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
