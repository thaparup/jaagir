"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { AwardSchemaType } from "@/schema/builder.schema";

export const createAward = async (resumeId: string, data: AwardSchemaType) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { awards: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentAwards: JsonArray = Array.isArray(existingResume.awards)
      ? existingResume.awards
      : [];

    const updatedAwards: JsonArray = [
      ...currentAwards,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        awards: updatedAwards,
      },
    });

    return {
      success: true,
      message: "Award added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating award:", error);
    throw new Error("Failed to add award");
  }
};

export const updateAward = async (
  resumeId: string,
  awards: AwardSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { awards: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        awards,
      },
    });

    return {
      success: true,
      message: "Award updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating award:", error);
    throw new Error("Error updating award");
  }
};

export const deleteAward = async (
  resumeId: string,
  awards: AwardSchemaType[]
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
        awards,
      },
    });

    return {
      success: true,
      message: "Award deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting award:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the award",
      error: error.message || error,
    };
  }
};

export const reorderResumeAward = async (
  resumeId: string,
  awards: AwardSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { awards: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        awards,
      },
    });

    return {
      success: true,
      message: "Reordered awards successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering awards:", error);
    throw new Error("Error while reordering awards");
  }
};
