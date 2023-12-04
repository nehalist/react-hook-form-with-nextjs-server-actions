"use client";

import {
  FieldErrors,
  useForm,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";
import { getFullName, State } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/app/validation";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";

export interface FormValues {
  firstName: string;
  lastName: string;
}

const inputClasses =
  "block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";
const buttonClasses =
  "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed";

function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<FormValues>;
  isValid: boolean;
  errors: FieldErrors<FormValues>;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="grid grid-cols-1 gap-3 relative">
      <div className="w-full">
        <input
          {...register("firstName")}
          placeholder="First name"
          className={inputClasses}
          autoFocus={true}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="firstName" errors={errors} />
        </span>
      </div>
      <div className="w-full">
        <input
          {...register("lastName")}
          placeholder="Last name"
          className={inputClasses}
        />
        <span className="text-red-500 font-semibold text-sm">
          <ErrorMessage name="lastName" errors={errors} />
        </span>
      </div>
      <button
        type="submit"
        disabled={pending || !isValid}
        className={buttonClasses}
      >
        Send
      </button>
      {pending && <span>Loading...</span>}
    </div>
  );
}

export function Form() {
  // For demo only
  const [clientSideValidation, setClientSideValidation] = useState(true);
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: clientSideValidation ? zodResolver(formSchema) : undefined,
  });
  const [state, formAction] = useFormState<State, FormData>(getFullName, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      alert(state.message);
      reset();
    }
  }, [state, setError, reset]);

  return (
    <>
      <div className="pb-1.5 mb-1.5 border-b flex items-center">
        <input
          type="checkbox"
          checked={clientSideValidation}
          onChange={() => {
            reset();
            setClientSideValidation(!clientSideValidation);
          }}
          id="client-side-validation-checkbox"
          className="mr-3"
        />
        <label htmlFor="client-side-validation-checkbox">
          Enable client-side validation
        </label>
      </div>
      <form action={formAction}>
        <FormContent register={register} isValid={isValid} errors={errors} />
      </form>
    </>
  );
}
