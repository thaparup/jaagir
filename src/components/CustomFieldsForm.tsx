"use client";
import { ResumeSchemaType } from "@/schema/builder.schema";
import { User } from "lucide-react";
import * as PhosphorIcons from "phosphor-react";

import React from "react";
import {
    FieldArrayWithId,
    useFieldArray,
    useFormContext,
    UseFormRegister,
} from "react-hook-form";

type CustomField = {
    icon: string;
    name: string;
    value: string;
};

const CustomFieldsForm = () => {
    const { register, control } = useFormContext<ResumeSchemaType>();
    const { fields, append } = useFieldArray({
        name: "basicCustomField",
        keyName: "id",
        control,
    });

    return (
        <div>
            {fields.map((field, index) => {
                const IconComponent =
                    (PhosphorIcons as any)[field.icon!] || PhosphorIcons.Question;

                return (
                    <div key={field.id || index} className="flex items-center space-x-2">
                        <button className="hover:text-primary" type="button">
                            <PhosphorIcons.DotsNine size={22} />
                        </button>
                        {IconComponent && <IconComponent size={22} />}
                        <input
                            className="border p-1 rounded placeholder:text-sm text-gray-300"
                            placeholder="Name"
                            {...register(`basicCustomField.${index}.name`)}
                        />
                        <input
                            className="border p-1 rounded placeholder:text-sm text-gray-300"
                            placeholder="Value"
                            {...register(`basicCustomField.${index}.value`)}
                        />
                        <button
                            className="ml-auto text-red-400 hover:text-red-600"
                            type="button"
                            onClick={() => { }}
                        >
                            <PhosphorIcons.X size={20} />
                        </button>
                    </div>
                );
            })}

            <button
                onClick={() => append({ icon: "EnvelopeOpen", name: "", value: "" })}
                className="flex gap-3 items-center text-white py-4  rounded"
                type="button"
            >
                <PhosphorIcons.Plus size={20} />
                <span className="hover:underline">Add a custom field</span>
            </button>
        </div>
    );
};

export default CustomFieldsForm;
