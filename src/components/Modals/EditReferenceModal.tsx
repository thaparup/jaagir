"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReferenceSchema, ReferenceSchemaType } from "@/schema/builder.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "phosphor-react";
import { Button } from "../ui/button";
import { updateReference } from "@/actions/Builder/reference.action";
import RichTextEditor from "../RichTextEditor";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeReferenceId: string;
    references: ReferenceSchemaType[];
};

const EditReferenceModal = ({
    openModal,
    setOpenModal,
    resumeId,
    activeReferenceId,
    references,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeRefIndex, setActiveRefIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<ReferenceSchemaType>({
        resolver: zodResolver(ReferenceSchema),
        defaultValues: {
            id: "",
            name: "",
            description: "",
            website: "",
            summary: "",
        },
    });

    useEffect(() => {
        if (references && activeReferenceId) {
            const matchedIndex = references.findIndex(
                (ref) => ref.id === activeReferenceId
            );
            if (matchedIndex !== -1) {
                setActiveRefIndex(matchedIndex);
                const activeRef = references[matchedIndex];
                setValue("id", activeRef.id);
                setValue("name", activeRef.name);
                setValue("description", activeRef.description);
                setValue("website", activeRef.website);
                setValue("summary", activeRef.summary);
            }
        }
    }, [references, activeReferenceId, setValue]);

    const { mutate: updateReferenceMutation, isPending } = useMutation({
        mutationFn: async (updatedReferences: ReferenceSchemaType[]) => {
            return await updateReference(resumeId, updatedReferences);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Reference updated");
            setOpenModal(false);
            reset();
            setActiveRefIndex(null);
        },
        onError: () => {
            toast.error("Failed to update reference");
        },
    });

    const onSubmit = (data: ReferenceSchemaType) => {
        if (activeRefIndex !== null) {
            const updatedReferences = [...references];
            updatedReferences[activeRefIndex] = data;
            updateReferenceMutation(updatedReferences);
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
                            <Pencil className="text-primary" />
                            <span>Edit Reference</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Update the reference details below.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-3 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex gap-6">
                        {/* Name */}

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
                        {/* Description */}

                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Description</label>
                            <input
                                {...register("description")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                    </div>
                    {/* Website */}

                    <div className="flex flex-col gap-1 text-sm">
                        <label className="font-semibold">Website</label>
                        <input
                            {...register("website")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
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
                        {isPending ? "Adding..." : "Add Reference"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditReferenceModal;
