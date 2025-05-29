import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";

import { useRegister } from "../hooks/useRegister";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setPassword,
  setPasswordIsEqual,
} from "../slices/authSlice";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { registerValidation } from "../validations/registerValidation";
import { useEffect } from "react";

function Register() {
  const { name, email, password, passwordIsEqual } = useSelector(
    (state) => state.auth
  );
  const disptach = useDispatch();
  const navigate = useNavigate();
  const register = useRegister();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#4E71FF",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
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
          maxWidth: "450px",
          color: "#111827",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Kayıt Ol</h3>

        <Formik
          initialValues={{ name, email, password, passwordIsEqual }}
          validationSchema={registerValidation}
          onSubmit={(values) => {
            disptach(setName(values.name));
            disptach(setEmail(values.email));
            disptach(setPassword(values.password));
            disptach(setPasswordIsEqual(values.passwordIsEqual));

            register.mutate(
              {
                name: values.name,
                email: values.email,
                password: values.password,
              },
              {
                onSuccess: () => {
                  toast.success("Hesabın Oluşturuldu");
                  navigate("/login");
                },
                onError: (error) => {
                  toast.error(
                    error?.response?.data?.message || "Kayıt başarısız"
                  );
                },
              }
            );
          }}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label className="fw-semibold">İsim</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adınızı girin"
                  className="bg-light border border-1 rounded-2"
                  required
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <p className="text-danger text-sm mt-1">{errors.name}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="fw-semibold">Email adresi</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="E-posta girin"
                  className="bg-light border border-1 rounded-2"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <p className="text-danger text-sm mt-1">{errors.email}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="fw-semibold">Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                  className="bg-light border border-1 rounded-2"
                  required
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {touched.password && errors.password && (
                  <p className="text-danger text-sm mt-1">{errors.password}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPasswordConfirm">
                <Form.Label className="fw-semibold">Şifre Tekrar</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  className="bg-light border border-1 rounded-2"
                  required
                  name="passwordIsEqual"
                  value={values.passwordIsEqual}
                  onChange={handleChange}
                />
                {touched.passwordIsEqual && errors.passwordIsEqual && (
                  <p className="text-danger text-sm mt-1">
                    {errors.passwordIsEqual}
                  </p>
                )}
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 rounded-3 fw-semibold py-2"
                type="submit"
              >
                Kayıt Ol
              </Button>
            </Form>
          )}
        </Formik>

        <p
          className="text-center mt-4 text-muted"
          style={{ fontSize: "0.9rem" }}
        >
          Zaten bir hesabın var mı?{" "}
          <Link
            to="/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            Giriş Yap
          </Link>
        </p>
      </div>

      <style>{`
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

export default Register;
