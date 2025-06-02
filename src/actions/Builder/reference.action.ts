"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { ReferenceSchemaType } from "@/schema/builder.schema";

export const createReference = async (
  resumeId: string,
  data: ReferenceSchemaType
) => {
  console.log(data);
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { references: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentReferences: JsonArray = Array.isArray(
      existingResume.references
    )
      ? existingResume.references
      : [];

    const updatedReferences: JsonArray = [
      ...currentReferences,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        references: updatedReferences,
      },
    });

    return {
      success: true,
      message: "Reference added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating reference:", error);
    throw new Error("Failed to add reference");
  }
};

export const reorderResumeReference = async (
  resumeId: string,
  references: ReferenceSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { references: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        references,
      },
    });

    return {
      success: true,
      message: "Reordered reference successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering reference:", error);
    throw new Error("Error while reordering reference");
  }
};

export const updateReference = async (
  resumeId: string,
  references: ReferenceSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { references: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        references,
      },
    });

    return {
      success: true,
      message: "Reference updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating reference:", error);
    throw new Error("Error updating reference");
  }
};

export const deleteReference = async (
  resumeId: string,
  references: ReferenceSchemaType[]
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
        references,
      },
    });

    return {
      success: true,
      message: "Reference deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting reference:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the reference",
      error: error.message || error,
    };
  }
};
