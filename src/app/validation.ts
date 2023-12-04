import { zfd } from "zod-form-data";
import { z } from "zod";

export const formSchema = zfd.formData({
  firstName: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  lastName: zfd.text(
    z.string().min(2, "Too short").max(20, "Too long").optional(),
  ),
});
