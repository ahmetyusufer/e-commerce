import { object, string } from "yup";

export let cardInformationSchema = object({
  cardName: string()
    .required("Kartın üstündeki ismi girmeniz gerekmektedir.")
    .min(2, "İsim en az 2 karakter olmalıdır."),

  cardNumber: string()
    .required("Kartın üzerindeki numarayı girmeniz gerekmektedir.")
    .matches(/^\d{16}$/, "Kart numarası 16 haneli rakamlardan oluşmalıdır."),

  ccv: string()
    .required("Kartın üzerindeki güvenlik numarasını girmeniz gerekmektedir.")
    .matches(/^\d{3,4}$/, "CCV numarası 3 veya 4 haneli olmalıdır."),

  cardLastDate: string()
    .required("Kartın üzerindeki son kullanma tarihini girmeniz gerekmektedir.")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Geçerli bir son kullanma tarihi giriniz. Örn: 12/25"
    ),
});
