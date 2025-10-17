import * as yup from "yup";
import { useAppForm } from "./useAppForm";
import { contactSchema } from "../schemas/contactSchema";

export const useContactForm = () => {
  const form = useAppForm(contactSchema, {
    defaultValues: {
      name: "",
      email: "",
      message: "",
    } as yup.InferType<typeof contactSchema>,
  });
  return form;
};
