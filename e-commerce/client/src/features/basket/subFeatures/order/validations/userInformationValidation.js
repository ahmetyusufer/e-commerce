import { object, string } from "yup";

const nameRegex = /^[A-Za-zŞşİıÖöÇçĞğÜü\s]+$/;

export let userInformationSchema = object({
  firstName: string()
    .required("Adınız girmeniz gerekmektedir.")
    .matches(nameRegex, "Lütfen Geçerli Bir İsim Girin"),
  lastName: string()
    .required("Soy Adınızı Şehri Girmeniz Gerekmektedir.")
    .matches(nameRegex, "Lütfen Geçerli Bir Soy İsim Girin"),
  email: string()
    .trim()
    .email()
    .required("Mail Adresinizi Girmeniz Gerekmektedir."),
  phone: string()
    .transform((value) =>
      typeof value === "string" ? value.replace(/\s+/g, "") : value
    )
    .required("Telefon Numaranızı Girmeniz Gerekmektedir.")
    .matches(
      /^(\+90|0)?5[0-9]{9}$/,
      "Geçerli bir telefon numarası girin. Örn: +905551234567 ya da 05551234567"
    ),
});
