// export async function createResume(prevState: unknown, formData: FormData) {
//   try {
//     const name = formData.get("fullname");
//     console.log(name);
//   } catch (error) {}
// }

"use server";

import { BuilderSchemaType } from "@/schema/builder.schema";

export const createResume = async (data: BuilderSchemaType) => {
  console.log("Received resume data:", data);

  // Optionally:
  // await db.resume.create({ data })
};
