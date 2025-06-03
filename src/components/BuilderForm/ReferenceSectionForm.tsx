"use client";
import React, { useEffect, useRef, useState } from "react";
import { Notebook } from "phosphor-react";
import { Button } from "../ui/button";
import { ReferenceSchemaType, ResumeSchemaType } from "@/schema/builder.schema";

import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
    deleteReference,
    reorderResumeReference,
} from "@/actions/Builder/reference.action";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Plus, Trash } from "lucide-react";

import Alert from "../Alert";

import EditReferenceModal from "../Modals/References/EditReferenceModal";
import CreateReferenceModal from "../Modals/References/CreateReferenceModal";

type Props = {
    resume: ResumeSchemaType;
};

const ReferenceSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [references, setReferences] = useState<ReferenceSchemaType[]>([]);
    const [activeRefId, setActiveRefId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.references) {
            setReferences(resume.references);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (references: ReferenceSchemaType[]) => {
            return await deleteReference(resume?.id!, references);
        },
        onSuccess: () => {
            setActiveRefId("");
            setShowAlert(false);
            toast.success("Reference deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveRefId("");
            setShowAlert(false);
            toast.error(
                `Error deleting reference: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setReferences((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeReference(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("References reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (refId?: string) => {
        setActiveRefId(refId!);
        setShowEditModal(true);
    };

    const handleDelete = (refId?: string) => {
        if (refId) {
            setShowAlert(true);
            setActiveRefId(refId);
        }
    };

    const confirmDelete = () => {
        const filtered = references.filter((ref) => ref.id !== activeRefId);
        deleteMutation.mutate(filtered);
    };

    return (
        <div className="px-8 mt-8">
            <div className="flex gap-6 items-center mb-6">
                <Notebook />
                <h3 className="text-2xl font-medium text-white">References</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={references}>
                <div className="flex flex-col gap-4 px-6">
                    {references.map((ref) => (
                        <SortableItem key={ref.id} uuid={ref.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {ref.name}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {ref.description || ref.website}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer">
                                    <Menu
                                        key={activeRefId}
                                        id={ref.id}
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

            <div className="flex justify-end mb-8 mr-6">
                <Button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="mt-6"
                >
                    <span>
                        <Plus />
                    </span>{" "}
                    Reference
                </Button>
            </div>

            <CreateReferenceModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

            <EditReferenceModal
                activeReferenceId={activeRefId}
                references={resume.references!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />

            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your reference and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
            <hr />
        </div>
    );
};

export default ReferenceSectionForm;
