import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Minus,
    Space,
    Strikethrough,
} from "lucide-react";
import { Toggle } from "./../../components/ui/toggle";
import { Editor } from "@tiptap/react";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "./../../components/ui/tooltip";

export default function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
            tooltip: "Heading 1", // Add a tooltip text
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
            tooltip: "Heading 2",
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
            tooltip: "Heading 3",
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
            tooltip: "Bold",
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
            tooltip: "Italic",
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
            tooltip: "Strikethrough",
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
            tooltip: "Align Left",
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
            tooltip: "Align Center",
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
            tooltip: "Align Right",
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
            tooltip: "Bullet List",
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
            tooltip: "Ordered List",
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
            tooltip: "Highlight",
        },
        {
            icon: <Minus className="size-4" />,
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            preesed: editor.isActive("horizontalRule"),
            tooltip: "Horizontal Rule",
        },
        {
            icon: <Space className="size-4" />,
            onClick: () => editor.chain().focus().setHardBreak().run(),
            preesed: false,
            tooltip: "New Line (Hard Break)",
        }
    ];

    return (

        <TooltipProvider>
            <div className="border rounded-md p-1 mb-1 bg-gray-800 text-gray-200 space-x-2 z-50">
                {Options.map((option, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Toggle
                                pressed={option.preesed}
                                onPressedChange={option.onClick}
                            >
                                {option.icon}
                            </Toggle>
                        </TooltipTrigger>
                        {option.tooltip && (
                            <TooltipContent>
                                <p>{option.tooltip}</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}