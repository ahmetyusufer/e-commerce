import { useNavigate } from "react-router";
import { Spinner } from "react-bootstrap";
import { useGetUserAddresses } from "../../hooks/useGetUserAddresses";

function UserAccountAddresses({ onEdit }) {
  const { data: userAddress = [], isLoading } = useGetUserAddresses();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  // Null ya da geçersiz adresleri filtrele
  const validAddresses = userAddress.filter((addr) => addr && addr._id);

  return (
    <div className="container mt-5">
      <h3 className="text-black mb-5">Kayıtlı Adreslerim</h3>

      <div className="row gy-4">
        {validAddresses.length > 0 ? (
          validAddresses.map((address) => (
            <div
              key={address._id}
              className="col-12 col-md-6 col-lg-4"
              onClick={() => navigate(`/account/address/${address._id}`)}
            >
              <div className="card border-0 shadow-sm h-100 card-hover-effect">
                <div className="card-body border rounded-4 p-4 position-relative">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-geo-alt-fill fs-4 me-2 text-danger"></i>
                    <h5 className="card-title text-dark mb-0">
                      {address.addressName || "Adres Adı Yok"}
                    </h5>
                  </div>
                  <ul className="list-unstyled mb-3 small">
                    <li>
                      <span className="text-muted">Cadde / Sokak:</span>{" "}
                      <span className="fw-semibold">{address.street}</span>
                    </li>
                    <li>
                      <span className="text-muted">Ülke:</span>{" "}
                      <span className="fw-semibold">{address.country}</span>
                    </li>
                    <li>
                      <span className="text-muted">Şehir:</span>{" "}
                      <span className="fw-semibold">{address.city}</span>
                    </li>
                    <li>
                      <span className="text-muted">İlçe:</span>{" "}
                      <span className="fw-semibold">{address.district}</span>
                    </li>
                    <li>
                      <span className="text-muted">Posta Kodu:</span>{" "}
                      <span className="fw-semibold">{address.postalCode}</span>
                    </li>
                    {address.phone && (
                      <li>
                        <span className="text-muted">Telefon:</span>{" "}
                        <span className="fw-semibold">{address.phone}</span>
                      </li>
                    )}
                  </ul>
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill position-absolute"
                    style={{ top: 16, right: 16 }}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-muted text-center">
            Kayıtlı adres bulunamadı.
          </div>
        )}

        <style>{`
         .card-hover-effect {
           transition: box-shadow .2s, transform .2s;
         }
         .card-hover-effect:hover {
           box-shadow: 0 12px 32px 0 rgba(60,100,200,.14);
           transform: translateY(-3px) scale(1.03);
         }
       `}</style>
      </div>
    </div>
  );
}

export default UserAccountAddresses;
