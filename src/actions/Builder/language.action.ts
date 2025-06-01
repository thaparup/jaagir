"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { LanguageSchemaType } from "@/schema/builder.schema";

export const createLanguage = async (
  resumeId: string,
  data: LanguageSchemaType
) => {
  console.log(data);
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { languages: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentLanguage: JsonArray = Array.isArray(existingResume.languages)
      ? existingResume.languages
      : [];

    const updatedLanguage: JsonArray = [
      ...currentLanguage,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        languages: updatedLanguage,
      },
    });

    return {
      success: true,
      message: "Language added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating language:", error);
    throw new Error("Failed to add language");
  }
};

export const reorderResumeLanguage = async (
  resumeId: string,
  languages: LanguageSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { languages: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        languages,
      },
    });

    return {
      success: true,
      message: "Reordered language successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering language:", error);
    throw new Error("Error while reordering language");
  }
};

export const updateLanguage = async (
  resumeId: string,
  languages: LanguageSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { languages: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        languages,
      },
    });

    return {
      success: true,
      message: "Language updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating language:", error);
    throw new Error("Error updating language");
  }
};

export const deleteLanguage = async (
  resumeId: string,
  languages: LanguageSchemaType[]
) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) {
      return {
        success: false,
        message: "Could not find the resume",
      };
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        languages,
      },
    });

    return {
      success: true,
      message: "Language deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting language:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the language",
      error: error.message || error,
    };
  }
};
