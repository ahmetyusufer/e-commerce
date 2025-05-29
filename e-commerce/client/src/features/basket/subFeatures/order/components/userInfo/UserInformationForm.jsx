import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../slices/userInformationSlice";
import { setIncreaseCurrent } from "../../slices/orderStepperSlice";
import { userInformationSchema } from "../../validations/userInformationValidation";
import { useGetCurrentUser } from "../../../../../user/hooks/useGetCurrentUser";
import SpinnerUI from "../../../../../ui/SpinnerUI";

function UserInformationForm({ renderFooter }) {
  const { data: userDefaultDB, isLoading } = useGetCurrentUser();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInformation);

  if (isLoading) {
    return <SpinnerUI />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userDefaultDB.email || "",
        phone: userData.phone || "",
      }}
      validationSchema={userInformationSchema}
      onSubmit={(values) => {
        dispatch(setUserData(values));
        dispatch(setIncreaseCurrent(1));
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="row g-3">
          {/* İsim */}
          <div className="col-12 col-sm-6">
            <label htmlFor="firstName" className="form-label">
              İsim
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`form-control${
                touched.firstName && errors.firstName ? " is-invalid" : ""
              }`}
              placeholder="Adınız"
              value={values.firstName}
              onChange={handleChange}
            />
            {touched.firstName && errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          {/* Soy İsim */}
          <div className="col-12 col-sm-6">
            <label htmlFor="lastName" className="form-label">
              Soy İsim
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`form-control${
                touched.lastName && errors.lastName ? " is-invalid" : ""
              }`}
              placeholder="Soyadınız"
              value={values.lastName}
              onChange={handleChange}
            />
            {touched.lastName && errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          {/* E-mail */}
          <div className="col-12 col-sm-6">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={values.email}
              disabled
            />
          </div>

          {/* Telefon */}
          <div className="col-12 col-sm-6">
            <label htmlFor="phone" className="form-label">
              Telefon Numarası
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-control${
                touched.phone && errors.phone ? " is-invalid" : ""
              }`}
              placeholder="(555) 012-3456"
              value={values.phone}
              onChange={handleChange}
            />
            {touched.phone && errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* Buton */}
          {renderFooter}
        </form>
      )}
    </Formik>
  );
}

export default UserInformationForm;
