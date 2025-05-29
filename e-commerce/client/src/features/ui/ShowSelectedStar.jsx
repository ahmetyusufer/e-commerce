import { FaStar, FaRegStar } from "react-icons/fa";

function ShowSelectedStar({ count = 5, point }) {
  return (
    <div className="d-flex">
      {Array.from({ length: count }).map((_, i) => {
        const index = i + 1;
        const isFilled = index <= point;

        return (
          <span
            key={index}
            style={{ fontSize: "1.5rem", color: "#ffc107" }} // text-warning yerine direkt renk
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </span>
        );
      })}
    </div>
  );
}

export default ShowSelectedStar;
