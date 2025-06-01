"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { EducationSchemaType } from "@/schema/builder.schema";

export const createEducation = async (
  resumeId: string,
  data: EducationSchemaType
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { education: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentEducation: JsonArray = Array.isArray(existingResume.education)
      ? existingResume.education
      : [];

    const updatedEducation: JsonArray = [
      ...currentEducation,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        education: updatedEducation,
      },
    });

    return {
      success: true,
      message: "Education added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating education:", error);
    throw new Error("Failed to add education");
  }
};

export const reorderResumeEducation = async (
  resumeId: string,
  education: EducationSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { education: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        education,
      },
    });

    return {
      success: true,
      message: "Reordered education successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering education:", error);
    throw new Error("Error while reordering education");
  }
};

export const updatedEducation = async (
  resumeId: string,
  education: EducationSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { education: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        education,
      },
    });

    return {
      success: true,
      message: "Education updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating education:", error);
    throw new Error("Error updating education");
  }
};

export const deleteEducation = async (
  resumeId: string,
  education: EducationSchemaType[]
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
        education,
      },
    });

    return {
      success: true,
      message: "Education deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting education:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the education",
      error: error.message || error,
    };
  }
};
