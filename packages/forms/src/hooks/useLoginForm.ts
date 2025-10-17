import * as yup from "yup";
import { useAppForm } from "./useAppForm";
import { loginSchema } from "../schemas/loginSchema";

export const useLoginForm = () => {
  const form = useAppForm(loginSchema, {
    defaultValues: {
      username: "",
      password: "",
    } as yup.InferType<typeof loginSchema>,
  });
  return form;
};
