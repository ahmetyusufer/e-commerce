import { Spinner } from "react-bootstrap";
import { useProducts } from "../../product/hooks/useProducts";
import FilterCategoryDropdown from "./FilterCategoryDropdown";

function FilterCategory() {
  const { data: productData, isLoading } = useProducts();

  if (isLoading) return <Spinner />;

  const categories = [
    "Tümü",
    ...new Set(productData.map((product) => product.category)),
  ];

  return <FilterCategoryDropdown categories={categories} />;
}

export default FilterCategory;
