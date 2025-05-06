"use server";

import prisma from "@/lib/prisma";
import { ResumeSchemaType } from "@/schema/builder.schema";

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
