"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import BasicSectionPreview from "./ResumePreviewComponent/BasicSectionPreview";
import SummarySectionPreview from "./ResumePreviewComponent/SummarySectionPreview";
import useResumeStore from "@/store/zustand/resumeGlobalStyleStore";
import ProfileSectionPreview from "./ResumePreviewComponent/ProfileSectionPreview";
import ExperienceSectionPreview from "./ResumePreviewComponent/ExperienceSectionPreview";
import EducationSectionPreview from "./ResumePreviewComponent/EducationSectionPreview";
import SkillSectionPreview from "./ResumePreviewComponent/SkillSectionPreview";
import LanguageSectionPreview from "./ResumePreviewComponent/LanguageSectionPreview";
import AwardSectionPreview from "./ResumePreviewComponent/AwardSectionPreview";
import InterestSectionPreview from "./ResumePreviewComponent/InterestSectionPreview";
import ProjectSectionPreview from "./ResumePreviewComponent/ProjectSectionPreview";
import ReferenceSectionPreview from "./ResumePreviewComponent/ReferenceSectionPreview";

type Props = {
    resume: ResumeResponseSchemaType;
};

const ResumePreview = ({ resume }: Props) => {
    const { fontSize, lineHeight } = useResumeStore();
    if (!resume.data) return null;

    return (
        <div
            id="resume-preview"
            style={{
                width: "794px",
                // height: "1123px",
                // overflowY: 'scroll',
                padding: "10px",
                background: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                fontFamily: "Arial, sans-serif",
                fontSize: fontSize,
                color: "black",
            }}
        >
            <BasicSectionPreview resume={resume} />
            <SummarySectionPreview resume={resume?.data} />
            <ProfileSectionPreview resume={resume?.data} />
            <ExperienceSectionPreview resume={resume?.data} />
            <EducationSectionPreview resume={resume?.data} />
            <SkillSectionPreview resume={resume?.data} />
            <LanguageSectionPreview resume={resume?.data} />
            <AwardSectionPreview resume={resume?.data} />
            <InterestSectionPreview resume={resume?.data} />
            <ProjectSectionPreview resume={resume?.data} />
            <ReferenceSectionPreview resume={resume?.data} />
        </div>
    );
};

export default ResumePreview;
