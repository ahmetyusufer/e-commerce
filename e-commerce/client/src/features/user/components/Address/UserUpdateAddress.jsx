import React from "react";
import { Formik } from "formik";
import { Country, City } from "country-state-city";
import { useParams } from "react-router";
import { Spinner, Alert, Card } from "react-bootstrap";

import { useGetUserAddressById } from "../../hooks/useGetUserAdressById";
import { useUpdateUserAddress } from "../../hooks/useUpdateUserAddress";
import { addressInformationSchema } from "../../../basket/subFeatures/order/validations/addressInformationValidation";

function UserUpdateAddress() {
  const { id: addressId } = useParams();
  const {
    data: addressData,
    isLoading: isLoadingAddress,
    error: loadError,
  } = useGetUserAddressById(addressId);
  const {
    mutate: updateData,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateUserAddress();

  if (isLoadingAddress) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }
  if (loadError) {
    return <Alert variant="danger">Adres yüklenirken hata oluştu.</Alert>;
  }

  const countryOptions = Country.getAllCountries()
    .map((c) => ({ value: c.isoCode, label: c.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <Card className="shadow-sm border-0 p-4">
            <Card.Body>
              <h5 className="mb-4 text-primary fw-bold text-center">
                Adres Bilgileri
              </h5>

              {isUpdating && (
                <div className="mb-3 text-center small text-muted">
                  <Spinner animation="grow" size="sm" /> Kaydediliyor...
                </div>
              )}
              {updateError && (
                <Alert variant="danger">
                  Güncelleme sırasında hata: {updateError.message}
                </Alert>
              )}

              <Formik
                enableReinitialize
                initialValues={addressData}
                validationSchema={addressInformationSchema}
                onSubmit={() => {
                  // Otomatik kaydedildiği için submit yok
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  errors,
                  touched,
                }) => {
                  const rawCities = values.country
                    ? City.getCitiesOfCountry(values.country).sort((a, b) =>
                        a.name.localeCompare(b.name)
                      )
                    : [];

                  const handleBlurAndSave = (e) => {
                    handleBlur(e);
                    updateData({
                      addressId,
                      addressData: values,
                    });
                  };

                  return (
                    <form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="addressName" className="form-label">
                          Adres Adı
                        </label>
                        <input
                          type="text"
                          id="addressName"
                          name="addressName"
                          className={`form-control ${
                            errors.addressName && touched.addressName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="ev, iş yeri"
                          value={values.addressName}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="street" className="form-label">
                          Cadde / Sokak
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          className={`form-control ${
                            errors.street && touched.street ? "is-invalid" : ""
                          }`}
                          placeholder="Örneğin: Atatürk Cd. No:10"
                          value={values.street}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="country" className="form-label">
                          Ülke
                        </label>
                        <select
                          id="country"
                          name="country"
                          className="form-select"
                          value={values.country}
                          onChange={(e) => {
                            setFieldValue("country", e.target.value);
                            setFieldValue("city", "");
                          }}
                          onBlur={handleBlurAndSave}
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
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="city" className="form-label">
                          Şehir
                        </label>
                        <select
                          id="city"
                          name="city"
                          className="form-select"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                          disabled={!values.country}
                        >
                          <option value="" disabled>
                            {values.country ? "Şehir seçin" : "Önce ülke seçin"}
                          </option>
                          {rawCities.map((c) => (
                            <option
                              key={`${c.name}-${c.stateCode}`}
                              value={c.name}
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="district" className="form-label">
                          İlçe
                        </label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          className="form-control"
                          placeholder="İlçe"
                          value={values.district}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="postalCode" className="form-label">
                          Posta Kodu
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          className="form-control"
                          placeholder="01000"
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserUpdateAddress;
