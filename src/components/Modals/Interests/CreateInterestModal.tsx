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
import { InterestSchema, InterestSchemaType } from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { createInterest } from "@/actions/Builder/interest.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const CreateInterestModal = ({ resumeId, openModal, setOpenModal }: Props) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InterestSchemaType>({
        resolver: zodResolver(InterestSchema),
        defaultValues: {
            id: "",
            name: "",
        },
    });

    const { mutate: createInterestMutation, isPending } = useMutation({
        mutationFn: async (data: InterestSchemaType) => {
            return await createInterest(resumeId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Interest has been added");
            setOpenModal(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to create interest");
        },
    });

    const onSubmit = (data: InterestSchemaType) => {
        const finalData = { ...data, id: uuidv4() };
        createInterestMutation(finalData);
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
                            <span>Add a new interest</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill in the form below to add an interest.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-1 w-full text-sm">
                        <label className="font-semibold">Interest Name</label>
                        <input
                            {...register("name")}
                            className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Adding..." : "Add Interest"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateInterestModal;
