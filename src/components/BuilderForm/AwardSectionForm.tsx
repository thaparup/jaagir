"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { AwardSchemaType, ResumeSchemaType } from "@/schema/builder.schema";

import DndProvider from "../DndProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import {
    deleteAward,
    reorderResumeAward,
} from "@/actions/Builder/award.action";
import { SortableItem } from "../SortableItem";
import Menu from "../Menu";
import { List, Pencil, Trash } from "lucide-react";

import Alert from "../Alert";
import CreateAwardModal from "../Modals/Awards/CreateAwardModal";
import EditAwardModal from "../Modals/Awards/EditAwardModal";
import { Plus } from "phosphor-react";

type Props = {
    resume: ResumeSchemaType;
};

const AwardSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [awards, setAwards] = useState<AwardSchemaType[]>([]);
    const [activeAwardId, setActiveAwardId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.awards) {
            setAwards(resume.awards);
        }
    }, [resume]);

    const deleteMutation = useMutation({
        mutationFn: async (awards: AwardSchemaType[]) => {
            return await deleteAward(resume.id!, awards);
        },
        onSuccess: () => {
            setActiveAwardId("");
            setShowAlert(false);
            toast.success("Award deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume.id] });
        },
        onError: (error) => {
            setActiveAwardId("");
            setShowAlert(false);
            toast.error(
                `Error deleting award: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setAwards((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);
                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeAward(resume.id!, newItems);
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume.id],
                    });
                    toast.success("Awards reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    const handleEdit = (awardId?: string) => {
        setActiveAwardId(awardId!);
        setShowEditModal(true);
    };

    const handleDelete = (awardId?: string) => {
        if (awardId) {
            setShowAlert(true);
            setActiveAwardId(awardId);
        }
    };

    const confirmDelete = () => {
        const filtered = awards.filter((award) => award.id !== activeAwardId);
        deleteMutation.mutate(filtered);
    };

    return (
        <div className="px-8 mt-8">
            <div className="flex gap-6 items-center mb-6">
                <Trophy />
                <h3 className="text-2xl font-medium text-white">Awards</h3>
            </div>

            <DndProvider onDragEnd={handleDragEnd} items={awards}>
                <div className="flex flex-col gap-4 px-6">
                    {awards.map((award) => (
                        <SortableItem key={award.id} uuid={award.id}>
                            <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                    <span className="font-semibold text-sm text-white">
                                        {award.title}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {award.awarder || award.date || award.website}
                                    </span>
                                </div>

                                <div className="mr-4 cursor-pointer">
                                    <Menu
                                        key={activeAwardId}
                                        id={award.id}
                                        triggerLabel={<List size={20} />}
                                        items={[
                                            {
                                                label: "Edit",
                                                icon: <Pencil />,
                                                onClick: handleEdit,
                                            },
                                            {
                                                label: "Delete",
                                                icon: <Trash />,
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
                    <span><Plus /></span>Award
                </Button>
            </div>
            <CreateAwardModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

            <EditAwardModal
                activeAwardId={activeAwardId}
                awards={resume.awards!}
                openModal={showEditModal}
                setOpenModal={setShowEditModal}
                resumeId={resume.id}
            />

            <Alert
                open={showAlert}
                onOpenChange={setShowAlert}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your award and remove your data from our servers."
                cancelText="Cancel"
                actionText="Delete"
                onConfirm={confirmDelete}
            />
            <hr />
        </div>
    );
};

export default AwardSectionForm;
