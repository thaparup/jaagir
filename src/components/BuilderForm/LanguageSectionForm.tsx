"use client";
import React, { useEffect, useRef, useState } from "react";
import { Notebook } from "phosphor-react";
import { Button } from "../ui/button";
import {
    LanguageSchemaType,
    ResumeSchemaType,
} from "@/schema/builder.schema";

import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
    deleteLanguage,
    reorderResumeLanguage,
} from "@/actions/Builder/language.action";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Trash } from "lucide-react";

import Alert from "../Alert";
import CreateLanguageModal from "../Modals/Languages/CreateLanguageModal";
import EditLanguageModal from "../Modals/Languages/EditLangauageModal";

type Props = {
    resume: ResumeSchemaType;
};

const LanguageSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [languages, setLanguages] = useState<LanguageSchemaType[]>([]);
    const [activeLangId, setActiveLangId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.languages) {
            setLanguages(resume.languages);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (languages: LanguageSchemaType[]) => {
            return await deleteLanguage(resume?.id!, languages);
        },
        onSuccess: () => {
            setActiveLangId("");
            setShowAlert(false);
            toast.success("Language deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveLangId("");
            setShowAlert(false);
            toast.error(
                `Error deleting language: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setLanguages((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeLanguage(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("Languages reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (langId?: string) => {
        setActiveLangId(langId!);
        setShowEditModal(true);
    };

    const handleDelete = (langId?: string) => {
        if (langId) {
            setShowAlert(true);
            setActiveLangId(langId);
        }
    };

    const confirmDelete = () => {
        const filtered = languages.filter((lang) => lang.id !== activeLangId);
        deleteMutation.mutate(filtered);
    };

    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Notebook />
                <h3 className="text-2xl font-medium text-white">Languages</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={languages}>
                <div className="flex flex-col gap-4 p-8 border-4 border-blue-700">
                    {languages.map((lang) => (
                        <SortableItem key={lang.id} uuid={lang.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {lang.name}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {lang.level}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer">
                                    <Menu
                                        key={activeLangId}
                                        id={lang.id}
                                        triggerLabel={<List size={20} />}
                                        items={[
                                            {
                                                label: "Edit",
                                                icon: <Pencil />,
                                                iconClassName: "",
                                                onClick: handleEdit,
                                            },
                                            {
                                                label: "Delete",
                                                icon: <Trash />,
                                                iconClassName: "",
                                                onClick: handleDelete,
                                            },
                                        ]}
                                        menuClassName="bg-black text-gray-400 shadow-lg"
                                        menuItemClassName="hover:cursor-pointer hover:!bg-gray-300 focus:!bg-gray-300 data-[highlighted]:!bg-gray-300 my-2 hover:!text-gray-800"
                                    />
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </DndProvider>

            <Button type="button" onClick={() => setShowCreateModal(true)} className="mt-6">
                Add New Language
            </Button>
            <CreateLanguageModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />


            <EditLanguageModal
                activeLangId={activeLangId}
                languages={resume.languages!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />

            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your language and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default LanguageSectionForm;
