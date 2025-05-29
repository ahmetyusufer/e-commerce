import { Link } from "react-router";

function UserAccountDetails() {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
        {/* Adreslerim */}
        <div className="col-12 col-sm-6 col-lg-4">
          <Link
            to="/account/addresses"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div className="card shadow-sm border-0 account-card text-center h-100">
              <div className="card-body py-4">
                <i className="bi bi-geo-alt-fill fs-1 text-primary mb-2"></i>
                <h5 className="card-title mb-2">Adreslerim</h5>
                <p className="card-text text-muted small mb-0">
                  Kayıtlı adreslerini görüntüle ve düzenle.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Kartlarım */}
        <div className="col-12 col-sm-6 col-lg-4">
          <Link
            to="/account/cards"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <div className="card shadow-sm border-0 account-card text-center h-100">
              <div className="card-body py-4">
                <i className="bi bi-credit-card-2-front-fill fs-1 text-success mb-2"></i>
                <h5 className="card-title mb-2">Kartlarım</h5>
                <p className="card-text text-muted small mb-0">
                  Kayıtlı kartlarını görüntüle ve yönet.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Küçük stil: Hover efekti */}
      <style>{`
        .account-card {
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .account-card:hover {
          box-shadow: 0 8px 30px rgba(80,122,200,.18);
          transform: translateY(-3px) scale(1.03);
        }
      `}</style>
    </div>
  );
}

export default UserAccountDetails;
