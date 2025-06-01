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
import { LanguageSchema, LanguageSchemaType } from "@/schema/builder.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "phosphor-react";
import { Button } from "../ui/button";
import { updateLanguage } from "@/actions/Builder/language.action";
import Slider from "../Slider";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    activeLangId: string;
    languages: LanguageSchemaType[];
};

const EditLanguageModal = ({
    resumeId,
    openModal,
    setOpenModal,
    activeLangId,
    languages,
}: Props) => {
    const queryClient = useQueryClient();
    const [activeLangIndex, setActiveLangIndex] = useState<number | null>(null);
    const [languageLevel, setLanguageLevel] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<LanguageSchemaType>({
        resolver: zodResolver(LanguageSchema),
        defaultValues: {
            id: "",
            name: "",
            level: null,
        },
    });

    useEffect(() => {
        if (languages && activeLangId) {
            const matchedIndex = languages.findIndex((lang) => lang.id === activeLangId);
            if (matchedIndex !== -1) {
                setActiveLangIndex(matchedIndex);
                const activeLang = languages[matchedIndex];
                setValue("id", activeLang.id);
                setValue("name", activeLang.name);
                setValue("level", activeLang.level);
                setValue('description', activeLang.description)
            }
        }
    }, [languages, activeLangId]);

    const { mutate: updateLangMutation, isPending } = useMutation({
        mutationFn: async (updatedLanguages: LanguageSchemaType[]) => {
            return await updateLanguage(resumeId, updatedLanguages);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Language updated");
            setOpenModal(false);
            reset();
            setActiveLangIndex(null);
        },
        onError: () => {
            toast.error("Failed to update language");
        },
    });

    const onSubmit = (data: LanguageSchemaType) => {
        if (activeLangIndex !== null) {
            const updatedLanguages = [...languages];
            updatedLanguages[activeLangIndex] = data;
            updateLangMutation(updatedLanguages);
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
                            <span>Edit Language</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Update the language name and proficiency level.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                                value={[languageLevel]}
                                onChange={([val]) => setLanguageLevel(val)}
                            />
                            <span className="text-xl font-semibold">{languageLevel}</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Updating..." : "Update Language"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditLanguageModal;
