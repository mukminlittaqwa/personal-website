import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username wajib diisi")
    .min(3, "Min 3 karakter"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Min 6 karakter"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
