import { useForm, UseFormReturn, UseFormProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type InferSchema<T> = T extends yup.ObjectSchema<infer P> ? P : never;

export const useAppForm = <TSchema extends yup.ObjectSchema<any>>(
  schema: TSchema,
  options?: UseFormProps<InferSchema<TSchema>>
): UseFormReturn<InferSchema<TSchema>> => {
  return useForm<InferSchema<TSchema>>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    ...options,
  });
};
