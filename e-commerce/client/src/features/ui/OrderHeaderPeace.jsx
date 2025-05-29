import { useSelector } from "react-redux";

function OrderHeaderPeace({ title, text }) {
  const { current } = useSelector((state) => state.orderStepper);

  return (
    <div className="d-flex flex-column align-items-center mb-4 text-center">
      <h4 className="text-primary fw-semibold small mb-1 opacity-75">
        Adım {current + 1}
      </h4>
      <h1 className="fs-4 text-primary fw-bold mb-2">{title} Bilgilerin</h1>
      <p className="text-muted">{text}</p>
    </div>
  );
}

export default OrderHeaderPeace;
