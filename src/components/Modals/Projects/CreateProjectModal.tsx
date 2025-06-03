"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectSchema, ProjectSchemaType } from "@/schema/builder.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "@/actions/Builder/project.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const CreateProjectModal = ({ openModal, setOpenModal, resumeId }: Props) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ProjectSchemaType>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            id: "",
            name: "",
            description: "",
            date: "",
            website: "",
            summary: "",
        },
    });

    const { mutate: createProjectMutate, isPending } = useMutation({
        mutationFn: async (data: ProjectSchemaType) => {
            return await createProject(resumeId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Project has been created", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to create Project");
        },
    });

    const onSubmit = (data: ProjectSchemaType) => {
        const finalData = { ...data, id: uuidv4() };
        createProjectMutate(finalData);
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
            <DialogContent className="bg-black text-gray-300 min-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>Add a new project</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill in the form below to add an project.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-3 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Name & Description */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Name</label>
                            <input
                                {...register("name")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Description</label>
                            <input
                                {...register("description")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                    </div>

                    {/* Date & Website */}
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
                            <label className="font-semibold">Website</label>
                            <input
                                {...register("website")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
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
                        {isPending ? "Adding..." : "Add Project"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectModal;
