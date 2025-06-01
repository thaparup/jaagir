"use client";

import { EducationSchemaType, ResumeSchemaType } from "@/schema/builder.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import CreateEducationModal from "../Modals/CreateEducationModal";
import DndProvider from "../DndProvider";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Trash } from "lucide-react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
    deleteEducation,
    reorderResumeEducation,
} from "@/actions/Builder/education.action";
import { toast } from "sonner";
import EditEducationModal from "../Modals/EditEducationModal";
import Alert from "../Alert";

type Props = {
    resume: ResumeSchemaType;
};

const EducationSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [educations, setEducations] = useState<EducationSchemaType[] | []>([]);
    const [activeEduId, setActiveEduId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.education) {
            setEducations(resume.education);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (educations: EducationSchemaType[]) => {
            return await deleteEducation(resume?.id!, educations);
        },
        onSuccess: () => {
            setActiveEduId("");
            setShowAlert(false);
            toast.success("Education deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveEduId("");
            setShowAlert(false);
            toast.error(
                `Error deleting education: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setEducations((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeEducation(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("reordered educations");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (eduId?: string) => {
        setActiveEduId(eduId!);
        setShowEditModal(true);
    };

    const handleDelete = (eduId?: string) => {
        if (eduId) {
            setShowAlert(true);
            setActiveEduId(eduId);
        }
    };

    const confirmDelete = () => {
        const filteredEducations = educations.filter(
            (exp) => exp.id !== activeEduId
        );
        deleteMutation.mutate(filteredEducations);
    };
    return (
        <div>
            <DndProvider onDragEnd={handleDragEnd} items={educations}>
                <div className="flex flex-col gap-4 p-8 border-4 border-red-700">
                    {educations.map((edu) => (
                        <SortableItem key={edu.id} uuid={edu.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {edu.institution}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {edu.areaOfStudy ||
                                            edu.typesOfStudy ||
                                            edu.score ||
                                            edu.date ||
                                            ""}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer ">
                                    <Menu
                                        id={edu.id}
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
                                        menuItemClassName="hover:cursor-pointer hover:!bg-gray-300 focus:!bg-gray-300 data-[highlighted]:!bg-gray-300 data-[state=open]:!bg--300 my-2 hover:!text-gray-800"
                                    />
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </DndProvider>

            <Button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-6 "
            >
                Add New Eduction
            </Button>

            <CreateEducationModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />
            <EditEducationModal
                activeEduId={activeEduId}
                educations={resume.education!}
                key={activeEduId}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />
            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your skill from the resume and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default EducationSectionForm;
