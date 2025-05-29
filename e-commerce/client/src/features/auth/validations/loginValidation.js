import { object, string } from "yup";

export const loginValidation = object({
  email: string()
    .email("Geçerli bir e-posta giriniz.")
    .required("Mail adresinizi girmeniz gerekmektedir."),
  password: string()
    .min(6, "Şifreniz en az 6 karakter olmalıdır.")
    .required("Şifrenizi girmeniz gerekmektedir."),
});
