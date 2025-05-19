import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useFormContext, FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { User } from "phosphor-react";
import CustomFieldsForm from "../CustomFieldsForm";
import { ResumeSchemaType } from "@/schema/builder.schema";

;
const BasicSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();



    return (
        <>
            <div className="flex justify-between items-center pt-8">
                <div className="flex gap-4 items-center">
                    <User size={20} />
                    <h1 className="text-3xl font-semibold">Basics</h1>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <Avatar className={cn("h-16 w-16")}>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                </Avatar>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-md font-medium">Picture</span>
                    <input
                        type="text"
                        placeholder="https://"
                        {...register("picture")}
                        className="w-full outline-1 outline-gray-700/80 focus:outline-white rounded-sm text-sm placeholder:text-gray-600 p-1"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name">Full Name</label>
                <input
                    {...register("fullName")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="headline">Headline</label>
                <input
                    {...register("headLine")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                    {...register("email")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="website">Website</label>
                <input
                    {...register("website")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phone">Phone Number</label>
                <input
                    {...register("phoneNumber")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="location">Location</label>
                <input
                    {...register("location")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1"
                />
            </div>

            <CustomFieldsForm />

        </>
    );
};

export default BasicSection;
