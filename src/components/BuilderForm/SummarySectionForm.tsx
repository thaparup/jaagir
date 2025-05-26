"use client";
import { NotebookPen } from "lucide-react";
import React from "react";
import "react-quill-new/dist/quill.snow.css";
import "ckeditor5/ckeditor5.css";
import RichTextEditor from "../RichTextEditor";

const SummarySectionForm = () => {
    return (
        <div className="px-8">
            <div className="flex gap-6 items-center">
                <NotebookPen />
                <h3 className="text-2xl font-medium">Summary</h3>
            </div>
            <div className="px-2 py-6 text-gray-800">
                <RichTextEditor />
            </div>
        </div>
    );
};

export default SummarySectionForm;
