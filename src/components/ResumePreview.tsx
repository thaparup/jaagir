"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import BasicSectionPreview from "./ResumePreviewComponent/BasicSectionPreview";
import SummarySectionPreview from "./ResumePreviewComponent/SummarySectionPreview";
import useResumeStore from "@/store/zustand/resumeGlobalStyleStore";
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";

import Editor from "../components/Editor";
type Props = {
    resume: ResumeResponseSchemaType;
};

const ResumePreview = ({ resume }: Props) => {
    if (!resume.data) return null;

    const [data, setData] = useState("<p>Hello from CKEditor 5!</p>");
    return (


        <div
            style={{
                border: "1px solid red",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "white",
                color: "black"
            }}
        >
            <Editor />
        </div>


    );
};

export default ResumePreview;




