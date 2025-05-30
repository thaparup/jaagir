"use client";

import { ResumeSchemaType } from "@/schema/builder.schema";
import * as PhosphorIcons from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import {
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { useFormStore } from "@/app/formStore";

type CustomField = {
    icon: string;
    name: string;
    value: string;
};

const CustomFieldItem = ({ field, index, register, remove, setValue }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
    const IconComponent = (PhosphorIcons as any)[field.icon] || PhosphorIcons.EnvelopeSimpleOpen;
    const [showIconInput, setShowIconInput] = useState<boolean>(false);
    const iconInputRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");


    const builderHandleFormChange = useFormStore(state => state.handleBuilderFormChange);
    const handleRemoveCustomField = (index: number) => {
        remove(index);
        builderHandleFormChange();
    };
    // Filter icons based on search term
    const filteredIcons = searchTerm
        ? Object.keys(PhosphorIcons).filter(iconName =>
            iconName.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (iconInputRef.current && !iconInputRef.current.contains(event.target as Node)) {
                setShowIconInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleIconSelect = (iconName: string) => {
        setValue(`basicCustomField.${index}.icon`, iconName);
        setShowIconInput(false);
    };

    return (
        <motion.div
            ref={setNodeRef}
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                transform: transform ? `translateY(${transform.y}px)` : undefined,
                transition
            }}
            className="rounded-md shadow-md flex items-center gap-4 bg-gray-800/60 p-3 relative mt-4"
        >
            <button
                className="hover:text-primary cursor-grab active:cursor-grabbing"
                type="button"
                {...attributes}
                {...listeners}
            >
                <PhosphorIcons.DotsNine size={22} />
            </button>

            <div className="relative">
                <button
                    className="hover:bg-gray-900 cursor-pointer hover:text-primary"
                    type="button"
                    onClick={() => setShowIconInput((prev) => !prev)}
                >
                    <IconComponent size={22} />
                </button>

                {showIconInput && (
                    <div
                        ref={iconInputRef}
                        className="flex flex-col gap-2 absolute z-10 translate-y-3 bg-gray-800 shadow-md p-3 rounded border border-gray-700 w-64"
                    >
                        <input
                            type="text"
                            className="outline-1 outline-white rounded-sm placeholder:text-gray-600 p-2 bg-gray-700 text-white"
                            placeholder="Search icons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="max-h-48 overflow-y-auto">
                            {searchTerm && filteredIcons.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {filteredIcons.slice(0, 20).map((iconName) => {
                                        const Icon = (PhosphorIcons as any)[iconName];
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                className="p-2 hover:bg-gray-700 rounded flex items-center justify-center text-white"
                                                onClick={() => handleIconSelect(iconName)}
                                            >
                                                <Icon size={20} />
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <span className="text-sm text-gray-300">
                                    {searchTerm ? "No icons found" : "Type to search icons"}
                                </span>
                            )}
                        </div>

                        <span className="text-xs text-gray-300">
                            Visit <a href="https://phosphoricons.com" target="_blank" rel="noopener noreferrer" className="underline">Phosphor Icons</a> for a list of available icons
                        </span>
                    </div>
                )}
            </div>

            <input
                className="border p-1 rounded placeholder:text-sm text-gray-300 bg-transparent"
                placeholder="Name"
                {...register(`basicCustomField.${index}.name`)}
            />
            <input
                className="border p-1 rounded placeholder:text-sm text-gray-300 bg-transparent"
                placeholder="Value"
                {...register(`basicCustomField.${index}.value`)}
            />

            <button
                className="ml-auto text-red-400 hover:text-red-600"
                type="button"
                onClick={() => handleRemoveCustomField(index)}
            >
                <PhosphorIcons.X size={20} />
            </button>
        </motion.div>
    );
};

const CustomFieldsForm = () => {
    const { register, control, setValue } = useFormContext<ResumeSchemaType>();
    const { fields, append, remove, move } = useFieldArray({
        name: "basicCustomField",
        keyName: "id",
        control,
    });

    const sensors = useSensors(useSensor(PointerSensor));


    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    return (
        <div className="bg-black p-4 rounded-lg">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={fields.map((f) => f.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <AnimatePresence>
                        {fields.map((field, index) => (
                            <CustomFieldItem
                                key={field.id}
                                field={field}
                                index={index}
                                register={register}
                                remove={remove}
                                setValue={setValue}
                            />
                        ))}
                    </AnimatePresence>
                </SortableContext>
            </DndContext>

            <button
                onClick={() => append({ icon: "EnvelopeSimpleOpen", name: "", value: "" })}
                className="flex gap-3 items-center text-white py-4 rounded"
                type="button"
            >
                <PhosphorIcons.Plus size={20} />
                <span className="hover:underline">Add a custom field</span>
            </button>
        </div>
    );
};

export default CustomFieldsForm;