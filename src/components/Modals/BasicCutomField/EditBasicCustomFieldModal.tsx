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
    BasicCustomFieldSchema,
    BasicCustomFieldType,
} from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { updateBasicCustomField } from "@/actions/Builder/basicCustomField.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeFieldId: string;
    fields: BasicCustomFieldType[];
};

const EditBasicCustomFieldModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeFieldId,
    fields,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BasicCustomFieldType>({
        resolver: zodResolver(BasicCustomFieldSchema),
        defaultValues: {
            id: "",
            icon: "",
            name: "",
            value: "",
        },
    });

    useEffect(() => {
        if (fields && activeFieldId) {
            const matchedIndex = fields.findIndex(
                (field) => field.id === activeFieldId
            );
            if (matchedIndex !== -1) {
                const activeField = fields[matchedIndex];
                setActiveFieldIndex(matchedIndex);
                setValue("id", activeField.id);
                setValue("icon", activeField.icon);
                setValue("name", activeField.name);
                setValue("value", activeField.value);
            }
        }
    }, [fields, activeFieldId]);

    const { mutate: updateFieldMutation, isPending } = useMutation({
        mutationFn: async (updatedFields: BasicCustomFieldType[]) => {
            return await updateBasicCustomField(resumeId, updatedFields);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Custom field updated");
            setOpenModal(false);
            reset();
            setActiveFieldIndex(null);
        },
        onError: () => {
            toast.error("Failed to update custom field");
        },
    });

    const onSubmit = (data: BasicCustomFieldType) => {
        if (activeFieldIndex !== null) {
            const updatedFields = [...fields];
            updatedFields[activeFieldIndex] = data;
            updateFieldMutation(updatedFields);
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
                            <span>Edit Custom Field</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Update the icon, name, or value of this field.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-1 text-sm">
                        <label className="font-semibold">
                            Icon &nbsp;&nbsp;&nbsp; (
                            <span className="text-xs text-primary">
                                Visit{" "}
                                <a
                                    href="https://phosphoricons.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-gray-300"
                                >
                                    Phosphor Icons
                                </a>{" "}
                                for a list of available icons
                            </span>
                            )
                        </label>
                        <input
                            {...register("icon")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
                        {errors.icon && (
                            <p className="text-red-500 text-sm">{errors.icon.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <label className="font-semibold">Name</label>
                        <input
                            {...register("name")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <label className="font-semibold">Value</label>
                        <input
                            {...register("value")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
                        {errors.value && (
                            <p className="text-red-500 text-sm">{errors.value.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Updating..." : "Update Field"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBasicCustomFieldModal;
