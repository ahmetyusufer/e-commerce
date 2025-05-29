import { Spinner } from "react-bootstrap";

function SpinerUI() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // yarı saydam beyaz zemin
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // Daha üstte olsun
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default SpinerUI;
