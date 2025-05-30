"use client";

import { Waypoints } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import ProfilesModal from "../Modals/ProfilesModal";
import { ProfileType, ResumeResponseSchemaType } from "@/schema/builder.schema";
import { List } from "phosphor-react";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DndProvider from "../DndProvider";
import { SortableItem } from "../SortableItem";
import { reorderResumeProfiles } from "@/actions/builder.action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
    resume: ResumeResponseSchemaType;
};

const ProfileSectionForm = ({ resume }: Props) => {
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState<ProfileType[] | []>(
        resume?.data?.profiles!
    );
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume?.data?.profiles) {
            setItems(resume?.data?.profiles);
        }
    }, [resume]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(prevItems, oldIndex, newIndex);

                if (mutationTimer.current) {
                    clearTimeout(mutationTimer.current);
                }

                mutationTimer.current = setTimeout(() => {
                    reorderResumeProfiles(resume?.data?.id!, { profiles: newItems });
                    queryClient.invalidateQueries({
                        queryKey: ["resumeById", resume?.data?.id],
                    });
                    toast.success("reordered");
                }, 4000);

                return newItems;
            });
        }
    }

    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Waypoints className="text-blue-500" />
                <h3 className="text-2xl font-medium text-white">Profiles</h3>
            </div>
            <DndProvider onDragEnd={handleDragEnd} items={items}>
                <div className="flex flex-col gap-4 border-4 border-red-400 p-8">
                    {items.map((profile) => (
                        <SortableItem key={profile.id} uuid={profile.id}>
                            <div className="flex items-center">
                                <div className="flex flex-col gap-1 hover:bg-gray-700/60 w-full px-6 py-3">
                                    <span className="font-semibold text-sm text-white">
                                        {profile.network}
                                    </span>
                                    <span className="font-medium text-sm text-gray-400">
                                        {profile.username || profile.url}
                                    </span>
                                </div>
                                <button type="button">
                                    {" "}
                                    <List size={24} className="text-gray-300 mr-8" />
                                </button>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </DndProvider>

            <Button
                type="button"
                onClick={() => setModal(true)}
                className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
                Add New Profile
            </Button>

            <ProfilesModal
                openModal={modal}
                setOpenModal={setModal}
                resumeId={resume.data?.id!}
            />
        </div>
    );
};

export default ProfileSectionForm;
