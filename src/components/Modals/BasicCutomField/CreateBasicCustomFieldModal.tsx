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
import {
    BasicCustomFieldSchema,
    BasicCustomFieldType,
} from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { createBasicCustomField } from "@/actions/Builder/basicCustomField.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const CreateBasicCustomFieldModal = ({
    resumeId,
    openModal,
    setOpenModal,
}: Props) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
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

    const { mutate: createFieldMutation, isPending } = useMutation({
        mutationFn: async (data: BasicCustomFieldType) => {
            return await createBasicCustomField(resumeId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Custom field added");
            setOpenModal(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to add custom field");
        },
    });

    const onSubmit = (data: BasicCustomFieldType) => {
        const finalData = { ...data, id: uuidv4() };
        createFieldMutation(finalData);
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
                            <span>Add a custom field</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill in the form to add a basic custom field.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2 text-sm">
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
                            placeholder="e.g. HouseLine, EnvelopeSimpleOpen"
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
                        {errors.icon && (
                            <p className="text-red-500 text-sm">{errors.icon.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <label className="font-semibold">Name</label>
                        <input
                            {...register("name")}
                            placeholder="e.g. House No."
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 text-white"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <label className="font-semibold">Value</label>
                        <input
                            {...register("value")}
                            placeholder="e.g. 355H"
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
                        {isPending ? "Adding..." : "Add Custom Field"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBasicCustomFieldModal;
