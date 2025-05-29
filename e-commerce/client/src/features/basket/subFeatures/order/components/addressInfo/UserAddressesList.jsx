import { useState } from "react";
import toast from "react-hot-toast";

import { Card } from "react-bootstrap";
import {
  setDecreaseCurrent,
  setIncreaseCurrent,
} from "../../slices/orderStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAddressData } from "../../slices/addressInformationSlice";

function UserAddressesList({ getAddresses }) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.addressInformation);
  const [activeAddressId, setActiveAddressId] = useState(address._id);

  // Seçili adresi bulmak için fonksiyon
  const getSelectedAddress = () => {
    return getAddresses.find((addr) => addr._id === activeAddressId);
  };

  return (
    <div className="mb-3">
      <div className="d-flex flex-column gap-2">
        {getAddresses.map((addr) => (
          <Card
            key={addr._id}
            className={`mb-2 ${
              activeAddressId === addr._id
                ? "border border-primary border-2"
                : ""
            }`}
            onClick={() => setActiveAddressId(addr._id)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="text-black">
              <Card.Title>{addr.addressName}</Card.Title>
              <Card.Text>
                {addr.street}, {addr.district}, {addr.city}, {addr.country}
                <br />
                {addr.postalCode}
                <br />
                Tel: {addr.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <div className="col-12 d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(setDecreaseCurrent(1))}
          >
            Geri
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              const selectedAddress = getSelectedAddress();
              if (selectedAddress) {
                dispatch(setAddressData(selectedAddress));
                dispatch(setIncreaseCurrent(1));
              } else {
                toast.error("Lütfen bir adres seçin!");
              }
            }}
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAddressesList;
