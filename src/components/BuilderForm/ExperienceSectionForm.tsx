"use client";
import React, { useEffect, useRef, useState } from "react";
import { Notebook } from "phosphor-react";
import { Button } from "../ui/button";
import {
    ExperienceSchemaType,
    ResumeSchemaType,
} from "@/schema/builder.schema";
import CreateExperienceModal from "../Modals/CreateExperienceModal";
import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
    deleteExperience,
    reorderResumeExperiences,
} from "@/actions/Builder/experience.action";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Trash } from "lucide-react";
import EditExperienceModal from "../Modals/EditExperienceModal";
import Alert from "../Alert";

type Props = {
    resume: ResumeSchemaType;
};

const ExperienceSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [experiences, setexperiences] = useState<ExperienceSchemaType[] | []>(
        []
    );
    const [activeExpId, setActiveExpId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.experiences) {
            setexperiences(resume.experiences);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (experiences: ExperienceSchemaType[]) => {
            return await deleteExperience(resume?.id!, experiences);
        },
        onSuccess: () => {
            setActiveExpId("");
            setShowAlert(false);
            toast.success("Experience deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveExpId("");
            setShowAlert(false);
            toast.error(
                `Error deleting profile: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setexperiences((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeExperiences(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (expId?: string) => {
        console.log(`Edit clicked for profile ID: ${expId}`);
        setActiveExpId(expId!);
        setShowEditModal(true);
    };

    const handleDelete = (expId?: string) => {
        if (expId) {
            setShowAlert(true);
            setActiveExpId(expId);
        }
    };

    const confirmDelete = () => {
        const filteredExps = experiences.filter((exp) => exp.id !== activeExpId);
        deleteMutation.mutate(filteredExps);
    };
    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Notebook />
                <h3 className="text-2xl font-medium text-white">Experience</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={experiences}>
                <div className="flex flex-col gap-4 p-8 border-4 border-red-700">
                    {experiences.map((exp) => (
                        <SortableItem key={exp.id} uuid={exp.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {exp.company!}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {exp.position || exp.location || exp.website}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer ">
                                    <Menu
                                        key={exp.id}
                                        profileId={exp.id}
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
                Add New Experience
            </Button>

            <CreateExperienceModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

            <EditExperienceModal
                activeExpId={activeExpId}
                experiences={resume.experiences!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />
            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your experience and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ExperienceSectionForm;
