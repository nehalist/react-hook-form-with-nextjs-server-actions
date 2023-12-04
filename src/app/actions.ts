"use server";

import { formSchema } from "@/app/validation";
import { ZodError } from "zod";

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export async function getFullName(
  prevState: State,
  data: FormData,
): Promise<State> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { firstName, lastName } = formSchema.parse(data);

    return {
      status: "success",
      message: `Welcome, ${firstName} ${lastName ? lastName : ""}!`,
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data.",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
