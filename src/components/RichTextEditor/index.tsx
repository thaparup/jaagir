"use client";

// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useEffect } from "react";
// import MenuBar from "./menu-bar";
// import TextAlign from "@tiptap/extension-text-align";
// import Highlight from "@tiptap/extension-highlight";
// import { useFormContext } from "react-hook-form";

// export default function RichTextEditor() {
//     const { register, setValue, watch } = useFormContext();

//     const editorFieldName = "summary";

//     useEffect(() => {
//         register(editorFieldName);
//     }, [register, editorFieldName]);

//     const editor = useEditor({
//         extensions: [
//             StarterKit.configure({
//                 bulletList: {
//                     HTMLAttributes: {
//                         class: "list-disc ml-3",
//                     },
//                 },
//                 orderedList: {
//                     HTMLAttributes: {
//                         class: "list-decimal ml-3",
//                     },
//                 },
//             }),
//             TextAlign.configure({
//                 types: ["heading", "paragraph"],
//             }),
//             Highlight,
//         ],
//         content: watch(editorFieldName) || "",
//         editorProps: {
//             attributes: {
//                 class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
//             },
//         },
//         onUpdate: ({ editor }) => {
//             setValue(editorFieldName, editor.getHTML(), { shouldValidate: true });
//         },
//     });

//     return (
//         <div>
//             <MenuBar editor={editor} />
//             <EditorContent editor={editor} />
//         </div>
//     );
// }



"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    editorCss: string;
}
export default function RichTextEditor({
    content,
    onChange,
    editorCss
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: editorCss,
            },
        },
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML());
            onChange(editor.getHTML());
        },
    });

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
}