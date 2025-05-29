import { Formik } from "formik";
import { Country, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";

import { addressInformationSchema } from "../../validations/addressInformationValidation";
import { setAddressData } from "../../slices/addressInformationSlice";
import {
  setDecreaseCurrent,
  setIncreaseCurrent,
} from "../../slices/orderStepperSlice";

function AddressInformationForm() {
  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.addressInformation);

  const countryOptions = Country.getAllCountries()
    .map((c) => ({ value: c.isoCode, label: c.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Formik
      enableReinitialize
      initialValues={addressData}
      validationSchema={addressInformationSchema}
      onSubmit={(values) => {
        dispatch(setAddressData(values));
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
        setFieldValue,
      }) => {
        const rawCities = values.country
          ? City.getCitiesOfCountry(values.country).sort((a, b) =>
              a.name.localeCompare(b.name)
            )
          : [];

        return (
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Adres Adı */}
            <div className="col-12 col-sm-6">
              <label htmlFor="addressName" className="form-label">
                Adres Adı
              </label>
              <input
                type="text"
                id="addressName"
                name="addressName"
                className={`form-control${
                  touched.addressName && errors.addressName ? " is-invalid" : ""
                }`}
                placeholder="ev, iş yeri"
                value={values.addressName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.addressName && errors.addressName && (
                <div className="invalid-feedback">{errors.addressName}</div>
              )}
            </div>

            {/* Cadde / Sokak */}
            <div className="col-12">
              <label htmlFor="street" className="form-label">
                Cadde / Sokak
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className={`form-control${
                  touched.street && errors.street ? " is-invalid" : ""
                }`}
                placeholder="Örneğin: Atatürk Cd. No:10"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.street && errors.street && (
                <div className="invalid-feedback">{errors.street}</div>
              )}
            </div>

            {/* Ülke */}
            <div className="col-12 col-sm-6">
              <label htmlFor="country" className="form-label">
                Ülke
              </label>
              <select
                id="country"
                name="country"
                className={`form-select${
                  touched.country && errors.country ? " is-invalid" : ""
                }`}
                value={values.country}
                onChange={(e) => {
                  setFieldValue("country", e.target.value);
                  setFieldValue("city", "");
                }}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Ülke seçin
                </option>
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {touched.country && errors.country && (
                <div className="invalid-feedback">{errors.country}</div>
              )}
            </div>

            {/* Şehir */}
            <div className="col-12 col-sm-6">
              <label htmlFor="city" className="form-label">
                Şehir
              </label>
              <select
                id="city"
                name="city"
                className={`form-select${
                  touched.city && errors.city ? " is-invalid" : ""
                }`}
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!values.country}
              >
                <option value="" disabled>
                  {values.country ? "Şehir seçin" : "Önce ülke seçin"}
                </option>
                {rawCities.map((c) => (
                  <option key={`${c.name}-${c.stateCode}`} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {touched.city && errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            {/* İlçe */}
            <div className="col-12 col-sm-6">
              <label htmlFor="district" className="form-label">
                İlçe
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className={`form-control${
                  touched.district && errors.district ? " is-invalid" : ""
                }`}
                placeholder="İlçe"
                value={values.district}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.district && errors.district && (
                <div className="invalid-feedback">{errors.district}</div>
              )}
            </div>

            {/* Posta Kodu */}
            <div className="col-12 col-sm-6">
              <label htmlFor="postalCode" className="form-label">
                Posta Kodu
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className={`form-control${
                  touched.postalCode && errors.postalCode ? " is-invalid" : ""
                }`}
                placeholder="01000"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.postalCode && errors.postalCode && (
                <div className="invalid-feedback">{errors.postalCode}</div>
              )}
            </div>

            {/* Footer */}
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

export default AddressInformationForm;
