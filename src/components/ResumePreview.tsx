"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import BasicSectionPreview from "./ResumePreviewComponent/BasicSectionPreview";
import SummarySectionPreview from "./ResumePreviewComponent/SummarySectionPreview";
import useResumeStore from "@/store/zustand/resumeGlobalStyleStore";



type Props = {
    resume: ResumeResponseSchemaType;
};

const ResumePreview = ({ resume }: Props) => {
    const { fontSize, lineHeight } = useResumeStore()
    if (!resume.data) return null;

    return (





        <div
            id="resume-preview"
            style={{
                width: "794px",
                height: "1123px",
                padding: "10px",
                background: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                fontFamily: "Arial, sans-serif",
                fontSize: fontSize,
                // lineHeight: lineHeight,
                border: '2px solid red',
                color: 'black',
            }}
        >
            <BasicSectionPreview resume={resume} />
            <SummarySectionPreview resume={resume?.data!} />
        </div>

    );
};

export default ResumePreview;




