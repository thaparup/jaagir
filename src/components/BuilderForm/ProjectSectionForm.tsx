"use client";
import React, { useEffect, useRef, useState } from "react";
import { Notebook } from "phosphor-react";
import { Button } from "../ui/button";
import { ProjectSchemaType, ResumeSchemaType } from "@/schema/builder.schema";
import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
    deleteProject,
    reorderResumeProjects,
} from "@/actions/Builder/project.action";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Trash } from "lucide-react";
import Alert from "../Alert";
import CreateProjectModal from "../Modals/Projects/CreateProjectModal";
import EditProjectModal from "../Modals/Projects/EditProjectModal";

type Props = {
    resume: ResumeSchemaType;
};

const ProjectSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [projects, setProjects] = useState<ProjectSchemaType[] | []>([]);
    const [activeProjectId, setActiveProjectId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.projects) {
            setProjects(resume.projects);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (projects: ProjectSchemaType[]) => {
            return await deleteProject(resume?.id!, projects);
        },
        onSuccess: () => {
            setActiveProjectId("");
            setShowAlert(false);
            toast.success("Project deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveProjectId("");
            setShowAlert(false);
            toast.error(
                `Error deleting project: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setProjects((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeProjects(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("Reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (projectId?: string) => {
        setActiveProjectId(projectId!);
        setShowEditModal(true);
    };

    const handleDelete = (projectId?: string) => {
        if (projectId) {
            setShowAlert(true);
            setActiveProjectId(projectId);
        }
    };

    const confirmDelete = () => {
        const filteredProjects = projects.filter(
            (proj) => proj.id !== activeProjectId
        );
        deleteMutation.mutate(filteredProjects);
    };

    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Notebook />
                <h3 className="text-2xl font-medium text-white">Projects</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={projects}>
                <div className="flex flex-col gap-4 p-8 border-4 border-red-700">
                    {projects.map((proj) => (
                        <SortableItem key={proj.id} uuid={proj.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {proj.name!}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {proj.description || proj.date || proj.website}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer">
                                    <Menu
                                        key={activeProjectId}
                                        id={proj.id}
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
                className="mt-6"
            >
                Add New Project
            </Button>

            <CreateProjectModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

            <EditProjectModal
                activeProjectId={activeProjectId}
                projects={resume.projects!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />

            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your project and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ProjectSectionForm;
