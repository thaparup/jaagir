"use client";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
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

import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { createProfile } from "@/actions/Builder/profile.action";
type Props = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resumeId: string;
};

const Platforms = [
    {
        name: "GitHub",
        icon: "GithubLogo",
        placeholder: "https://github.com/username",
    },
    {
        name: "LinkedIn",
        icon: "LinkedinLogo",
        placeholder: "https://linkedin.com/in/username",
    },
    { name: "Gmail", icon: "Envelope", placeholder: "your.email@gmail.com" },
    {
        name: "Twitter",
        icon: "TwitterLogo",
        placeholder: "https://twitter.com/username",
    },
    {
        name: "Website",
        icon: "GlobeSimple",
        placeholder: "https://yourwebsite.com",
    },
    {
        name: "Instagram",
        icon: "InstagramLogo",
        placeholder: "https://instagram.com/username",
    },
    {
        name: "Facebook",
        icon: "FacebookLogo",
        placeholder: "https://facebook.com/username",
    },
    {
        name: "YouTube",
        icon: "YoutubeLogo",
        placeholder: "https://youtube.com/@username",
    },
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

const CreateProfileModal = ({ openModal, setOpenModal, resumeId }: Props) => {
    const [selectedPlatform, setSelectedPlatform] = useState(Platforms[0]);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            network: selectedPlatform.name,
            username: "",
            url: "",
            icon: selectedPlatform.icon,
            id: uuidv4(),
        },
    });


    useEffect(() => {
        setValue("icon", selectedPlatform.icon);
        setValue("network", selectedPlatform.name);
        setValue("id", uuidv4());
    }, [])
    const createProfilesMutation = useMutation({
        mutationFn: async (data: ProfileType) => {
            return await createProfile(resumeId, data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Profile has been created", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            });
            setOpenModal(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to create profile");
        },
    });

    const onSubmit = (data: ProfileType) => {
        createProfilesMutation.mutate(data);
        reset();
        setOpenModal(false);
        setSelectedPlatform(Platforms[0]);
    };

    const handlePlatformSelect = (platform: (typeof Platforms)[0]) => {
        setSelectedPlatform(platform);
        setValue("icon", platform.icon);
        setValue("network", platform.name);
        setValue("id", uuidv4());
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
                }
            }}
        >
            <DialogContent className="bg-black text-gray-300 max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-4 items-center">
                            <Plus className="text-primary" />
                            <span>Add Social Profile</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Fill out the form below to add a social profile.
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Platform Selector */}
                    <div className="flex flex-col gap-2">
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
                            placeholder={selectedPlatform.placeholder}
                        />
                        {typeof errors.url?.message === "string" && (
                            <p className="text-red-500 text-sm">{errors.url.message}</p>
                        )}
                    </div>

                    {/* General form error */}
                    {errors.root && (
                        <p className="text-red-500 text-sm">{errors.root.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                    >
                        Add Profile
                    </Button>
                </form>
            </DialogContent>

        </Dialog>
    );
};

export default CreateProfileModal;
