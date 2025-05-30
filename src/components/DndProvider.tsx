"use client";
import {
    DndContext,
    closestCenter,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import React from "react";
import { ProfileType } from "@/schema/builder.schema";

type Props = {
    children: React.ReactNode;
    onDragEnd: (event: DragEndEvent) => void;
    items: ProfileType[];
};

const DndProvider = ({ children, onDragEnd, items }: Props) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};

export default DndProvider;
