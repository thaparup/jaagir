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

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences: updatedExperiences,
      },
    });

    return {
      success: true,
      message: "Profile added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with profile:", error);
    throw new Error("Failed to add profile to resume");
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
      message: "Profile added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with profile:", error);
    throw new Error("Failed to add profile to resume");
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
      message: "Profile added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating resume with profile:", error);
    throw new Error("Failed to add profile to resume");
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
      message: "Profiles updated successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error updating resume profiles:", error);
    return {
      success: false,
      message: "Something went wrong while updating the profiles",
      error: error.message || error,
    };
  }
};
