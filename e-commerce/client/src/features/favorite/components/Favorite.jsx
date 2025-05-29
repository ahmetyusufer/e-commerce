import FavoriteItems from "./FavoriteItems";
import { useFavorite } from "../hooks/useFavorite";
import EmptyPage from "../../ui/EmptyPage";
import FavoriteHeader from "./FavoriteHeader";

import { SlHeart } from "react-icons/sl";

function Favorite() {
  const { data, isLoading, error } = useFavorite();

  if (isLoading) {
    return <p>"yükleniyor"</p>;
  }

  return (
    <div className="text-white ">
      <div className="container">
        {/* Başlık */}

        {data?.length === 0 ? (
          <EmptyPage page={"favori"} icon={SlHeart} />
        ) : (
          <div>
            <FavoriteHeader />
            <FavoriteItems data={data} />
          </div>
        )}
        {/* İçerik */}
      </div>
    </div>
  );
}

export default Favorite;
