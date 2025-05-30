"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { DotsNine } from "phosphor-react";

export function SortableItem({
    children,
    uuid,
}: {
    children: React.ReactNode;
    uuid: string;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: uuid });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex border-2 border-gray-700 rounded-xs shadow-xl bg-gray-800"
        >
            <div
                {...listeners}
                className="flex justify-center items-center hover:bg-gray-700 px-4 cursor-grab active:cursor-grabbing border-r border-gray-600"
            >
                <DotsNine size={24} className="text-gray-400" />
            </div>

            {children}
        </div>
    );
}
