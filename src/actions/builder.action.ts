"use server";

import prisma from "@/lib/prisma";
import { ResumeSchemaType } from "@/schema/builder.schema";

export const fetchResumeById = async (resumeId: string) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) {
      return {
        success: false,
        message: "could not find the resume",
      };
    }

    return {
      success: true,
      message: "Fetched resume by id",
      data: resume,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const createResume = async (data: ResumeSchemaType) => {
  try {
    const newResume = await prisma.resume.create({
      data: {
        title: data.title,
      },
    });

    return {
      success: true,
      message: "Resume created successfully!",
      data: newResume,
    };
  } catch (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume");
  }
};

export const updateResume = async (
  data: ResumeSchemaType,
  resumeId: string
) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    console.log("updated");
    if (!resume) {
      return {
        success: false,
        message: "Could not find the resume",
      };
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        fullName: data.fullName,
        headLine: data.headLine,
        email: data.email,
        website: data.website,
        phoneNumber: data.phoneNumber,
        location: data.location,
        picture: data.picture,
        basicCustomField: data.basicCustomField,
      },
    });

    return {
      success: true,
      message: "Resume updated successfully",
      data: updatedResume,
    };
  } catch (error: any) {
    console.error("Error updating resume:", error);
    return {
      success: false,
      message: "Something went wrong while updating the resume",
      error: error.message || error,
    };
  }
};
