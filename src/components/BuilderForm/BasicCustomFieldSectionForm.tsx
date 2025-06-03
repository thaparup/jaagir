"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase } from "phosphor-react";
import { Button } from "../ui/button";
import {
    BasicCustomFieldType,
    ResumeSchemaType,
} from "@/schema/builder.schema";
import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import Alert from "../Alert";
import {
    deleteBasicCustomField,
    reorderBasicCustomField,
} from "@/actions/Builder/basicCustomField.action";
import CreateBasicCustomFieldModal from "../Modals/BasicCutomField/CreateBasicCustomFieldModal";
import * as PhosphorIcons from "phosphor-react";
import EditBasicCustomFieldModal from "../Modals/BasicCutomField/EditBasicCustomFieldModal";
import { Plus } from "lucide-react";

type Props = {
    resume: ResumeSchemaType;
};

const BasicCustomFieldSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [fields, setFields] = useState<BasicCustomFieldType[]>([]);
    const [activeId, setActiveId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.basicCustomField) {
            setFields(resume.basicCustomField);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (fields: BasicCustomFieldType[]) => {
            return await deleteBasicCustomField(resume.id!, fields);
        },
        onSuccess: () => {
            setActiveId("");
            setShowAlert(false);
            toast.success("Custom field deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
        },
        onError: (error) => {
            setActiveId("");
            setShowAlert(false);
            toast.error(
                `Error deleting field: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setFields((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderBasicCustomField(resume?.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.id],
                    });
                    toast.success("Custom fields reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (id?: string) => {
        setActiveId(id!);
        setShowEditModal(true);
    };

    const handleDelete = (id?: string) => {
        if (id) {
            setShowAlert(true);
            setActiveId(id);
        }
    };

    const confirmDelete = () => {
        const filtered = fields.filter((item) => item.id !== activeId);
        deleteMutation.mutate(filtered);
    };

    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Briefcase size={24} />
                <h3 className="text-2xl font-medium text-white">Custom Fields</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={fields}>
                <div className="flex flex-col gap-4">
                    {fields.map((field) => {
                        const IconComponent =
                            (PhosphorIcons as any)[field.icon] ||
                            PhosphorIcons.EnvelopeSimpleOpen;

                        return (
                            <SortableItem key={field.id} uuid={field.id}>
                                <div className="flex items-center justify-between w-full hover:bg-gray-700/60 pl-4 py-1">
                                    <div className="flex gap-4 items-center">
                                        <IconComponent size={24} className="text-primary" />

                                        <div className="flex flex-col">
                                            <span className="font-semibold">{field.name}</span>
                                            <span className="text-sm text-gray-400">
                                                {field.value}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mr-4 cursor-pointer">
                                        <Menu
                                            key={field.id}
                                            id={field.id}
                                            triggerLabel={<PhosphorIcons.List size={20} />}
                                            items={[
                                                {
                                                    label: "Edit",
                                                    icon: <PhosphorIcons.Pencil />,
                                                    iconClassName: "",
                                                    onClick: () => handleEdit(field.id),
                                                },
                                                {
                                                    label: "Delete",
                                                    icon: <PhosphorIcons.Trash />,
                                                    iconClassName: "",
                                                    onClick: () => handleDelete(field.id),
                                                },
                                            ]}
                                            menuClassName="bg-black text-gray-400 shadow-lg"
                                            menuItemClassName="hover:cursor-pointer hover:!bg-gray-300 focus:!bg-gray-300 data-[highlighted]:!bg-gray-300 my-2 hover:!text-gray-800"
                                        />
                                    </div>
                                </div>
                            </SortableItem>
                        );
                    })}
                </div>
            </DndProvider>
            <div className="flex justify-end mb-8">
                <Button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="mt-6 "
                >
                    <span>
                        <Plus />
                    </span>{" "}
                    Custom Field
                </Button>
            </div>
            <CreateBasicCustomFieldModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

            <EditBasicCustomFieldModal
                activeFieldId={activeId}
                fields={resume.basicCustomField!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />

            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your custom field and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
            <hr />
        </div>
    );
};

export default BasicCustomFieldSectionForm;
