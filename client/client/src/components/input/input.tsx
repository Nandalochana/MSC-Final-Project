import React, { FC } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils/tailwind-merge";
import { InputErrorMessage } from "./input-error-message";
import { RegisterFieldName, RegisterFormType } from "../../pages/Register/components/schema";

export interface InputErrorProps {
  name: RegisterFieldName;
  errors: FieldErrors<RegisterFormType>;
}

export interface InputProps
  extends InputErrorProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
}

export const Input: FC<InputProps> = ({
  className,
  name,
  errors,
  ...props
}) => {
  const { register } = useFormContext();

  const hasError = Object.prototype.hasOwnProperty.call(errors, name);

  return (
    <div>
      <div>
       
        <input
          {...register(name)}
          {...props}
          className={cn(
            `tracking-normal block max-sm:text-sm w-full px-4 py-2 max-sm:h-11 h-12 m-1 text-base font-normal bg-transparent border border-solid rounded-lg focus:outline-none ${hasError && 'border border-red'}`,
            className
          )}
        />
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};
