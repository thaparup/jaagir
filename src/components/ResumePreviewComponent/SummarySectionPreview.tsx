"use client";

import { ResumeSchemaType } from "@/schema/builder.schema";
import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
import React from "react";



type Props = {
  resume: ResumeSchemaType;
};

const SummarySectionPreview = ({ resume }: Props) => {
  const { fontSize, lineHeight, textColor } = useResumeGlobalStyle();

  if (!resume?.summary) {
    return null;
  }

  return (
    <div className="mt-4">
      <h2 style={{ fontSize: fontSize, color: textColor, }}>Summary</h2>
      <hr />
      <div
        className="summary-content"
        style={{
          fontSize: fontSize,
          margin: '8px 0',
          color: textColor,
        }}
        dangerouslySetInnerHTML={{ __html: resume.summary }}
      />
    </div>
  );
};

export default SummarySectionPreview;