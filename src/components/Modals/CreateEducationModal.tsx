"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import Slider from "../Slider";
import { EducationSchema, EducationSchemaType } from "@/schema/builder.schema";
import { createEducation } from "@/actions/Builder/education.action";
import RichTextEditor from "../RichTextEditor";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const CreateEducationModal = ({ resumeId, openModal, setOpenModal }: Props) => {
    const queryClient = useQueryClient();
    const [skillLevel, setSkillLevel] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<EducationSchemaType>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            id: "",
            institution: "",
            typesOfStudy: "",
            areaOfStudy: "",
            score: "",
            date: "",
            website: "",
            summary: "",
        },
    });

    const { mutate: createEducationMutation, isPending } = useMutation({
        mutationFn: async (data: EducationSchemaType) => {
            return await createEducation(resumeId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Education has been created", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to create experience");
        },
    });

    const onSubmit = (data: EducationSchemaType) => {
        const finalData = { ...data, id: uuidv4() };
        createEducationMutation(finalData);
        console.log(finalData);
    };

    return (
        <Dialog
            open={openModal}
            onOpenChange={(open) => {
                if (!isPending) {
                    setOpenModal(open);
                    if (!open) reset();
                }
            }}
        >
            <DialogContent className="bg-black text-gray-300 min-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>Add a new Education</span>
                        </div>
                    </DialogTitle>
                    {/* <DialogDescription className="text-gray-300 text-xsm">
                        Fill in the form below to add a education.
                    </DialogDescription> */}
                </DialogHeader>

                <form
                    className="flex flex-col gap-3 mt-0"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* Institution &  Type Of Study */}

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Institution</label>
                            <input
                                {...register("institution")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                            {errors.institution && (
                                <p className="text-red-500 text-sm">{errors.institution.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Types Of Study</label>
                            <input
                                {...register("typesOfStudy")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                    </div>

                    {/* Area Of Study & Score */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Area Of Study</label>
                            <input
                                {...register("areaOfStudy")}
                                placeholder=""
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Score</label>
                            <input
                                {...register("score")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                                placeholder="3.2 CGPA"
                            />
                        </div>
                    </div>

                    {/* Date or Date Range */}
                    <div className="flex flex-col gap-1 w-full text-sm">
                        <label className="font-semibold">Date or Date Range</label>
                        <input
                            {...register("date")}
                            placeholder="March 2023 - Present"
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                        />
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-1 w-full text-sm">
                        <label className="font-semibold">Website</label>
                        <input
                            {...register("website")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                        />
                        {errors.website && (
                            <p className="text-red-500 text-sm">{errors.website.message}</p>
                        )}
                    </div>

                    {/* Summary */}
                    <label htmlFor="" className="font-semibold">
                        Summary
                    </label>
                    <Controller
                        name="summary"
                        control={control}
                        render={({ field }) => (
                            <RichTextEditor
                                content={field.value!}
                                onChange={field.onChange}
                                editorCss="h-[170px] overflow-y-auto px-3 py-2 bg-gray-800 text-white rounded-md"
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Adding..." : "Add Experience"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEducationModal;
