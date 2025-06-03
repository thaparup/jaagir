"use client";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    GithubLogo,
    LinkedinLogo,
    Envelope,
    TwitterLogo,
    GlobeSimple,
    InstagramLogo,
    FacebookLogo,
    YoutubeLogo,
} from "phosphor-react";
import { ProfileSchema, ProfileType } from "@/schema/builder.schema";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/actions/Builder/profile.action";

type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
    profiles: ProfileType[];
    activeProfileId: string | null;
};

const Platforms = [
    { name: "GitHub", icon: "GithubLogo" },
    { name: "LinkedIn", icon: "LinkedinLogo" },
    { name: "Gmail", icon: "Envelope" },
    { name: "Twitter", icon: "TwitterLogo" },
    { name: "Website", icon: "GlobeSimple" },
    { name: "Instagram", icon: "InstagramLogo" },
    { name: "Facebook", icon: "FacebookLogo" },
    { name: "YouTube", icon: "YoutubeLogo" },
];

const iconMap = {
    GithubLogo: GithubLogo,
    LinkedinLogo: LinkedinLogo,
    Envelope: Envelope,
    TwitterLogo: TwitterLogo,
    GlobeSimple: GlobeSimple,
    InstagramLogo: InstagramLogo,
    FacebookLogo: FacebookLogo,
    YoutubeLogo: YoutubeLogo,
};

const EditProfileModal = ({
    openModal,
    setOpenModal,
    resumeId,
    profiles,
    activeProfileId,
}: Props) => {
    const [selectedPlatform, setSelectedPlatform] = useState(Platforms[0]);
    const [activeProfileIndex, setActiveProfileIndex] = useState<number | null>(
        null
    );
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            network: "",
            username: "",
            url: "",
            icon: "",
            id: "",
        },
    });

    useEffect(() => {
        if (profiles && activeProfileId) {
            const matchedIndex = profiles.findIndex(
                (profile) => profile.id === activeProfileId
            );
            if (matchedIndex !== -1) {
                setActiveProfileIndex(matchedIndex);
                const activeProfile = profiles[matchedIndex];
                setValue("icon", activeProfile.icon);
                setValue("username", activeProfile.username);
                setValue("url", activeProfile.url);
                setValue("id", activeProfile.id);
                setValue("network", activeProfile.network);
                const matchedPlatform = Platforms.find(
                    (p) => p.name === activeProfile.network
                );
                if (matchedPlatform) {
                    setSelectedPlatform(matchedPlatform);
                } else {
                    setSelectedPlatform(
                        Platforms.find((p) => p.icon === activeProfile.icon) || Platforms[0]
                    );
                }
            } else {
                setActiveProfileIndex(null);
                setSelectedPlatform(Platforms[0]);
                reset({ network: "", username: "", url: "", icon: "", id: "" });
            }
        } else {
            setActiveProfileIndex(null);
            setSelectedPlatform(Platforms[0]);
            reset({ network: "", username: "", url: "", icon: "", id: "" });
        }
    }, [profiles, activeProfileId, setValue, reset]);

    const updateProfileMutation = useMutation({
        mutationFn: async (updatedProfiles: ProfileType[]) => {
            return await updateProfile(resumeId, updatedProfiles);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Profile has been updated", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();
            setSelectedPlatform(Platforms[0]);
            setActiveProfileIndex(null);
        },
        onError: () => {
            toast.error("Failed to update profile");
        },
    });

    const onSubmit = (formData: ProfileType) => {
        if (activeProfileIndex !== null) {
            const updatedProfiles = [...profiles];
            updatedProfiles[activeProfileIndex] = { ...formData };
            updateProfileMutation.mutate(updatedProfiles);

            console.log(formData);
        }
    };

    const handlePlatformSelect = (platform: (typeof Platforms)[0]) => {
        setSelectedPlatform(platform);
        setValue("icon", platform.icon);
        setValue("network", platform.name);
    };

    const SelectedIcon = iconMap[selectedPlatform.icon as keyof typeof iconMap];
    return (
        <Dialog
            open={openModal}
            onOpenChange={(open) => {
                setOpenModal(open);
                if (!open) {
                    reset();
                    setSelectedPlatform(Platforms[0]);
                    setActiveProfileIndex(null);
                }
            }}
        >
            <DialogContent className="bg-black text-gray-300 max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>
                                {activeProfileIndex !== null
                                    ? "Edit Social Profile"
                                    : "Add Social Profile"}
                            </span>
                        </div>
                    </DialogTitle>

                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Platform Selector */}
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="font-semibold">Platform</label>
                            <div className="grid grid-cols-4 gap-2">
                                {Platforms.map((platform) => {
                                    const IconComponent =
                                        iconMap[platform.icon as keyof typeof iconMap];

                                    return (
                                        <button
                                            key={platform.name}
                                            type="button"
                                            onClick={() => handlePlatformSelect(platform)}
                                            className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${selectedPlatform.name === platform.name
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300"
                                                }`}
                                        >
                                            <IconComponent size={20} />
                                            <span className="text-xs font-medium">
                                                {platform.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Selected Platform Display */}
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            {SelectedIcon && (
                                <SelectedIcon className="text-primary" size={24} />
                            )}
                            <div>
                                <p className="font-semibold text-white">
                                    {selectedPlatform.name}
                                </p>
                                <p className="text-sm text-gray-400">Selected platform</p>
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Username/Handle</label>
                            <input
                                {...register("username")}
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white"
                                placeholder={
                                    selectedPlatform.name === "Gmail"
                                        ? "your.email"
                                        : "username"
                                }
                            />
                            {typeof errors.username?.message === "string" && (
                                <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* URL Field */}
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">URL/Link</label>
                            <input
                                {...register("url")}
                                type="url"
                                className="bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white"
                            />
                            {typeof errors.url?.message === "string" && (
                                <p className="text-red-500 text-sm">{errors.url.message}</p>
                            )}
                        </div>

                        {/* <input type="hidden" {...register('icon')} />
                            <input type="hidden" {...register('network')} />
                            <input type="hidden" {...register('id')} /> */}

                        {errors.root && (
                            <p className="text-red-500 text-sm">{errors.root.message}</p>
                        )}

                        <Button
                            type="submit"
                            className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        >
                            {updateProfileMutation.isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Save Profile"
                            )}
                        </Button>
                    </form>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileModal;
