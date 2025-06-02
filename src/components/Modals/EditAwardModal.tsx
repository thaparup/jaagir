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
import { AwardSchema, AwardSchemaType } from "@/schema/builder.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "phosphor-react";
import { Button } from "../ui/button";
import { updateAward } from "@/actions/Builder/award.action";
import RichTextEditor from "../RichTextEditor";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeAwardId: string;
    awards: AwardSchemaType[];
};

const EditAwardModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeAwardId,
    awards,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeAwardIndex, setActiveAwardIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<AwardSchemaType>({
        resolver: zodResolver(AwardSchema),
        defaultValues: {

        },
    });

    useEffect(() => {
        if (awards && activeAwardId) {
            const matchedIndex = awards.findIndex((award) => award.id === activeAwardId);
            if (matchedIndex !== -1) {
                setActiveAwardIndex(matchedIndex);
                const activeAward = awards[matchedIndex];
                setValue("id", activeAward.id);
                setValue('awarder', activeAward.awarder)
                setValue("title", activeAward.title);
                setValue('date', activeAward.date)
                setValue('summary', activeAward.summary)
                setValue('website', activeAward.website)
            }
        }
    }, [awards, activeAwardId]);

    const { mutate: updateAwardMutation, isPending } = useMutation({
        mutationFn: async (updatedAwards: AwardSchemaType[]) => {
            return await updateAward(resumeId, updatedAwards);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Award updated");
            setOpenModal(false);
            reset();
            setActiveAwardIndex(null);
        },
        onError: () => {
            toast.error("Failed to update award");
        },
    });

    const onSubmit = (data: AwardSchemaType) => {
        if (activeAwardIndex !== null) {
            const updatedAwards = [...awards];
            updatedAwards[activeAwardIndex] = data;
            updateAwardMutation(updatedAwards);
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
                            <span>Edit Award</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Update the award title, date, and description.
                    </DialogDescription>
                </DialogHeader>


                <form
                    className="flex flex-col gap-3 mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Title & Awarder Field */}
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Title</label>
                            <input
                                {...register("title")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full text-sm">
                            <label className="font-semibold">Awarder</label>
                            <input
                                {...register("awarder")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-sm placeholder:text-gray-500 px-3 py-2 w-full text-white"
                            />
                        </div>
                    </div>

                    {/* Date  */}
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
                        {isPending ? "Adding..." : "Add Award"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditAwardModal;
