import Product from "../product/components/Product";
import QuickFilter from "./filter/FilterCategory";

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(/images/e-commerce_main_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f8fafc", // açık gri arka plan
        minHeight: "100vh",
        paddingTop: "60px",
      }}
    >
      <div className="container pb-5">
        <div className="row align-items-center mb-5">
          {/* Sol Kısım */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-3 fw-bold text-dark">
              DISCOVER <br />
              THE <span className="bg-muted text-white">FUTURE</span>
            </h1>
            <p className="lead text-muted">
              Shop the latest and greatest in technology.
            </p>
            <button className="btn btn-primary px-4 py-2 fw-semibold">
              Shop Now
            </button>
          </div>

          {/* Sağ Kısım */}
          <div className="col-lg-6 d-flex justify-content-center">
            <img
              src="/images/e-commerce_c_laptop.png"
              alt="Headphones"
              style={{
                height: "500px",
                width: "auto",
                objectFit: "cover",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <Product />
    </div>
  );
}

export default HomePage;
