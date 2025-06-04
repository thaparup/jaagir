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
import { ProjectSchema, ProjectSchemaType } from "@/schema/builder.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { updateProject } from "@/actions/Builder/project.action";
import RichTextEditor from "@/components/RichTextEditor";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeProjectId: string;
    projects: ProjectSchemaType[];
};

const EditProjectModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeProjectId,
    projects,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
        null
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
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

    useEffect(() => {
        if (projects && activeProjectId) {
            const matchedIndex = projects.findIndex(
                (proj) => proj.id === activeProjectId
            );
            if (matchedIndex !== -1) {
                setActiveProjectIndex(matchedIndex);
                const activeProject = projects[matchedIndex];
                setValue("date", activeProject.date);
                setValue("description", activeProject.description);
                setValue("id", activeProject.id);
                setValue("name", activeProject.name);
                setValue("summary", activeProject.summary);
                setValue("website", activeProject.website);
            }
        }
    }, [projects, activeProjectId]);

    const { mutate: updateProjectMutation, isPending } = useMutation({
        mutationFn: async (updatedProjects: ProjectSchemaType[]) => {
            return await updateProject(resumeId, updatedProjects);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Project updated");
            setOpenModal(false);
            reset();
            setActiveProjectIndex(null);
        },
        onError: () => {
            toast.error("Failed to update project");
        },
    });

    const onSubmit = (data: ProjectSchemaType) => {
        if (activeProjectIndex !== null) {
            const updatedProjects = [...projects];
            updatedProjects[activeProjectIndex] = data;
            updateProjectMutation(updatedProjects);
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
            <DialogContent className="bg-black text-gray-300 min-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>Edit project</span>
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

export default EditProjectModal;
