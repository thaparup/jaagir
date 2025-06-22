"use client";

import { ResumeSchemaType } from "@/schema/builder.schema";
import useResumeStore from "@/store/zustand/resumeGlobalStyleStore";
import React, { useState } from "react";
import * as PhosphorIcons from "phosphor-react";
import { IconProps } from "phosphor-react";

type Props = {
    resume: ResumeSchemaType;
};
type HoveredItem = {
    id: string;
    url: string;
};
const iconMap: Record<string, React.FC<IconProps>> = {
    GithubLogo: PhosphorIcons.GithubLogo,
    LinkedinLogo: PhosphorIcons.LinkedinLogo,
    Envelope: PhosphorIcons.Envelope,
    TwitterLogo: PhosphorIcons.TwitterLogo,
    GlobeSimple: PhosphorIcons.GlobeSimple,
    InstagramLogo: PhosphorIcons.InstagramLogo,
    FacebookLogo: PhosphorIcons.FacebookLogo,
    YoutubeLogo: PhosphorIcons.YoutubeLogo,
};

const ProfileSectionPreview = ({ resume }: Props) => {
    const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore();
    const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);

    return (
        <>
            {resume.profiles && resume.profiles?.length > 0 ? (
                <div className="mt-4">

                    <h2 style={{ fontSize, color: textColor, fontWeight: 600 }}>Profiles</h2>
                    <div className="w-full h-[1px] bg-black -translate-y-1" />

                    <div className="flex gap-8 pt-0 pb-0">
                        {resume.profiles?.map((profile, index) => {
                            const IconComponent = iconMap[profile.icon as keyof typeof iconMap];

                            return (
                                <div
                                    key={index}
                                    className="relative flex items-center gap- mb-1"
                                    onMouseEnter={() => {
                                        if (profile.url) {
                                            setHoveredItem({ id: profile.url, url: profile.url });
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredItem(null);
                                    }}
                                >
                                    {IconComponent && (
                                        <IconComponent size={20} color={primaryColor} />
                                    )}

                                    <span
                                        className="cursor-pointer underline"
                                        style={{
                                            fontSize,
                                            color: textColor,
                                            lineHeight
                                        }}
                                    >
                                        {profile.username}
                                    </span>

                                    {hoveredItem?.id === profile.url &&
                                        hoveredItem!.url === profile.url && (
                                            <span className="absolute top-6 left-12 bg-gray-500 text-xs text-white font-medium p-2 rounded-md z-10 whitespace-nowrap">
                                                {profile.url}
                                            </span>
                                        )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ProfileSectionPreview;
