"use client";
import React, { useEffect, useRef, useState } from "react";
import { Notebook } from "phosphor-react";
import { Button } from "../ui/button";
import {
    ExperienceSchemaType,
    ResumeSchemaType,
    SkillSchemaType,
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
import { DraftingCompass, List, Pencil, Trash } from "lucide-react";
import EditExperienceModal from "../Modals/EditExperienceModal";
import Alert from "../Alert";
import CreateSkillModal from "../Modals/CreateSkillModal";
import { deleteSkill, reorderResumeSkills } from "@/actions/Builder/skill.action";
import EditSkillModal from "../Modals/EditSkillModal";

type Props = {
    resume: ResumeSchemaType;
};

const SkillsSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [skills, setSkills] = useState<SkillSchemaType[] | []>(
        []
    );
    const [activeSkillId, setActiveSkillId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.skills) {
            setSkills(resume.skills);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (skills: SkillSchemaType[]) => {
            return await deleteSkill(resume?.id!, skills);
        },
        onSuccess: () => {
            setActiveSkillId("");
            setShowAlert(false);
            toast.success("Skill deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveSkillId("");
            setShowAlert(false);
            toast.error(
                `Error deleting skill: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setSkills((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeSkills(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("reordered skills");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (skillId?: string) => {
        setActiveSkillId(skillId!);
        setShowEditModal(true);
    };

    const handleDelete = (skillId?: string) => {
        if (skillId) {
            setShowAlert(true);
            setActiveSkillId(skillId);
        }
    };

    const confirmDelete = () => {
        const filteredSkills = skills.filter((exp) => exp.id !== activeSkillId);
        deleteMutation.mutate(filteredSkills);
    };
    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <DraftingCompass />
                <h3 className="text-2xl font-medium text-white">Skills</h3>
            </div>


            <DndProvider onDragEnd={handleDragEnd} items={skills}>
                <div className="flex flex-col gap-4 p-8 border-4 border-red-700">
                    {skills.map((skill) => (
                        <SortableItem key={skill.id} uuid={skill.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {skill.name}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {skill.description || skill.level || ''}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer ">
                                    <Menu

                                        id={skill.id}
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
                Add New Skills
            </Button>

            <CreateSkillModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />


            <EditSkillModal
                activeSkillId={activeSkillId}
                skills={resume.skills!}
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

export default SkillsSectionForm;
