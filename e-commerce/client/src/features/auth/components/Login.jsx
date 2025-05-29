import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { Formik } from "formik";
import toast from "react-hot-toast";

import { useLogin } from "../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../slices/authSlice";
import { loginValidation } from "../validations/loginValidation";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { email, password } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const login = useLogin();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        backgroundColor: "#4E71FF",
        position: "relative",
      }}
    >
      <div className="custom-shape-divider-top-1747764920">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "400px",
          color: "#111827",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Giriş Yap</h3>

        <Formik
          initialValues={{ email, password }}
          validationSchema={loginValidation}
          onSubmit={(values) => {
            dispatch(setEmail(values.email));
            dispatch(setPassword(values.password));

            login.mutate(
              { email: values.email, password: values.password },
              {
                onSuccess: () => {
                  toast.success("Giriş Yapıldı");
                  navigate(from, { replace: true });
                },
                onError: () => {
                  toast.error("Giriş sırasında hata oluştu.");
                },
              }
            );
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="fw-semibold">Email Adresi</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="E-posta giriniz"
                  className="bg-light border border-1 rounded-2"
                  autoComplete="email"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <p className="text-danger text-sm mt-1">{errors.email}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label className="fw-semibold">Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi giriniz"
                  className="bg-light border border-1 rounded-2"
                  autoComplete="current-password"
                  required
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {touched.password && errors.password && (
                  <p className="text-danger text-sm mt-1">{errors.password}</p>
                )}
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 rounded-3 fw-semibold py-2"
              >
                Giriş Yap
              </Button>
            </Form>
          )}
        </Formik>

        <p
          className="text-center mt-4 text-muted"
          style={{ fontSize: "0.9rem" }}
        >
          Hesabınız yok mu?{" "}
          <Link
            to="/register"
            className="text-primary fw-semibold text-decoration-none"
          >
            Kayıt Ol
          </Link>
        </p>
      </div>

      <style jsx>{`
        .custom-shape-divider-top-1747764920 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .custom-shape-divider-top-1747764920 svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 185px;
        }

        .custom-shape-divider-top-1747764920 .shape-fill {
          fill: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default Login;
