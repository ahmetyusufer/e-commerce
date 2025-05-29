import { useNavigate } from "react-router";
import { useGetUserCard } from "../../hooks/useGetUserCard";
import { Spinner } from "react-bootstrap";

function UserAccountCards({ onEdit }) {
  const { data: userCards = [], isLoading } = useGetUserCard();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-5">
      <h3 className="text-black mb-5 ">Kayıtlı Cartlarım</h3>
      <div className="row gy-4">
        {userCards.map((card) => (
          <div
            key={card._id}
            className="col-12 col-md-6 col-lg-4"
            onClick={() => navigate(`/account/card/${card._id}`)}
          >
            <div className="card border-0 shadow-sm h-100 card-hover-effect">
              <div className="card-body border rounded-4 p-4 position-relative">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-credit-card-2-front-fill fs-3 me-2 text-success"></i>
                  <h5 className="card-title text-dark mb-0">
                    {card.cardName || "Kart Adı Yok"}
                  </h5>
                </div>
                <ul className="list-unstyled mb-3 small">
                  <li>
                    <span className="text-muted">Kart İsmi: </span>
                    <span className="fw-semibold">{card.cardName}</span>
                  </li>
                  <li>
                    <span className="text-muted">Kart Numarası: </span>
                    <span className="fw-semibold">
                      {card.cardNumber?.replace(/\d{4}(?=.)/g, "$& ")}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">CCV: </span>
                    <span className="fw-semibold">{card.ccv}</span>
                  </li>
                  <li>
                    <span className="text-muted">Son Kullanma Tarihi: </span>
                    <span className="fw-semibold">{card.cardLastDate}</span>
                  </li>
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
        ))}
        {!userCards.length && (
          <div className="col-12 text-muted text-center">
            Kayıtlı kart bulunamadı.
          </div>
        )}

        {/* Hover efekti için küçük bir stil */}
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

export default UserAccountCards;
