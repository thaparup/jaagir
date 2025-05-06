"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,

} from "@dnd-kit/core"
import { arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import * as PhosphorIcons from 'phosphor-react'

type CustomField = { id: string; name: string; value: string }

const CustomFieldItem = ({ field, onChange, listeners }: any) => {
    const { attributes, setNodeRef, transform, transition } = useSortable({ id: field.id })
    const IconComponent = (PhosphorIcons as any)[field.iconName] || PhosphorIcons['EnvelopeSimpleOpen']
    const [showIconInput, setShowIconInput] = useState<boolean>(false)
    const iconInputRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (iconInputRef.current && !iconInputRef.current.contains(event.target as Node)) {
                setShowIconInput(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <motion.div
            ref={setNodeRef}
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: transform ? `translateY(${transform.y}px)` : undefined, transition }}
            className="rounded-md shadow-md  flex items-center gap-4 bg-gray-800/60 relative mt-4"
            {...attributes}
            {...listeners}
        >
            <button className="hover:text-primary " type='button'>
                <PhosphorIcons.DotsNine size={22} />
            </button>
            <div className=''>
                <button className="hover:bg-gray-900  cursor-pointer hover:text-primary " type="button" onClick={() => setShowIconInput((prev) => !prev)}>
                    <IconComponent size={22} />
                </button>
                {showIconInput && (
                    <div ref={iconInputRef} className="flex flex-col gap-2 absolute translate-y-3">
                        <input type="text" className='outline-1 outline-white rounded-sm placeholder:text-gray-600 p-1' />
                        <span className="block text-sm text-gray-300">
                            Visit{" "}
                            <a
                                href="https://phosphoricons.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Phosphor Icons
                            </a>{" "}
                            for a list of available icons
                        </span>

                    </div>
                )}
            </div>
            <input
                className="border p-1 rounded placeholder:text-sm text-gray-300 "
                placeholder="Name"
                value={field.name}
                onChange={(e) => onChange(field.id, "name", e.target.value)}

            />
            <input
                className="border p-1 rounded placeholder:text-sm text-gray-300"
                placeholder="Value"
                value={field.value}
                onChange={(e) => onChange(field.id, "value", e.target.value)}
            />

            <button
                className="ml-auto text-red-400 hover:text-red-600"
                type="button"
                onClick={() => { }}
            >
                <PhosphorIcons.X size={20} />
            </button>
        </motion.div>
    )
}

const CustomFieldsForm = () => {
    const [fields, setFields] = useState<CustomField[]>([])

    const sensors = useSensors(useSensor(PointerSensor))

    const handleAddField = () => {
        setFields((prev) => [...prev, { id: crypto.randomUUID(), name: "", value: "" }])
    }

    const handleChange = (id: string, key: "name" | "value", value: string) => {
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
        )
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id)
            const newIndex = fields.findIndex((f) => f.id === over.id)
            setFields(arrayMove(fields, oldIndex, newIndex))
        }
    }

    return (
        <div className="bg-black">

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                    <AnimatePresence>
                        {fields.map((field) => (
                            <CustomFieldItem
                                key={field.id}
                                field={field}
                                onChange={handleChange}
                            />
                        ))}
                    </AnimatePresence>
                </SortableContext>
            </DndContext>
            <button onClick={handleAddField} className="flex gap-3 items-center text-white py-4  rounded" type="button">
                <PhosphorIcons.Plus size={20} />
                <span className="hover:underline">
                    Add a custom field
                </span>
            </button>

        </div>
    )
}

export default CustomFieldsForm
