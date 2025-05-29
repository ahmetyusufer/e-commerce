import { useState } from "react";
import AddressInformationForm from "../addressInfo/AddressInformationForm";
import OrderHeaderPeace from "../../../../../ui/OrderHeaderPeace";
import CardInformationForm from "./CardInformationForm";
import UserCardsList from "./UserCardsList";
import AddNewIndıcatorPage from "../../../../../ui/AddNewIndıcatorPage";
import { useGetUserCard } from "../../../../../user/hooks/useGetUserCard";
import { Spinner } from "react-bootstrap";

function CardInformation() {
  const { data: getCards, isLoading } = useGetUserCard();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <OrderHeaderPeace
        title="Cart"
        text="Alışverişinizi tamamlamak için kart bilgilerinizi giriniz."
      />

      {showForm ? (
        <div className="col-12">
          <CardInformationForm />
        </div>
      ) : getCards && getCards.length > 0 ? (
        <>
          <div className="d-flex align-items-center gap-4 mb-3">
            <h5>Kayıtlı Adreslerim</h5>

            <AddNewIndıcatorPage
              pageName={"Cart"}
              onClick={() => setShowForm(true)}
            />
          </div>
          <UserCardsList getCards={getCards} />
        </>
      ) : (
        <div className="col-12">
          <CardInformationForm />
        </div>
      )}
    </>
  );
}

export default CardInformation;
