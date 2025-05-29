import { SlHeart } from "react-icons/sl";

function FavoriteHeader() {
  return (
    <div className="text-center mb-4 mt-5">
      <h1 className="text-primary display-4 fw-bold d-flex justify-content-center align-items-center gap-2">
        FAV <SlHeart className="text-danger" size={40} /> RITES
      </h1>
      <p className="text-black mt-3 fs-5">
        Favorilere eklediğin ürünleri burada bulabilirsin.
      </p>
    </div>
  );
}

export default FavoriteHeader;
