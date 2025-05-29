import { useSelector, useDispatch } from "react-redux";
import { setDecreaseCurrent } from "../slices/orderStepperSlice";
import OrderHeaderPeace from "../../../../ui/OrderHeaderPeace";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useSetUserAddress } from "../../../../user/hooks/useSetUserAddress";
import { useSetUserCard } from "../../../../user/hooks/useSetUserCard";

function Approve() {
  const createOrder = useCreateOrder();
  const userAdress = useSetUserAddress();
  const userCard = useSetUserCard();

  const dispatch = useDispatch();
  const { firstName, lastName, email, phone } = useSelector(
    (state) => state.userInformation
  );
  const { addressName, street, city, district, postalCode, country } =
    useSelector((state) => state.addressInformation);
  const { cardName, cardNumber, ccv, cardLastDate } = useSelector(
    (state) => state.cardInformation
  );

  return (
    <>
      {/* Başlık */}
      <OrderHeaderPeace
        title="Sipariş Özeti"
        text="Bilgilerinizi kontrol edip siparişi tamamlayın"
      />

      {/* Kartlar Düzeni */}
      <div className="row gy-4 mb-5">
        {/* Kullanıcı Bilgileri */}
        <div className="col-12 col-md-6">
          <div className="card h-100 bg-white shadow-sm border-1 border-primary">
            <div className="card-body">
              <h5 className="card-title  mb-3  fw-bold text-muted">
                Kullanıcı Bilgileri
              </h5>
              <ul className="list-unstyled mb-0 text-muted">
                <li>
                  <strong>Ad:</strong> {firstName}
                </li>
                <li>
                  <strong>Soyad:</strong> {lastName}
                </li>
                <li>
                  <strong>E-posta:</strong> {email}
                </li>
                <li>
                  <strong>Telefon:</strong> {phone}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Adres Bilgileri */}
        <div className="col-12 col-md-6">
          <div className="card h-100 bg-white shadow-sm border-1 border-primary">
            <div className="card-body">
              <h5 className="card-title text-muted fw-bold mb-3">
                Adres Bilgileri
              </h5>
              <ul className="list-unstyled mb-0  text-muted">
                <li>
                  <strong>Adres Adı:</strong> {addressName}
                </li>
                <li>
                  <strong>Cadde / Sokak:</strong> {street}
                </li>
                <li>
                  <strong>Şehir:</strong> {city}
                </li>
                <li>
                  <strong>İlçe:</strong> {district}
                </li>
                <li>
                  <strong>Posta Kodu:</strong> {postalCode}
                </li>
                <li>
                  <strong>Ülke:</strong> {country}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kart Bilgileri */}
        <div className="col-12">
          <div className="card h-100 bg-white shadow-sm border-1 border-primary">
            <div className="card-body">
              <h5 className="card-title text-muted fw-bold mb-3">
                Kart Bilgileri
              </h5>
              <ul className="list-unstyled mb-0  text-muted">
                <li>
                  <strong>Kart Üzerindeki İsim:</strong> {cardName}
                </li>
                <li>
                  <strong>Kart Numarası:</strong> {cardNumber}
                </li>
                <li>
                  <strong>CCV:</strong> {ccv}
                </li>
                <li>
                  <strong>Son Kullanma Tarihi:</strong> {cardLastDate}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*  Butonlar */}
      <div className="col-12 d-flex justify-content-end gap-2 mt-4 mb-5">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch(setDecreaseCurrent(1))}
        >
          Geri
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            userCard.mutate({ cardName, cardNumber, ccv, cardLastDate });
            userAdress.mutate({
              addressName,
              phone,
              country,
              city,
              district,
              street,
              postalCode,
            });
            createOrder.mutate({
              phone,
              country,
              city,
              district,
              street,
              postalCode,
              cardName,
              cardNumber,
              ccv,
              cardLastDate,
            });
          }}
        >
          Siparişi Tamamla
        </button>
      </div>
    </>
  );
}

export default Approve;
