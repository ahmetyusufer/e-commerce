import { object, string, ref } from "yup";

export const registerValidation = object({
  name: string().required("İsmini girmeniz gerekmektedir."),
  email: string()
    .email("Geçerli bir e-posta giriniz.")
    .required("Mail adresinizi girmeniz gerekmektedir."),
  password: string()
    .min(0, "Şifreniz en az 6 karakter olmalıdır.")
    .required("Şifrenizi girmeniz gerekmektedir."),
  passwordIsEqual: string()
    .oneOf([ref("password"), null], "Şifreler eşleşmiyor.")
    .required("Şifreyi tekrar girmeniz gerekmektedir."),
});
