"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillSchema, SkillSchemaType } from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { createSkill } from "@/actions/Builder/skill.action";
import Slider from "@/components/Slider";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const CreateSkillModal = ({ resumeId, openModal, setOpenModal }: Props) => {
    const queryClient = useQueryClient();
    const [skillLevel, setSkillLevel] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SkillSchemaType>({
        resolver: zodResolver(SkillSchema),
        defaultValues: {
            id: "",
            name: "",
            description: "",
            level: null,
        },
    });

    const { mutate: createSkillMutation, isPending } = useMutation({
        mutationFn: async (data: SkillSchemaType) => {
            return await createSkill(resumeId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Skill has been created", {
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

    const onSubmit = (data: SkillSchemaType) => {
        const finalData = { ...data, level: [skillLevel], id: uuidv4() };
        createSkillMutation(finalData);
        console.log(finalData)
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
                            <span>Add a new skill</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill in the form below to add a skill.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-3 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Name & Description Field */}
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

                    {/* Level */}
                    <div className="flex flex-col gap-1 w-full text-sm py-4">
                        <label className="font-semibold">Level</label>
                        <div className="flex gap-6">
                            <Slider
                                min={0}
                                max={5}
                                step={1}
                                defaultValue={[0]}
                                value={[skillLevel]}
                                onChange={([val]) => setSkillLevel(val)}
                            />
                            <span className="text-xl font-semibold">{skillLevel}</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Adding..." : "Add Skill"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSkillModal;
