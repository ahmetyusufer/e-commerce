import FavoriteItem from "./FavoriteItem";
import { useClearFavorite } from "../hooks/useClearFavorite";

function FavoriteItems({ data }) {
  const clearFavorite = useClearFavorite();

  return (
    <div className="row g-4">
      <div className="d-flex justify-content-end align-items-end">
        <button
          className="btn btn-sm btn-outline-secondary m-2 p-2"
          onClick={() => clearFavorite.mutate()}
        >
          Tümünü sil
        </button>
      </div>

      {data.map((item, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <FavoriteItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default FavoriteItems;
