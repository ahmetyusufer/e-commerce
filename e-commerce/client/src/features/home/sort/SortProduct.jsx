import Dropdown from "react-bootstrap/Dropdown";
import { useSearchParams } from "react-router";

function SortProduct() {
  const [searchParams, setSearchparams] = useSearchParams();
  const sort = searchParams.get("sort");

  function handleClick(order) {
    searchParams.set("sort", order);
    setSearchparams(searchParams);
  }

  function getSortLabel(sort) {
    switch (sort) {
      case "price-asc":
        return "fiayata göre artan";

      case "price-desc":
        return "fiayata göre azalan";

      case "star-asc":
        return "Puana göre Artan";

      case "star-desc":
        return "Puana göre Azalan";
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="category-dropdown">
        {getSortLabel(sort)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleClick("price-asc")}>
          fiayata göre artan
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleClick("price-desc")}>
          fiayata göre azalan
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleClick("star-asc")}>
          Puana göre Artan
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleClick("star-desc")}>
          Puana göre Azalan
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortProduct;
