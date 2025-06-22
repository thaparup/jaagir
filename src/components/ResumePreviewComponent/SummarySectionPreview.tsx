

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
      <h2 style={{ fontSize, color: textColor }}>Summary</h2>
      <div className="w-full h-[1px] bg-black -translate-y-1" />


      {/* 
      <div
        className="prose max-w-none"
        style={{
          fontSize,
          color: textColor,
          lineHeight,
          margin: "0px 0",
        }}
        dangerouslySetInnerHTML={{ __html: resume.summary }}
      />

      <style jsx>{`
        .prose * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          margin-bottom: 0.5em;
        }

        .prose h1 {
          font-size: 2em;
        }

        .prose h2 {
          font-size: 1.5em;
        }

        .prose h3 {
          font-size: 1.17em;
        }

        .prose p {
          margin: 0 0;
        }

        .prose strong {
          font-weight: bold;
        }

        .prose em {
          font-style: italic;
        }

        .prose s {
          text-decoration: line-through;
        }

        .prose mark {
          background-color: yellow;
        }

        .prose ul,
        .prose ol {
          padding-left: 1.5rem;
          margin: 0.5em 0;
        }

        .prose li {
          margin-bottom: 0.25rem;
        }

        .prose hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 1rem 0;
        }

        .prose p[style*="text-align: center"],
        .prose h1[style*="text-align: center"],
        .prose h2[style*="text-align: center"],
        .prose h3[style*="text-align: center"],
        .prose h4[style*="text-align: center"],
        .prose h5[style*="text-align: center"],
        .prose h6[style*="text-align: center"],
        .prose li[style*="text-align: center"] {
          text-align: center;
        }

        .prose p[style*="text-align: right"],
        .prose h1[style*="text-align: right"],
        .prose h2[style*="text-align: right"],
        .prose h3[style*="text-align: right"],
        .prose h4[style*="text-align: right"],
        .prose h5[style*="text-align: right"],
        .prose h6[style*="text-align: right"],
        .prose li[style*="text-align: right"] {
          text-align: right;
        }

        .prose p[style*="text-align: left"],
        .prose h1[style*="text-align: left"],
        .prose h2[style*="text-align: left"],
        .prose h3[style*="text-align: left"],
        .prose h4[style*="text-align: left"],
        .prose h5[style*="text-align: left"],
        .prose h6[style*="text-align: left"],
        .prose li[style*="text-align: left"] {
          text-align: left;
        }
      `}</style> */}
      {resume.summary && (
        <div
          className="prose max-w-none mt-2"
          style={{ fontSize, color: textColor, lineHeight }}
          dangerouslySetInnerHTML={{ __html: resume.summary }}
        />
      )}
      <style jsx>{`
        .prose * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          margin-bottom: 0.5em;
        }

        .prose h1 {
          font-size: 2em;
        }

        .prose h2 {
          font-size: 1.5em;
        }

        .prose h3 {
          font-size: 1.17em;
        }

        .prose p {
          margin: 0.5em 0;
        }

        .prose strong {
          font-weight: bold;
        }

        .prose em {
          font-style: italic;
        }

        .prose s {
          text-decoration: line-through;
        }

        .prose mark {
          background-color: yellow;
        }

        .prose ul,
        .prose ol {
          padding-left: 1.5rem;
          margin: 0.5em 0;
        }

        .prose li {
          margin-bottom: 0.25rem;
        }

        .prose hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 1rem 0;
        }

        .prose p[style*="text-align: center"],
        .prose h1[style*="text-align: center"],
        .prose h2[style*="text-align: center"],
        .prose h3[style*="text-align: center"],
        .prose h4[style*="text-align: center"],
        .prose h5[style*="text-align: center"],
        .prose h6[style*="text-align: center"],
        .prose li[style*="text-align: center"] {
          text-align: center;
        }

        .prose p[style*="text-align: right"],
        .prose h1[style*="text-align: right"],
        .prose h2[style*="text-align: right"],
        .prose h3[style*="text-align: right"],
        .prose h4[style*="text-align: right"],
        .prose h5[style*="text-align: right"],
        .prose h6[style*="text-align: right"],
        .prose li[style*="text-align: right"] {
          text-align: right;
        }

        .prose p[style*="text-align: left"],
        .prose h1[style*="text-align: left"],
        .prose h2[style*="text-align: left"],
        .prose h3[style*="text-align: left"],
        .prose h4[style*="text-align: left"],
        .prose h5[style*="text-align: left"],
        .prose h6[style*="text-align: left"],
        .prose li[style*="text-align: left"] {
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default SummarySectionPreview;