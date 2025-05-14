import { z } from "zod";

const BasicCustomFieldType = z.object({
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});

export const ResumeSchema = z.object({
  title: z.string().nonempty("Your Resume need to have the title"),
  picture: z.string().nullable(),
  fullName: z.string().nullable(),
  headLine: z.string().nullable(),
  email: z.string().email().nullable(),
  website: z.string().url("Invalid URL").nullable(),
  phoneNumber: z.coerce
    .number({
      invalid_type_error: "Phone number must be a number",
    })
    .nullable(),
  location: z.string().nullable(),
  basicCustomField: z.array(BasicCustomFieldType),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;

// export const ResumeSchema = z.object({
//   title: z.string().nonempty("Your Resume need to have the title"),
// });

// export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
