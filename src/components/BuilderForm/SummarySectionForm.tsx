"use client";
import { NotebookPen } from "lucide-react";
import React, { useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import "ckeditor5/ckeditor5.css";
import RichTextEditor from "../RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { ResumeSchemaType } from "@/schema/builder.schema";
import { updateSummary } from "@/actions/Builder/summary.action";
import { toast } from "sonner";
import isEqual from "fast-deep-equal";

type SummaryType = {
    summary: string;
};

type Props = {
    resume: ResumeSchemaType;
};

const SummarySectionForm = ({ resume }: Props) => {
    const queryClient = useQueryClient();
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);

    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SummaryType>({
        defaultValues: { summary: resume?.summary || "" },
    });

    const watchedSummary = watch("summary");

    useEffect(() => {
        if (resume?.summary !== undefined && resume.summary !== null) {
            setValue("summary", resume.summary);
        }
    }, [resume?.summary, setValue]);

    useEffect(() => {
        if (mutationTimer.current) {
            clearTimeout(mutationTimer.current);
        }

        const originalValue = resume?.summary || "";
        if (!isEqual(originalValue, watchedSummary)) {
            // Set a new timer
            mutationTimer.current = setTimeout(() => {
                updateMutation.mutate(watchedSummary);
            }, 3000);
        }

        return () => {
            if (mutationTimer.current) {
                clearTimeout(mutationTimer.current);
            }
        };
    }, [watchedSummary, resume?.summary]);

    const updateMutation = useMutation({
        mutationFn: async (summary: string) => {
            return await updateSummary(resume?.id!, summary);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resume?.id] });
            toast.success("Summary updated successfully");
        },
        onError: (error) => {
            toast.error(
                `Error updating resume: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    return (
        <div className="p-8">
            <div className="flex gap-6 items-center">
                <NotebookPen />
                <h3 className="text-2xl font-medium">Summary</h3>
            </div>
            <div className="px-2 py-6 text-gray-800">
                <Controller
                    name="summary"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor
                            content={field.value!}
                            onChange={field.onChange}
                            editorCss="h-[170px] overflow-y-auto px-3 py-2 bg-gray-800 text-white rounded-md"
                        />
                    )}
                />
                {errors.summary && (
                    <p className="text-red-500 text-sm">{errors.summary.message}</p>
                )}
            </div>
            <hr />
        </div>
    );
};

export default SummarySectionForm;
