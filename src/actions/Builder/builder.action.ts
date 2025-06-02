"use server";

import prisma from "@/lib/prisma";
import { ResumeSchemaType } from "@/schema/builder.schema";

export const fetchResumeById = async (
  resumeId: string
): Promise<{
  success: boolean;
  message: string;
  data: ResumeSchemaType | null;
}> => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

    if (!resume) {
      return {
        success: false,
        message: "Could not find the resume",
        data: null,
      };
    }

    const safeArray = <T>(arr: unknown, mapFn: (item: any) => T): T[] => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item) => mapFn(item));
    };

    const parsed = {
      basicCustomField: safeArray(resume.basicCustomField, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        icon: typeof item.icon === "string" ? item.icon : "",
        name: typeof item.name === "string" ? item.name : "",
        value: typeof item.value === "string" ? item.value : "",
      })),

      profiles: safeArray(resume.profiles, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        icon: typeof item.icon === "string" ? item.icon : "",
        network: typeof item.network === "string" ? item.network : "",
        username: typeof item.username === "string" ? item.username : undefined,
        url: typeof item.url === "string" ? item.url : undefined,
      })),

      experiences: safeArray(resume.experiences, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        company: typeof item.company === "string" ? item.company : "",
        position: typeof item.position === "string" ? item.position : undefined,
        date: typeof item.date === "string" ? item.date : undefined,
        location: typeof item.location === "string" ? item.location : undefined,
        website: typeof item.website === "string" ? item.website : undefined,
        summary: typeof item.summary === "string" ? item.summary : undefined,
      })),

      skills: safeArray(resume.skills, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        name: typeof item.name === "string" ? item.name : "",
        description:
          typeof item.description === "string" ? item.description : undefined,
        level: Array.isArray(item.level) ? item.level : null,
      })),

      education: safeArray(resume.education, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        institution:
          typeof item.institution === "string" ? item.institution : "",
        typesOfStudy:
          typeof item.typesOfStudy === "string" ? item.typesOfStudy : undefined,
        areaOfStudy:
          typeof item.areaOfStudy === "string" ? item.areaOfStudy : undefined,
        score: typeof item.score === "string" ? item.score : undefined,
        date: typeof item.date === "string" ? item.date : undefined,
        website: typeof item.website === "string" ? item.website : undefined,
        summary: typeof item.summary === "string" ? item.summary : undefined,
      })),

      languages: safeArray(resume.languages, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        name: typeof item.name === "string" ? item.name : "",
        description:
          typeof item.description === "string" ? item.description : undefined,
        level: Array.isArray(item.level) ? item.level : null,
      })),

      projects: safeArray(resume.projects, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        name: typeof item.name === "string" ? item.name : "",
        description:
          typeof item.description === "string" ? item.description : "",
        date: typeof item.date === "string" ? item.date : "",
        website: typeof item.website === "string" ? item.website : "",
        summary: typeof item.summary === "string" ? item.summary : "",
      })),

      awards: safeArray(resume.awards, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        title: typeof item.title === "string" ? item.title : "",
        awarder: typeof item.awarder === "string" ? item.awarder : "",
        date: typeof item.date === "string" ? item.date : "",
        website: typeof item.website === "string" ? item.website : "",
        summary: typeof item.summary === "string" ? item.summary : "",
      })),

      references: safeArray(resume.references, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        name: typeof item.name === "string" ? item.name : "",
        description:
          typeof item.description === "string" ? item.description : "",
        website: typeof item.website === "string" ? item.website : "",
        summary: typeof item.summary === "string" ? item.summary : "",
      })),

      interest: safeArray(resume.interest, (item) => ({
        id: typeof item.id === "string" ? item.id : "",
        name: typeof item.name === "string" ? item.name : "",
      })),
    };

    const normalized: ResumeSchemaType = {
      ...resume,
      ...parsed,
    };

    return {
      success: true,
      message: "Fetched resume by id",
      data: normalized,
    };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
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
        basicCustomField: data.basicCustomField!,
        profiles: data.profiles!,
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
