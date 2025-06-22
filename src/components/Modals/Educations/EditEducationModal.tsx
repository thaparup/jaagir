"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { EducationSchema, EducationSchemaType } from "@/schema/builder.schema";
import { updatedEducation } from "@/actions/Builder/education.action";
import RichTextEditor from "@/components/RichTextEditor";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeEduId: string;
    educations: EducationSchemaType[];
};

const EditEducationModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeEduId,
    educations,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeEduIndex, setActiveEduIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
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

    useEffect(() => {
        if (educations && activeEduId) {
            const matchedIndex = educations.findIndex(
                (edu) => edu.id === activeEduId
            );
            if (matchedIndex !== -1) {
                setActiveEduIndex(matchedIndex);
                const activeEdu = educations[matchedIndex];
                setValue("areaOfStudy", activeEdu.areaOfStudy);
                setValue("date", activeEdu.date);
                setValue("id", activeEdu.id);
                setValue("institution", activeEdu.institution);
                setValue("score", activeEdu.score);
                setValue("summary", activeEdu.summary);
                setValue("typesOfStudy", activeEdu.typesOfStudy);
                setValue("website", activeEdu.website);
            }
        }
    }, [educations, activeEduId]);

    const { mutate: updateEducationMutation, isPending } = useMutation({
        mutationFn: async (updatedEducations: EducationSchemaType[]) => {
            return await updatedEducation(resumeId, updatedEducations);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Education has been updated", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();

            setActiveEduIndex(null);
        },
        onError: () => {
            toast.error("Failed to update education");
        },
    });

    const onSubmit = (data: EducationSchemaType) => {
        if (activeEduId !== null) {
            const updatedEducations = [...educations];
            updatedEducations[activeEduIndex!] = { ...data };
            updateEducationMutation(updatedEducations);
        }
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
                            <span>Edit Education</span>
                        </div>
                    </DialogTitle>
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
                                <p className="text-red-500 text-sm">
                                    {errors.institution.message}
                                </p>
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
                        {isPending ? "Saving..." : "Saving"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEducationModal;
