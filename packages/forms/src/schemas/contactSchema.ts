import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Nama wajib diisi").min(2, "Min 2 karakter"),
  email: yup.string().email("Email invalid").required("Email wajib diisi"),
  message: yup
    .string()
    .required("Pesan wajib diisi")
    .min(10, "Min 10 karakter"),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
