import { Dropdown } from "react-bootstrap";
import { useSearchParams } from "react-router";

function FilterCategoryDropdown({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("category") || "Tümü";

  function handleSelect(category) {
    const slug = category.toLowerCase().replaceAll(" ", "-");
    if (category === "Tümü") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-primary" id="category-dropdown">
        {current}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((cat) => (
          <Dropdown.Item eventKey={cat} key={cat}>
            {cat}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterCategoryDropdown;
