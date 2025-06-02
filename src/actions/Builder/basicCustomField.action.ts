"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { BasicCustomFieldType } from "@/schema/builder.schema";

export const createBasicCustomField = async (
  resumeId: string,
  data: BasicCustomFieldType
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { basicCustomField: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentFields: JsonArray = Array.isArray(
      existingResume.basicCustomField
    )
      ? existingResume.basicCustomField
      : [];

    const updatedFields: JsonArray = [...currentFields, { ...data }];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        basicCustomField: updatedFields,
      },
    });

    return {
      success: true,
      message: "Custom field added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating custom field:", error);
    throw new Error("Failed to add custom field");
  }
};

export const reorderBasicCustomField = async (
  resumeId: string,
  fields: BasicCustomFieldType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { basicCustomField: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        basicCustomField: fields,
      },
    });

    return {
      success: true,
      message: "Reordered custom fields successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering custom fields:", error);
    throw new Error("Error while reordering custom fields");
  }
};

export const updateBasicCustomField = async (
  resumeId: string,
  fields: BasicCustomFieldType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { basicCustomField: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        basicCustomField: fields,
      },
    });

    return {
      success: true,
      message: "Custom fields updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating custom fields:", error);
    throw new Error("Error updating custom fields");
  }
};

export const deleteBasicCustomField = async (
  resumeId: string,
  fields: BasicCustomFieldType[]
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
        basicCustomField: fields,
      },
    });

    return {
      success: true,
      message: "Custom field deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting custom field:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the custom field",
      error: error.message || error,
    };
  }
};
