"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import {
  LanguageSchemaType,
  ProfilesTypes,
  ProfileType,
} from "@/schema/builder.schema";

export const reorderResumeProfiles = async (
  resumeId: string,
  profiles: ProfilesTypes
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
        profiles, // Only updating the 'profiles' field
      },
    });

    return {
      success: true,
      message: "Profiles updated successfully",
      data: updatedResume,
    };
  } catch (error: any) {
    console.error("Error updating resume profiles:", error);
    return {
      success: false,
      message: "Something went wrong while updating the profiles",
      error: error.message || error,
    };
  }
};

export const deleteProfile = async (
  resumeId: string,
  profiles: ProfileType[]
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
        profiles,
      },
    });
    return {
      success: true,
      message: "Profiles updated successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("Error updating resume profiles:", error);
    return {
      success: false,
      message: "Something went wrong while updating the profiles",
      error: error.message || error,
    };
  }
};

export const createProfile = async (resumeId: string, data: ProfileType) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { profiles: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    const currentProfiles: JsonArray = Array.isArray(existingResume.profiles)
      ? existingResume.profiles
      : [];

    const updatedProfiles: JsonArray = [
      ...currentProfiles,
      {
        network: data.network,
        username: data.username,
        url: data.url,
        icon: data.icon,
        id: data.id,
      },
    ];

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        profiles: updatedProfiles,
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

export const updateProfile = async (resumeId: string, data: ProfileType[]) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { profiles: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    console.log(data);

    const currentProfiles: JsonArray = Array.isArray(existingResume.profiles)
      ? existingResume.profiles
      : [];

    // const updatedProfiles: JsonArray = [
    //   ...currentProfiles,
    //   {
    //     network: data.network,
    //     username: data.username,
    //     url: data.url,
    //     icon: data.icon,
    //     id: data.id,
    //   },
    // ];

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        profiles: data,
      },
    });

    // return {
    //   success: true,
    //   message: "Profile added successfully!",
    //   data: null,
    // };
  } catch (error) {
    console.error("Error updating resume with profile:", error);
    throw new Error("Failed to add profile to resume");
  }
};
