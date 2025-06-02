import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { User } from "phosphor-react";

type Props = {};
const BassicSectionForm = ({ }: Props) => {
    const { register } = useFormContext();

    return (
        <div className="px-8">
            <div className="flex gap-4 items-center">
                <User size={20} />
                <h1 className="text-3xl font-semibold">Basics</h1>
            </div>

            <div className="flex gap-6 py-4 ">
                <Avatar className={cn("h-16 w-16")}>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                </Avatar>
                <div className="w-full flex flex-col gap-2">
                    <span className="text-gray-400 font-medium">Picture</span>
                    <input
                        type="text"
                        placeholder="https://"
                        {...register("picture")}
                        className="w-full outline-1 outline-gray-700/80 focus:outline-white rounded-sm text-sm placeholder:text-gray-600 p-1"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="name" className="text-gray-400 font-medium">
                    Full Name
                </label>
                <input
                    {...register("fullName")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <label htmlFor="headline" className="text-gray-400 font-medium">
                    Headline
                </label>
                <input
                    {...register("headLine")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-1 pt-4 ">
                <label htmlFor="email" className="text-gray-400 font-medium">
                    Email
                </label>
                <input
                    {...register("email")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <label htmlFor="website" className="text-gray-400 font-medium">
                    Website
                </label>
                <input
                    {...register("website")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <label htmlFor="phone" className="text-gray-400 font-medium">
                    Phone Number
                </label>
                <input
                    {...register("phoneNumber")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <div className="flex flex-col gap-2 py-4">
                <label htmlFor="location" className="text-gray-400 font-medium">
                    Location
                </label>
                <input
                    {...register("location")}
                    className="outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-2 text-sm"
                />
            </div>

            <hr />
        </div>
    );
};

export default BassicSectionForm;
