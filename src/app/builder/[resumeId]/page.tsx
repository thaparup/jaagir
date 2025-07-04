


"use client";
import {
    fetchResumeById,
    updateResume,
} from "@/actions/Builder/builder.action";
import {
    ResumeResponseSchemaType,
    ResumeSchemaType,
} from "@/schema/builder.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import isEqual from "fast-deep-equal";
import BassicSectionForm from "@/components/BuilderForm/BasicSectionForm";
import { useFormStore } from "@/app/formStore";
import ResumePreview from "@/components/ResumePreview";
import CVDrawer from "@/components/CVDrawer/CVDrawer";
import SummarySectionForm from "@/components/BuilderForm/SummarySectionForm";
import watch from "react-hook-form";
import OtherRemainingSections from "@/components/BuilderForm/OtherRemainingSections";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const params = useParams() as { resumeId: string };
    const resumeId = params.resumeId;
    const queryClient = useQueryClient();
    const [originalData, setOriginalData] = useState<ResumeSchemaType | null>(
        null
    );
    const [currentLiveResumeData, setCurrentLiveResumeData] =
        useState<ResumeSchemaType | null>(null);

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const builderHandleFormChange = useFormStore(
        (state) => state.setHandleBuilderFormChange
    );

    const methods = useForm<ResumeSchemaType>({
        defaultValues: {},
    });

    const { getValues, reset, watch } = methods;
    const {
        data: fetchedResumeData,
        isLoading,
        error,
    } = useQuery<ResumeResponseSchemaType>({
        queryKey: ["resumeById", resumeId],
        queryFn: () => fetchResumeById(resumeId),
        enabled: !!resumeId,
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedFormData: ResumeSchemaType) => {
            return await updateResume(updatedFormData, resumeId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast.success("Resume updated successfully");
            setOriginalData(getValues());
        },
        onError: (error) => {
            toast.error(
                `Error updating resume: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
        },
    });

    useEffect(() => {
        if (fetchedResumeData) {
            reset(fetchedResumeData.data!);
            setOriginalData(fetchedResumeData.data);
        }
    }, [fetchedResumeData, reset]);

    const handleFormChange = () => {
        setIsSaving(true);

        if (mutationTimer.current) {
            clearTimeout(mutationTimer.current);
        }

        const currentFormValues = getValues();

        setCurrentLiveResumeData(currentFormValues);

        const isThereDifferenceBetweenTheOriginalDataAndTheCurrentFormValues =
            isEqual(originalData, currentFormValues);

        mutationTimer.current = setTimeout(() => {
            setIsSaving(false);
            if (!isThereDifferenceBetweenTheOriginalDataAndTheCurrentFormValues) {
                updateMutation.mutate(currentFormValues);
            }
        }, 4000);
    };

    useEffect(() => {
        builderHandleFormChange(handleFormChange);
    }, [handleFormChange, builderHandleFormChange]);

    useEffect(() => {
        if (fetchedResumeData?.data) {
            setCurrentLiveResumeData(fetchedResumeData.data);
        }
    }, [fetchedResumeData]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                Loading resume data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                Error loading resume:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
            </div>
        );
    }

    return (
        <div className="bg-black text-white flex h-screen overflow-hidden">
            {isSaving && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md z-50">
                    Saving changes...
                </div>
            )}

            <div className="w-[40%] h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <CVDrawer />

                    <FormProvider {...methods}>
                        <form className="w-full" onChange={handleFormChange}>
                            <BassicSectionForm />
                        </form>
                    </FormProvider>

                    <OtherRemainingSections resume={fetchedResumeData!} />
                </div>
            </div>

            <div className="w-[60%] h-full overflow-y-auto">
                <div className="p-4">
                    {/* <CVDrawer /> */}

                    {currentLiveResumeData && (
                        <ResumePreview
                            resume={{ data: currentLiveResumeData } as ResumeResponseSchemaType}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;