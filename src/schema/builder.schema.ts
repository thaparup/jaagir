import { z } from "zod";

export const BuilderSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  headLine: z.string().nonempty("Headline is required"),
  email: z.string().email("Invalid email"),
  website: z.string().url("Invalid URL"),
  phoneNumber: z.coerce.number({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a number",
  }),
  location: z.string().nonempty("Location is required"),
});

export type BuilderSchemaType = z.infer<typeof BuilderSchema>;
