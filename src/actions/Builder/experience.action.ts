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
