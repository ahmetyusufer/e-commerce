import React from "react";
import { Formik } from "formik";
import { useParams } from "react-router";
import { Spinner, Alert, Card } from "react-bootstrap";

import { cardInformationSchema } from "../../../basket/subFeatures/order/validations/cardInformationValidation";
import { useGetUserCardById } from "../../hooks/useGetUserCardById";
import { useUpdateUserCard } from "../../hooks/useUpdateUserCard";

function UserUpdateCard() {
  const { id: cardId } = useParams();
  const {
    data: cardData,
    isLoading: isLoadingCard,
    error: loadError,
  } = useGetUserCardById(cardId);

  const {
    mutate: updateData,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateUserCard();

  if (isLoadingCard) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (loadError) {
    return <Alert variant="danger">Kart yüklenirken hata oluştu.</Alert>;
  }

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
                Kart Bilgileri
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
                initialValues={cardData}
                validationSchema={cardInformationSchema}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => {
                  const handleBlurAndSave = (e) => {
                    handleBlur(e);
                    updateData({
                      cardId,
                      cardData: values,
                    });
                  };

                  return (
                    <form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="cardName" className="form-label">
                          Kart Adı
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          className={`form-control ${
                            errors.cardName && touched.cardName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Örneğin: Kredi Kartım"
                          value={values.cardName}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="cardNumber" className="form-label">
                          Kart Numarası
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className={`form-control ${
                            errors.cardNumber && touched.cardNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="**** **** **** 1234"
                          value={values.cardNumber}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="ccv" className="form-label">
                          CCV
                        </label>
                        <input
                          type="text"
                          id="ccv"
                          name="ccv"
                          className={`form-control ${
                            errors.ccv && touched.ccv ? "is-invalid" : ""
                          }`}
                          placeholder="123"
                          value={values.ccv}
                          onChange={handleChange}
                          onBlur={handleBlurAndSave}
                        />
                      </div>

                      <div className="col-12 col-sm-6">
                        <label htmlFor="cardLastDate" className="form-label">
                          Son Kullanma Tarihi
                        </label>
                        <input
                          type="text"
                          id="cardLastDate"
                          name="cardLastDate"
                          className={`form-control ${
                            errors.cardLastDate && touched.cardLastDate
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="MM/YY"
                          value={values.cardLastDate}
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

export default UserUpdateCard;
