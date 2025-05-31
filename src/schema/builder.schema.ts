import { z } from "zod";
import * as PhosphorIcons from "phosphor-react";

const BasicCustomFieldType = z.object({
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});
export const ProfileSchema = z
  .object({
    id: z.string(),
    network: z.string(),
    username: z.string().optional(),
    url: z.string().optional(),
    icon: z.string(),
  })

  .refine((data) => data.username || data.url, {
    message: "Either 'username' or 'url' must be provided",
    path: ["username"],
  });

export type ProfilesTypes = z.infer<typeof ProfilesSchema>;
export const ProfilesSchema = z.object({
  profiles: z.array(ProfileSchema),
});

export type ProfileType = z.infer<typeof ProfileSchema>;

{
  /*  **************************** Profile ********************************************************************************** */
}

{
  /*  **************************** Profile ********************************************************************************** */
}

{
  /*  **************************** Expericence ********************************************************************************** */
}

export const ExperienceSchema = z.object({
  company: z.string().nonempty("at least one 1 character is requierd"),
  position: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
});

export type ExperienceSchemaType = z.infer<typeof ExperienceSchema>;
{
  /*  **************************** Expericence ********************************************************************************** */
}

{
  /* ********************************************* Resume ************************************************************************* */
}

export const ResumeSchema = z.object({
  title: z.string().nonempty("Your Resume need to have the title"),
  id: z.string(),
  picture: z.string().nullable().optional(),

  fullName: z.string().nullable().optional(),

  headLine: z.string().nullable().optional(),

  email: z.string().email().nullable().optional(),

  website: z.string().url("Invalid URL").nullable().optional(),

  phoneNumber: z.coerce
    .number({
      invalid_type_error: "Phone number must be a number",
    })
    .nullable()
    .optional(),

  location: z.string().nullable().optional(),

  basicCustomField: z.array(BasicCustomFieldType).nullable(),
  profiles: z.array(ProfileSchema).nullable(),
  experiences: z.array(ExperienceSchema).nullable(),
});

export const ResumeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ResumeSchema.nullable(),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
export type ResumeResponseSchemaType = z.infer<typeof ResumeResponseSchema>;
