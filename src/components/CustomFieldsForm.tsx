"use client"
import React, { useState } from "react"
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
    return (
        <motion.div
            ref={setNodeRef}
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: transform ? `translateY(${transform.y}px)` : undefined, transition }}
            className=" border-2 border-red-400 rounded-md shadow-md  flex bg-black "
            {...attributes}
            {...listeners}
        >
            <button className="p-2 bg-gray-900">
                <PhosphorIcons.DotsNine />
            </button>
            <IconComponent size={24} />
            <input
                className="border p-2 rounded"
                placeholder="Name"
                value={field.name}
                onChange={(e) => onChange(field.id, "name", e.target.value)}
            />
            {/* Default or dynamic icon */}
            <input
                className="border p-2 rounded"
                placeholder="Value"
                value={field.value}
                onChange={(e) => onChange(field.id, "value", e.target.value)}
            />
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
            <button onClick={handleAddField} className="bg-blue-600 text-white px-4  rounded">
                Add More Field
            </button>

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
        </div>
    )
}

export default CustomFieldsForm
