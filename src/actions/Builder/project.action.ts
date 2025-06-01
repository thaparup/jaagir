"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import { ProjectSchemaType } from "@/schema/builder.schema";

export const createProject = async (
  resumeId: string,
  data: ProjectSchemaType
) => {
  console.log(data);
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { projects: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentProjects: JsonArray = Array.isArray(existingResume.projects)
      ? existingResume.projects
      : [];

    const updatedProjects: JsonArray = [
      ...currentProjects,
      {
        ...data,
      },
    ];

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        projects: updatedProjects,
      },
    });

    return {
      success: true,
      message: "Project added successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while creating project:", error);
    throw new Error("Failed to add project");
  }
};

export const reorderResumeProjects = async (
  resumeId: string,
  projects: ProjectSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { projects: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        projects,
      },
    });

    return {
      success: true,
      message: "Reordered projects successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while reordering projects:", error);
    throw new Error("Error while reordering projects");
  }
};

export const updateProject = async (
  resumeId: string,
  projects: ProjectSchemaType[]
) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { projects: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        projects,
      },
    });

    return {
      success: true,
      message: "Project updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Error updating project");
  }
};

export const deleteProject = async (
  resumeId: string,
  projects: ProjectSchemaType[]
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
        projects,
      },
    });

    return {
      success: true,
      message: "Project deleted successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error while deleting project:", error);
    return {
      success: false,
      message: "Something went wrong while deleting the project",
      error: error.message || error,
    };
  }
};
