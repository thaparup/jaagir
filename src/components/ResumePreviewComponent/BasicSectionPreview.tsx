import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AtSign, Link, MapPinCheckInside, Phone } from "lucide-react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import { cn } from "@/lib/utils";
import CustomFieldPreview from "./CustomFieldPreview.";
import Separator from "../Separator";

type Props = {
    resume: ResumeResponseSchemaType;
};

const BasicSectionPreview = ({ resume }: Props) => {
    const { fontSize, primaryColor, lineHeight } = useResumeGlobalStyle();

    const contactInfo = [];

    if (resume?.data?.location) {
        contactInfo.push(
            <div key="location" className="flex items-center gap-1">
                <span style={{ color: primaryColor }}>
                    <MapPinCheckInside size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize, fontWeight: 'lighter', textDecoration: 'underline' }}>{resume.data.location}</span>
            </div>
        );
    }

    if (resume?.data?.phoneNumber) {
        contactInfo.push(
            <div key="phoneNumber" className="flex items-center gap-1">
                <span style={{ color: primaryColor }}>
                    <Phone size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize, fontWeight: 'lighter', textDecoration: 'underline' }}>{resume.data.phoneNumber}</span>
            </div>
        );
    }

    if (resume?.data?.email) {
        contactInfo.push(
            <div key="email" className="flex items-center gap-1">
                <span style={{ color: primaryColor }}>
                    <AtSign size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize, fontWeight: 'lighter', textDecoration: 'underline' }}>{resume.data.email}</span>
            </div>
        );
    }

    if (resume?.data?.website) {
        contactInfo.push(
            <div key="website" className="flex items-center gap-1">
                <span style={{ color: primaryColor }}>
                    <Link size={fontSize + 2} />
                </span>
                <span style={{ fontSize: fontSize, fontWeight: 'lighter', textDecoration: 'underline' }}>{resume.data.website}</span>
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
        <div className="flex gap-4  ">
            <Avatar className={cn("rounded-none w-18 h-full")}>
                <AvatarImage
                    src={`https://res.cloudinary.com/du6xkfnmo/image/upload/v1750562391/me_dvhsdu.jpg`}
                />
            </Avatar>
            <Separator className="export-hidden" />

            <div className="flex flex-col h-full">
                <h3 style={{ lineHeight: '14px', fontWeight: 600, paddingTop: '4px' }}>
                    {resume?.data?.fullName}
                </h3>

                <Separator className="export-hidden" />

                <h6
                    style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: '15px',
                        fontWeight: "lighter",

                    }}
                >
                    {resume?.data?.headLine}
                </h6>
                <Separator className="export-hidden" />


                <div className="flex flex-wrap items-center -translate-y-1">
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

