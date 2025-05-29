import { useState } from "react";
import toast from "react-hot-toast";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDecreaseCurrent,
  setIncreaseCurrent,
} from "../../slices/orderStepperSlice";
import { setCardData } from "../../slices/cardInformationSlice"; // Kart için slice!

function UserCardsList({ getCards }) {
  const dispatch = useDispatch();

  // Redux'taki mevcut seçili kart
  const cardInformation = useSelector((state) => state.cardInformation);

  // İlk state Redux'taki seçili kartın _id'si olsun
  const [activeCardId, setActiveCardId] = useState(cardInformation._id || null);

  const getSelectedCard = () => {
    return getCards.find((crd) => crd._id === activeCardId);
  };

  return (
    <div className="mb-3">
      <div className="d-flex flex-column gap-2">
        {getCards.map((crd) => (
          <Card
            key={crd._id}
            className={`mb-2 ${
              activeCardId === crd._id ? "border border-primary border-2" : ""
            }`}
            onClick={() => setActiveCardId(crd._id)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="text-black">
              <Card.Title>{crd.cardName}</Card.Title>
              <Card.Text>
                Kart No: **** **** **** {crd.cardNumber.slice(-4)}
                <br />
                Son Kullanma Tarihi: {crd.cardLastDate}
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
              const selectedCard = getSelectedCard();
              if (selectedCard) {
                dispatch(setCardData(selectedCard));
                dispatch(setIncreaseCurrent(1));
              } else {
                toast.error("Lütfen bir kart seçin!");
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

export default UserCardsList;
