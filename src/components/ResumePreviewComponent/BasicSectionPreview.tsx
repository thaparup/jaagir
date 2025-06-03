import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AtSign, Link, MapPinCheckInside, Phone } from "lucide-react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import { cn } from "@/lib/utils";
import CustomFieldPreview from "./CustomFieldPreview.";

type Props = {
    resume: ResumeResponseSchemaType;
};

const BasicSectionPreview = ({ resume }: Props) => {
    const { fontSize, primaryColor } = useResumeGlobalStyle();

    const contactInfo = [];

    if (resume?.data?.location) {
        contactInfo.push(
            <div key="location" className="flex items-center gap-2">
                <span style={{ color: primaryColor }}>
                    <MapPinCheckInside size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize }}>{resume.data.location}</span>
            </div>
        );
    }

    if (resume?.data?.phoneNumber) {
        contactInfo.push(
            <div key="phoneNumber" className="flex items-center gap-2">
                <span style={{ color: primaryColor }}>
                    <Phone size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize }}>{resume.data.phoneNumber}</span>
            </div>
        );
    }

    if (resume?.data?.email) {
        contactInfo.push(
            <div key="email" className="flex items-center gap-2">
                <span style={{ color: primaryColor }}>
                    <AtSign size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize }}>{resume.data.email}</span>
            </div>
        );
    }

    if (resume?.data?.website) {
        contactInfo.push(
            <div key="website" className="flex items-center gap-2">
                <span style={{ color: primaryColor }}>
                    <Link size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize }}>{resume.data.website}</span>
            </div>
        );
    }

    if (
        resume?.data?.basicCustomField &&
        resume.data.basicCustomField.length > 0
    ) {
        contactInfo.push(
            <div key="customFields">
                <CustomFieldPreview fields={resume.data.basicCustomField} />
            </div>
        );
    }

    return (
        <div className="flex gap-4 items-center">
            <Avatar className={cn("rounded-none w-18 h-full")}>
                <AvatarImage src="/me.jpg" />
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1  ">
                <p
                    style={{
                        fontSize: `${fontSize + 12}px`,
                        fontWeight: "bold",
                        lineHeight: "25px",
                    }}
                >
                    {resume?.data?.fullName}
                </p>
                <p
                    style={{
                        fontSize: `${fontSize + 2}px`,
                        lineHeight: "25px",
                        fontWeight: "lighter",
                    }}
                >
                    {resume?.data?.headLine}
                </p>

                <div className="flex flex-wrap items-center">
                    {contactInfo.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < contactInfo.length - 1 && (
                                <span className="text-gray-400 px-3">|</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BasicSectionPreview;
