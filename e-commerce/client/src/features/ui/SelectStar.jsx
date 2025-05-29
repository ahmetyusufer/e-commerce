import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setPoint } from "../product/slices/productReviewSlice";

function SelectStar({ count = 5 }) {
  const { point } = useSelector((state) => state.productReview);

  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(0);

  const handleClick = (index) => {
    dispatch(setPoint(index));
  };

  return (
    <div className="d-flex">
      {Array.from({ length: count }).map((_, i) => {
        const index = i + 1;
        const isFilled = hovered ? index <= hovered : index <= point;

        return (
          <span
            key={index}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleClick(index)}
          >
            {isFilled ? (
              <FaStar className="text-warning" />
            ) : (
              <FaRegStar className="text-warning" />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default SelectStar;
