import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";

function AddNewIndıcatorPage({ pageName, onClick }) {
  return (
    <Button variant="outline-primary" onClick={onClick}>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <FaPlus />
        <span>Yeni {pageName} Ekle</span>
      </div>
    </Button>
  );
}

export default AddNewIndıcatorPage;
