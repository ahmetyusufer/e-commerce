import { object, string } from "yup";

const nameRegex = /^[A-Za-zŞşİıÖöÇçĞğÜü\s]+$/;

export let addressInformationSchema = object({
  addressName: string().required("Adresinize bir isim vermeniz gerekmektedir."),
  street: string().required("İkamet Ettiğiniz  girmeniz gerekmektedir."),
  city: string().required("İkamet Ettiğiniz  Şehri Girmeniz Gerekmektedir."),
  district: string()
    .required("İkamet Ettiğiniz İlçeyi Girmeniz Gerekmektedir.")
    .matches(nameRegex, "Lütfen Geçerli Bir ilçe Girin"),
  postalCode: string()
    .required("İkamet Ettiğiniz  Şehrin Posta Kodunu Girmeniz Gerekmektedir.")
    .matches(/^\d{5}$/, "Posta Kodu 5 haneli olmalıdır."),
  country: string().required("Yaşadığınız Ülkeyi giriniz."),
});
