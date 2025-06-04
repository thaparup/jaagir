"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    ExperienceSchema,
    ExperienceSchemaType,
} from "@/schema/builder.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../../RichTextEditor";
import { updateExperience } from "@/actions/Builder/experience.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    experiences: ExperienceSchemaType[];
    activeExpId: string;
};

const EditExperienceModal = ({
    openModal,
    setOpenModal,
    resumeId,
    experiences,
    activeExpId,
}: Props) => {
    const [activeExpIndex, setActiveExpIndex] = useState<number | null>(null);

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<ExperienceSchemaType>({
        resolver: zodResolver(ExperienceSchema),
        defaultValues: {
            id: "",
            company: "",
            position: "",
            date: "",
            location: "",
            website: "",
            summary: "",
        },
    });

    useEffect(() => {
        if (experiences && activeExpId) {
            const matchedIndex = experiences.findIndex(
                (exp) => exp.id === activeExpId
            );
            if (matchedIndex !== -1) {
                setActiveExpIndex(matchedIndex);
                const activeExp = experiences[matchedIndex];
                setValue("company", activeExp.company);
                setValue("date", activeExp.date);
                setValue("location", activeExp.location);
                setValue("position", activeExp.position);
                setValue("summary", activeExp.summary);
                setValue("website", activeExp.website);
                setValue("id", activeExp.id);
            }
        }
    }, [experiences, activeExpId, setValue]);

    const { mutate: updateExperienceMutation, isPending } = useMutation({
        mutationFn: async (updatedProfiles: ExperienceSchemaType[]) => {
            return await updateExperience(resumeId, updatedProfiles);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Experience has been updated", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();

            setActiveExpIndex(null);
        },
        onError: () => {
            toast.error("Failed to update profile");
        },
    });

    const onSubmit = (data: ExperienceSchemaType) => {
        if (activeExpIndex !== null) {
            const updatedExps = [...experiences];
            updatedExps[activeExpIndex] = { ...data };
            updateExperienceMutation(updatedExps);
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
                setOpenModal(open);
            }}
        >
            <DialogContent className="bg-black text-gray-300 min-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>Edit experience</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill in the form below to add an experience.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-3 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Company & Position */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Company</label>
                            <input
                                {...register("company")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                            {errors.company && (
                                <p className="text-red-500 text-sm">{errors.company.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Position</label>
                            <input
                                {...register("position")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                    </div>

                    {/* Date & Location */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Date or Date Range</label>
                            <input
                                {...register("date")}
                                placeholder="March 2023 - Present"
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Location</label>
                            <input
                                {...register("location")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
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

export default EditExperienceModal;
