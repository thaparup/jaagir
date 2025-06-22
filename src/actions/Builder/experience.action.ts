"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { ExperienceSchemaType } from "@/schema/builder.schema";

export const createExperience = async (
  resumeId: string,
  data: ExperienceSchemaType
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { experiences: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }
    console.log(data);
    const currentExperiences: JsonArray = Array.isArray(
      existingResume.experiences
    )
      ? existingResume.experiences
      : [];

    const updatedExperiences: JsonArray = [
      ...currentExperiences,
      {
        company: data.company,
        position: data.position,
        date: data.date,
        location: data.location,
        website: data.website,
        summary: data.summary,
        id: data.id,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences: updatedExperiences,
      },
    });

    return {
      success: true,
      message: "Experience added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with experience:", error);
    throw new Error("Failed to add experience to resume");
  }
};

export const reorderResumeExperiences = async (
  resumeId: string,
  experiences: ExperienceSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { experiences: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences,
      },
    });

    return {
      success: true,
      message: "reordered experiences successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with experience:", error);
    throw new Error("Failed to update experience to resume");
  }
};

export const updateExperience = async (
  resumeId: string,
  experiences: ExperienceSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { experiences: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences,
      },
    });

    return {
      success: true,
      message: "Experience updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with experience:", error);
    throw new Error("Failed to update experience ");
  }
};

export const deleteExperience = async (
  resumeId: string,
  experiences: ExperienceSchemaType[]
) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) {
      return {
        success: false,
        message: "Could not find the resume",
      };
    }
    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences,
      },
    });
    return {
      success: true,
      message: "Experience deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the experience",
      error: error.message || error,
    };
  }
};
