"use server";

import prisma from "@/lib/prisma";
import { ResumeSchemaType } from "@/schema/builder.schema";

// export const fetchResumeById = async (resumeId: string) => {
//   try {
//     const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
//     if (!resume) {
//       return {
//         success: false,
//         message: "could not find the resume",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       message: "Fetched resume by id",
//       data: {
//         ...resume,
//         basicCustomField: Array.isArray(resume.basicCustomField)
//           ? resume.basicCustomField
//           : [], // 👈 normalize to [] if null or invalid
//       },
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: "Something went wrong",
//       data: null,
//     };
//   }
// };

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
            // validated.push({
            //                 icon:
            //                     typeof item.icon === "string"
            //                         ? item.icon
            //                         : String(item.icon || ""),
            //                 name:
            //                     typeof item.name === "string"
            //                         ? item.name
            //                         : String(item.name || ""),
            //                 value:
            //                     typeof item.value === "string"
            //                         ? item.value
            //                         : String(item.value || ""),
            //             });
            validated.push({
              icon: typeof item.icon === "string" ? item.icon : "",
              name: typeof item.name === "string" ? item.name : "",
              value: typeof item.value === "string" ? item.value : "",
            });
          }
        }
      }
    }
    console.log("passed validation", validated);
    console.log(typeof validated);
    // Normalize basicCustomField
    const normalized: ResumeSchemaType = {
      ...resume,
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
