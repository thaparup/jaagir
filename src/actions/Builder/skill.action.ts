"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { SkillSchemaType } from "@/schema/builder.schema";

export const createSkill = async (resumeId: string, data: SkillSchemaType) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { skills: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentSkills: JsonArray = Array.isArray(existingResume.skills)
      ? existingResume.skills
      : [];

    const updatedSkills: JsonArray = [
      ...currentSkills,
      {
        ...data,
      },
    ];

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        experiences: updatedSkills,
      },
    });

    return {
      success: true,
      message: "Skills added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating skills:", error);
    throw new Error("Failed to add skills ");
  }
};

export const reorderResumeSkills = async (
  resumeId: string,
  skills: SkillSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { skills: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        skills,
      },
    });

    return {
      success: true,
      message: "reordered skills successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering skills:", error);
    throw new Error("Error while reordering skills");
  }
};

export const updatedSkill = async (
  resumeId: string,
  skills: SkillSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { skills: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        skills,
      },
    });

    return {
      success: true,
      message: "Skills updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating skills:", error);
    throw new Error("Error updating skills ");
  }
};

export const deleteSkill = async (
  resumeId: string,
  skills: SkillSchemaType[]
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
        skills,
      },
    });
    return {
      success: true,
      message: "Skill deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting skills", error);
    return {
      success: false,
      message: "Something went wrong while deleting the skill",
      error: error.message || error,
    };
  }
};
