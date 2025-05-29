import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  setDecreaseCurrent,
  setIncreaseCurrent,
} from "../../slices/orderStepperSlice";
import { cardInformationSchema } from "../../validations/cardInformationValidation";
import { setCardData } from "../../slices/cardInformationSlice";

function CardInformationForm() {
  const dispatch = useDispatch();
  const cardData = useSelector((state) => state.cardInformation);

  return (
    <Formik
      initialValues={cardData}
      validationSchema={cardInformationSchema}
      onSubmit={(values) => {
        dispatch(setCardData(values));
        dispatch(setIncreaseCurrent(1));
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
      }) => {
        return (
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Kart Üzerindeki İsim */}
            <div className="col-12">
              <label htmlFor="cardName" className="form-label">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                className={`form-control${
                  touched.cardName && errors.cardName ? " is-invalid" : ""
                }`}
                placeholder="Örneğin: MEHMET YILMAZ"
                value={values.cardName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.cardName && errors.cardName && (
                <div className="invalid-feedback">{errors.cardName}</div>
              )}
            </div>

            {/* Kart Numarası */}
            <div className="col-12 col-sm-6">
              <label htmlFor="cardNumber" className="form-label">
                Kart Numarası
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className={`form-control${
                  touched.cardNumber && errors.cardNumber ? " is-invalid" : ""
                }`}
                placeholder="0000 0000 0000 0000"
                value={values.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.cardNumber && errors.cardNumber && (
                <div className="invalid-feedback">{errors.cardNumber}</div>
              )}
            </div>

            {/* CCV */}
            <div className="col-12 col-sm-6">
              <label htmlFor="ccv" className="form-label">
                CCV
              </label>
              <input
                type="text"
                id="ccv"
                name="ccv"
                className={`form-control${
                  touched.ccv && errors.ccv ? " is-invalid" : ""
                }`}
                placeholder="123"
                value={values.ccv}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.ccv && errors.ccv && (
                <div className="invalid-feedback">{errors.ccv}</div>
              )}
            </div>

            {/* Kart Son Kullanma Tarihi */}
            <div className="col-12 col-sm-6">
              <label htmlFor="cardLastDate" className="form-label">
                Kart Son Kullanma Tarihi
              </label>
              <input
                type="text"
                id="cardLastDate"
                name="cardLastDate"
                className={`form-control${
                  touched.cardLastDate && errors.cardLastDate
                    ? " is-invalid"
                    : ""
                }`}
                placeholder="AA/YY (ör: 12/24)"
                value={values.cardLastDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.cardLastDate && errors.cardLastDate && (
                <div className="invalid-feedback">{errors.cardLastDate}</div>
              )}
            </div>

            {/* Butonlar */}
            <div className="col-12 d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => dispatch(setDecreaseCurrent(1))}
              >
                Geri
              </button>
              <button type="submit" className="btn btn-primary">
                İleri
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default CardInformationForm;
