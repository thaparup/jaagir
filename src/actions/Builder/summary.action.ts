"use server";

import prisma from "@/lib/prisma";
export const updateSummary = async (resumeId: string, data: string) => {
  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { summary: true },
    });

    if (!existingResume) {
      throw new Error("Resume not found");
    }

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        summary: data,
      },
    });

    return {
      success: true,
      message: "Summary updated successfully!",
      data: null,
    };
  } catch (error) {
    console.error("Error while updating summary:", error);
    throw new Error("Failed to update summary");
  }
};
