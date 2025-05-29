import React from "react";
import { useSelector } from "react-redux";

function StepIndicator() {
  const { steps, current } = useSelector((state) => state.orderStepper);

  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className="d-flex align-items-center justify-content-center my-4">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className="d-flex align-items-center">
            <div
              className={`rounded-circle d-flex justify-content-center align-items-center border ${
                i <= current
                  ? "bg-primary text-primary"
                  : "border-secondary text-black"
              }`}
              style={{
                width: "2rem",
                height: "2rem",
                fontWeight: "bold",
                transform: i === current ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {i + 1}
            </div>
            <span
              className={`ms-2 small ${
                i === current ? "text-primary fw-semibold" : "text-muted"
              }`}
            >
              {label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className="flex-grow-1 mx-3"
              style={{
                height: "2px",
                backgroundColor: i < current ? "#0d6efd" : "#dee2e6",
                transition: "background-color 0.5s ease",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepIndicator;
