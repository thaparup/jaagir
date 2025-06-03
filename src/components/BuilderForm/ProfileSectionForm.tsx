"use client";

import { Pencil, Plus, Trash, Waypoints } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ProfileType, ResumeResponseSchemaType } from "@/schema/builder.schema";
import { List } from "phosphor-react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DndProvider from "../DndProvider";
import { SortableItem } from "../SortableItem";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Menu from "../Menu";
import {
    deleteProfile,
    reorderResumeProfiles,
} from "@/actions/Builder/profile.action";
import CreateProfileModal from "../Modals/Profiles/CreateProfileModal";
import EditProfileModal from "../Modals/Profiles/EditProfileModal";

type Props = {
    resume: ResumeResponseSchemaType;
};

const ProfileSectionForm = ({ resume }: Props) => {
    const [modal, setModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [activeProfileId, setActiveProfileId] = useState("");
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

    const deleteMutation = useMutation({
        mutationFn: async (profile: ProfileType[]) => {
            console.log("from mutation", profile.length);
            console.log(profile);
            return await deleteProfile(resume?.data?.id!, profile);
        },
        onSuccess: () => {
            toast.success("Profile deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["resumeById", resume?.data?.id],
            });
        },
        onError: (error) => {
            toast.error(
                `Error deleting profile: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    const handleEdit = (profileId?: string) => {
        setActiveProfileId(profileId!);
        setShowEditProfileModal(true);
    };

    const handleDelete = (profileId?: string) => {
        if (profileId) {
            const filteredProfiles = items.filter(
                (profile) => profile.id !== profileId
            );
            deleteMutation.mutate(filteredProfiles);
        }
    };

    return (
        <div className="px-8">
            <div className="flex gap-6 items-center ">
                <Waypoints className="" />
                <h3 className="text-2xl font-medium text-white">Profiles</h3>
            </div>
            {resume?.data?.profiles?.length ? (<>
                <DndProvider onDragEnd={handleDragEnd} items={items}>
                    <div className="flex flex-col gap-4 p-6 ">
                        {items.map((profile) => (
                            <SortableItem key={profile.id} uuid={profile.id}>
                                <div className="flex items-center justify-between w-full hover:bg-gray-700/60">
                                    <div className="flex flex-col gap-1 px-6 py-3 w-full">
                                        <span className="font-semibold text-sm text-white">
                                            {profile.network!}
                                        </span>
                                        <span className="font-medium text-sm text-gray-400">
                                            {profile.username || profile.url}
                                        </span>
                                    </div>

                                    <div className="mr-4 cursor-pointer ">
                                        <Menu
                                            key={activeProfileId}
                                            id={profile.id}
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
            </>) : "No profiles yet!"}


            <div className="flex justify-end mb-8 mr-6">
                <Button type="button" onClick={() => setModal(true)}>
                    <span>
                        <Plus />
                    </span>{" "}
                    Custom Field
                </Button>
            </div>
            <CreateProfileModal
                openModal={modal}
                setOpenModal={setModal}
                resumeId={resume.data?.id!}
            />

            <EditProfileModal
                openModal={showEditProfileModal}
                setOpenModal={setShowEditProfileModal}
                profiles={resume?.data?.profiles!}
                activeProfileId={activeProfileId}
                resumeId={resume?.data?.id!}
            />
            <hr />
        </div>
    );
};

export default ProfileSectionForm;
