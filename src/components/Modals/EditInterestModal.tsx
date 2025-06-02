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
import { InterestSchema, InterestSchemaType } from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "phosphor-react";
import { Button } from "../ui/button";
import { updateInterest } from "@/actions/Builder/interest.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeInterestId: string;
    interests: InterestSchemaType[];
};

const EditInterestModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeInterestId,
    interests,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeInterestIndex, setActiveInterestIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<InterestSchemaType>({
        resolver: zodResolver(InterestSchema),
        defaultValues: {
            id: "",
            name: "",
        },
    });

    useEffect(() => {
        if (interests && activeInterestId) {
            const matchedIndex = interests.findIndex((item) => item.id === activeInterestId);
            if (matchedIndex !== -1) {
                setActiveInterestIndex(matchedIndex);
                const activeInterest = interests[matchedIndex];
                setValue("id", activeInterest.id);
                setValue("name", activeInterest.name);
            }
        }
    }, [interests, activeInterestId]);

    const { mutate: updateInterestMutation, isPending } = useMutation({
        mutationFn: async (updatedInterests: InterestSchemaType[]) => {
            return await updateInterest(resumeId, updatedInterests);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Interest updated");
            setOpenModal(false);
            reset();
            setActiveInterestIndex(null);
        },
        onError: () => {
            toast.error("Failed to update interest");
        },
    });

    const onSubmit = (data: InterestSchemaType) => {
        if (activeInterestIndex !== null) {
            const updatedInterests = [...interests];
            updatedInterests[activeInterestIndex] = data;
            updateInterestMutation(updatedInterests);
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
                            <span>Edit Interest</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Update the interest name.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                        {isPending ? "Updating..." : "Update Interest"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditInterestModal;
