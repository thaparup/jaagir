import { string, z } from "zod";
import * as PhosphorIcons from "phosphor-react";

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
  /*  **************************** Basic custom Field ********************************************************************************** */
}
export const BasicCustomFieldSchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});

export type BasicCustomFieldType = z.infer<typeof BasicCustomFieldSchema>;
{
  /*  **************************** Basic cusotm Field ********************************************************************************** */
}

{
  /*  **************************** Expericence ********************************************************************************** */
}

export const ExperienceSchema = z.object({
  id: z.string(),
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
  /*  **************************** Skills ********************************************************************************** */
}

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("at least one character is required"),
  description: z.string().optional(),
  // level: z.number().nullable(),
  // level: z.array(z.number()).length(1).nullable()
  level: z.array(z.number()).nullable(),
});
export type SkillSchemaType = z.infer<typeof SkillSchema>;

{
  /*  **************************** Skills ********************************************************************************** */
}

{
  /*  **************************** Education ********************************************************************************** */
}

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().nonempty('"at least one character is required'),
  typesOfStudy: z.string().optional(),
  areaOfStudy: z.string().optional(),
  score: z.string().optional(),
  date: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
});

export type EducationSchemaType = z.infer<typeof EducationSchema>;
{
  /*  **************************** Education ********************************************************************************** */
}

{
  /*  **************************** Languages ********************************************************************************** */
}

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("at least one character is required"),
  description: z.string().optional(),
  level: z.array(z.number()).nullable(),
});
export type LanguageSchemaType = z.infer<typeof LanguageSchema>;

{
  /*  **************************** Languages ********************************************************************************** */
}

{
  /*  **************************** Projects ********************************************************************************** */
}

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("at least one character is required"),
  description: z.string(),
  date: z.string(),
  website: z.string(),
  summary: z.string(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
{
  /*  **************************** Projects ********************************************************************************** */
}

{
  /*  **************************** Awards ********************************************************************************** */
}

export const AwardSchema = z.object({
  id: string(),
  title: z.string().nonempty("at least one character is required"),
  awarder: z.string(),
  date: z.string(),
  website: z.string(),
  summary: z.string(),
});
export type AwardSchemaType = z.infer<typeof AwardSchema>;

{
  /*  **************************** Awards ********************************************************************************** */
}

{
  /*  **************************** references ********************************************************************************** */
}

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("at least one character is required"),
  description: z.string(),
  website: z.string(),
  summary: z.string(),
});
export type ReferenceSchemaType = z.infer<typeof ReferenceSchema>;

{
  /*  **************************** references ********************************************************************************** */
}

export const InterestSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("at least one character is required"),
});

export type InterestSchemaType = z.infer<typeof InterestSchema>;

{
  /*  **************************** interest ********************************************************************************** */
}

{
  /*  **************************** interest ********************************************************************************** */
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

  phoneNumber: z.string().email().nullable().optional(),
  location: z.string().nullable().optional(),
  summary: z.string().optional(),
  basicCustomField: z.array(BasicCustomFieldSchema).nullable(),
  profiles: z.array(ProfileSchema).nullable(),
  experiences: z.array(ExperienceSchema).nullable(),
  skills: z.array(SkillSchema).nullable(),
  education: z.array(EducationSchema).nullable(),
  languages: z.array(LanguageSchema).nullable(),
  projects: z.array(ProjectSchema).nullable(),
  awards: z.array(AwardSchema).nullable(),
  references: z.array(ReferenceSchema).nullable(),
  interest: z.array(InterestSchema).nullable(),
});

export const ResumeResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ResumeSchema.nullable(),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
export type ResumeResponseSchemaType = z.infer<typeof ResumeResponseSchema>;
