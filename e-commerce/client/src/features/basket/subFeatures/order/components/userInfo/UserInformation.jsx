import UserInformationForm from "./UserInformationForm";
import OrderHeaderPeace from "../../../../../ui/OrderHeaderPeace";

function UserInformation() {
  return (
    <>
      <OrderHeaderPeace
        title={"Profil"}
        text={"Kullanıcı bilgilerini gir, hesabını oluştur!"}
      />
      <UserInformationForm
        renderFooter={
          <div className="col-12 d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">
              İleri
            </button>
          </div>
        }
      />
    </>
  );
}

export default UserInformation;
