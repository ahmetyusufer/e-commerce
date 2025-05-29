import { useState } from "react";
import OrderHeaderPeace from "../../../../../ui/OrderHeaderPeace";
import AddressInformationForm from "./AddressInformationForm";
import { useGetUserAddresses } from "../../../../../user/hooks/useGetUserAddresses";
import { Spinner } from "react-bootstrap";
import UserAddressesList from "./UserAddressesList";
import AddNewIndıcatorPage from "../../../../../ui/AddNewIndıcatorPage";

function AddressInformation() {
  const { data: getAddresses, isLoading } = useGetUserAddresses();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <OrderHeaderPeace
        title="Adres"
        text="Sizi daha iyi tanıyabilmemiz için adres bilgilerini giriniz."
      />

      {showForm ? (
        <div className="col-12">
          <AddressInformationForm />
        </div>
      ) : getAddresses && getAddresses.length > 0 ? (
        <>
          <div className="d-flex align-items-center gap-4 mb-3">
            <h5>Kayıtlı Adreslerim</h5>

            <AddNewIndıcatorPage
              pageName={"Adres"}
              onClick={() => setShowForm(true)}
            />
          </div>
          <UserAddressesList getAddresses={getAddresses} />
        </>
      ) : (
        <div className="col-12">
          <AddressInformationForm />
        </div>
      )}
    </>
  );
}

export default AddressInformation;
