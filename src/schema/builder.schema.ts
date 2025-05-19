import { z } from "zod";
import * as PhosphorIcons from "phosphor-react";

const phosphorIconNames = Object.keys(PhosphorIcons);
const BasicCustomFieldType = z.object({
  // icon: z.enum([...phosphorIconNames] as [string, ...string[]]),
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});

export const ResumeSchema = z.object({
  title: z.string().nonempty("Your Resume need to have the title"),
  picture: z.string(),
  fullName: z.string(),
  headLine: z.string(),
  email: z.string().email(),
  website: z.string().url("Invalid URL"),
  phoneNumber: z.coerce.number({
    invalid_type_error: "Phone number must be a number",
  }),
  location: z.string(),
  basicCustomField: z.array(BasicCustomFieldType),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
export const ResumeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ResumeSchema.nullable(),
});

export type ResumeResponseSchemaType = z.infer<typeof ResumeResponseSchema>;
