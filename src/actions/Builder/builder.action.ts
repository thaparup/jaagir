"use server";

import { JsonArray } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/prisma";
import {
  ProfilesTypes,
  ProfileType,
  ResumeSchemaType,
} from "@/schema/builder.schema";
import * as LucideIcons from "lucide-react";

export const fetchResumeById = async (
  resumeId: string
): Promise<{
  success: boolean;
  message: string;
  data: ResumeSchemaType | null;
}> => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    const arr = [];
    if (!resume) {
      return {
        success: false,
        message: "Could not find the resume",
        data: null,
      };
    }
    const validated = [];
    const validatedProfiles = [];
    if (
      "basicCustomField" in resume &&
      Array.isArray(resume.basicCustomField)
    ) {
      if (resume.basicCustomField.length < 0) resume.basicCustomField = [];
      else {
        console.log("array ");
        for (const item of resume.basicCustomField) {
          if (
            typeof item === "object" &&
            item !== null &&
            "icon" in item &&
            "name" in item &&
            "value" in item
          ) {
            validated.push({
              icon: typeof item.icon === "string" ? item.icon : "",
              name: typeof item.name === "string" ? item.name : "",
              value: typeof item.value === "string" ? item.value : "",
            });
          }
        }
      }
    }

    if ("profiles" in resume && Array.isArray(resume.profiles)) {
      if (resume.profiles.length < 0) resume.profiles = [];
      else {
        for (const item of resume.profiles) {
          if (
            typeof item === "object" &&
            item !== null &&
            "icon" in item &&
            "username" in item &&
            "network" in item &&
            "url" in item &&
            "id" in item
          ) {
            validatedProfiles.push({
              icon: typeof item.icon === "string" ? item.icon : "",
              username: typeof item.username === "string" ? item.username : "",
              network: typeof item.network === "string" ? item.network : "",
              url: typeof item.url === "string" ? item.url : "",
              id: typeof item.id === "string" ? item.id : "",
            });
          }
        }
      }
    }

    const normalized: ResumeSchemaType = {
      ...resume,
      profiles: validatedProfiles,
      basicCustomField: validated,
    };

    return {
      success: true,
      message: "Fetched resume by id",
      data: normalized,
    };
  } catch (error) {
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

// export const createProfile = async (resumeId: string, data: ProfileType) => {
//   try {
//     const existingResume = await prisma.resume.findUnique({
//       where: { id: resumeId },
//       select: { profiles: true },
//     });

//     if (!existingResume) {
//       throw new Error("Resume not found");
//     }
//     const existingProfile = [];
//     if (
//       "profiles" in existingResume &&
//       Array.isArray(existingResume.profiles)
//     ) {
//       if (existingResume.profiles.length < 0) return;
//       else {
//         for (const item of existingResume.profiles) {
//           if (
//             typeof item === "object" &&
//             item !== null &&
//             "icon" in item &&
//             "username" in item &&
//             "network" in item &&
//             "url" in item
//           ) {

//           }
//         }
//       }
//     }

//     const updatedProfiles = [
//       ...(existingResume.profiles || []),
//       {
//         network: data.network,
//         username: data.username,
//         url: data.url,
//         icon: data.icon,
//       },
//     ];

//     const updatedResume = await prisma.resume.update({
//       where: { id: resumeId },
//       data: {
//         profiles: updatedProfiles,
//       },
//     });

//     return {
//       success: true,
//       message: "Profile added successfully!",
//       data: updatedResume,
//     };
//   } catch (error) {
//     console.error("Error updating resume with profile:", error);
//     throw new Error("Failed to add profile to resume");
//   }
// };

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
