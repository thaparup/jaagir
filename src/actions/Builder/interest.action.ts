"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { InterestSchemaType } from "@/schema/builder.schema";

export const createInterest = async (
  resumeId: string,
  data: InterestSchemaType
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { interest: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentInterests: JsonArray = Array.isArray(existingResume.interest)
      ? existingResume.interest
      : [];

    const updatedInterests: JsonArray = [
      ...currentInterests,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        interest: updatedInterests,
      },
    });

    return {
      success: true,
      message: "Interest added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating interest:", error);
    throw new Error("Failed to add interest");
  }
};

export const reorderResumeInterest = async (
  resumeId: string,
  interest: InterestSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { interest: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        interest,
      },
    });

    return {
      success: true,
      message: "Reordered interests successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering interests:", error);
    throw new Error("Error while reordering interests");
  }
};

export const updateInterest = async (
  resumeId: string,
  interest: InterestSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { interest: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        interest,
      },
    });

    return {
      success: true,
      message: "Interest updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating interest:", error);
    throw new Error("Error updating interest");
  }
};

export const deleteInterest = async (
  resumeId: string,
  interest: InterestSchemaType[]
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
        interest,
      },
    });

    return {
      success: true,
      message: "Interest deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting interest:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the interest",
      error: error.message || error,
    };
  }
};
