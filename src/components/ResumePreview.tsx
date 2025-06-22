// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { ResumeResponseSchemaType } from "@/schema/builder.schema";
// import BasicSectionPreview from "./ResumePreviewComponent/BasicSectionPreview";
// import SummarySectionPreview from "./ResumePreviewComponent/SummarySectionPreview";
// import useResumeStore from "@/store/zustand/resumeGlobalStyleStore";
// import ProfileSectionPreview from "./ResumePreviewComponent/ProfileSectionPreview";
// import ExperienceSectionPreview from "./ResumePreviewComponent/ExperienceSectionPreview";
// import EducationSectionPreview from "./ResumePreviewComponent/EducationSectionPreview";
// import SkillSectionPreview from "./ResumePreviewComponent/SkillSectionPreview";
// import LanguageSectionPreview from "./ResumePreviewComponent/LanguageSectionPreview";
// import AwardSectionPreview from "./ResumePreviewComponent/AwardSectionPreview";
// import InterestSectionPreview from "./ResumePreviewComponent/InterestSectionPreview";
// import ProjectSectionPreview from "./ResumePreviewComponent/ProjectSectionPreview";
// import ReferenceSectionPreview from "./ResumePreviewComponent/ReferenceSectionPreview";
// import { Button } from "./ui/button";
// import html2canvas from 'html2canvas-pro';
// import jsPDF from "jspdf";
// import CVDrawer from "./CVDrawer/CVDrawer";
// import { Download, Menu } from "lucide-react";

// type Props = {
//     resume: ResumeResponseSchemaType;
// };

// const ResumePreview = ({ resume }: Props) => {
//     const { fontSize, lineHeight } = useResumeStore();
//     if (!resume.data) return null;



//     const exportPDF = async () => {

//         const el = document.getElementById("resume-preview");
//         if (!el) return;
//         console.log(el)
//         const scale = 3;
//         const canvas = await html2canvas(el, { scale, useCORS: true });

//         const imgData = canvas.toDataURL("image/png", 1.0);
//         const pdf = new jsPDF("p", "pt", "a4");

//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save("resume.pdf");
//     };



//     return (
//         <div>
//             <div className="flex justify-between pb-4 max-w-[794px]">

//                 {/* <Button onClick={exportPDF}>
//                     Download as PDF

//                 </Button> */}
//                 <Download onClick={exportPDF} className="cursor-pointer" />

//             </div>
//             <div
//                 id="resume-preview"
//                 style={{
//                     width: "794px",
//                     // height: "1123px",
//                     overflowY: 'scroll',
//                     padding: "26px 16px",
//                     background: "#fff",
//                     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//                     fontFamily: "Arial, sans-serif",
//                     fontSize: fontSize,
//                     color: "black",
//                 }}
//             >
//                 <BasicSectionPreview resume={resume} />
//                 <SummarySectionPreview resume={resume?.data} />
//                 <ProfileSectionPreview resume={resume?.data} />
//                 <EducationSectionPreview resume={resume?.data} />
//                 <ExperienceSectionPreview resume={resume?.data} />
//                 <ProjectSectionPreview resume={resume?.data} />
//                 <SkillSectionPreview resume={resume?.data} />
//                 <LanguageSectionPreview resume={resume?.data} />
//                 <AwardSectionPreview resume={resume?.data} />
//                 <InterestSectionPreview resume={resume?.data} />
//                 <ReferenceSectionPreview resume={resume?.data} />
//             </div>
//         </div>
//     );
// };

// export default ResumePreview;


"use client";

import React, { useEffect, useState } from "react";
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
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

type Props = {
    resume: ResumeResponseSchemaType;
};

const ResumePreview = ({ resume }: Props) => {
    const { fontSize } = useResumeStore();
    const [previewHeight, setPreviewHeight] = useState<number>(0);

    useEffect(() => {
        const el = document.getElementById("resume-preview");
        if (el) {
            setPreviewHeight(el.offsetHeight);
        }
    }, [resume]);

    const exportPDF = async () => {
        const el = document.getElementById("resume-preview");
        if (!el) return;
        el.classList.add("exporting");

        const scale = 4;
        const canvas = await html2canvas(el, {
            scale,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdfWidth = 595.28; // A4 width in pt
        const ratio = canvas.height / canvas.width;
        const pdfHeight = pdfWidth * ratio;

        const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");

        el.classList.add("exporting");

    };

    if (!resume?.data) return null;

    return (
        <div>
            <div className="flex justify-between pb-4 max-w-[794px]">
                <Download onClick={exportPDF} className="cursor-pointer" />
            </div>

            <div
                id="resume-preview"
                style={{
                    width: "794px", // A4 width in px (roughly)
                    padding: "26px 16px",
                    background: "#fff",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    fontFamily: "Arial, sans-serif",
                    fontSize,
                    color: "black",
                }}
            >
                <BasicSectionPreview resume={resume} />
                <SummarySectionPreview resume={resume.data} />
                <ProfileSectionPreview resume={resume.data} />
                <EducationSectionPreview resume={resume.data} />
                <ExperienceSectionPreview resume={resume.data} />
                <ProjectSectionPreview resume={resume.data} />
                <SkillSectionPreview resume={resume.data} />
                <LanguageSectionPreview resume={resume.data} />
                <AwardSectionPreview resume={resume.data} />
                <InterestSectionPreview resume={resume.data} />
                <ReferenceSectionPreview resume={resume.data} />
            </div>
        </div>
    );
};

export default ResumePreview;
