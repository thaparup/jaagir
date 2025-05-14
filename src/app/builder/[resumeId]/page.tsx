// "use client";
// import { fetchResumeById, updateResume } from "@/actions/builder.action";
// import { ResumeSchema, ResumeSchemaType } from "@/schema/builder.schema";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "sonner";

// import { useDebounce } from '@uidotdev/usehooks';
// import isEqual from "fast-deep-equal";
// import BasicSection from "@/components/BuilderForm/BasicSection";
// import { JsonValue } from '@prisma/client/runtime/library';

// const Page = () => {
//     const params = useParams() as { resumeId: string };
//     const resumeId = params.resumeId;
//     const queryClient = useQueryClient();
//     const [originalData, setOriginalData] = useState<ResumeSchemaType | null>(null);
//     const [isTyping, setIsTyping] = useState(false);
//     const formChangedRef = useRef(false);

//     const methods = useForm<ResumeSchemaType>({
//         defaultValues: {}, // Optional: predefine schema-compliant empty values
//     });

//     const { reset, setValue, getValues } = methods;

//     // Instead of watching the entire form, we'll use a more targeted approach
//     const formValues = getValues();
//     const debouncedSave = useDebounce(() => {
//         if (formChangedRef.current && originalData) {
//             const currentValues = getValues();
//             const hasChanges = !isEqual(currentValues, originalData);

//             if (hasChanges) {
//                 updateMutation.mutate(currentValues);
//                 formChangedRef.current = false;
//             } else {
//                 setIsTyping(false);
//             }
//         }
//     }, 6000);

//     const { data: resume, isLoading, error } = useQuery({
//         queryKey: ["resumeById", resumeId],
//         queryFn: () => fetchResumeById(resumeId),
//         enabled: !!resumeId,
//     });

//     const updateMutation = useMutation({
//         mutationFn: async (updatedFormData: ResumeSchemaType) => {
//             return await updateResume(updatedFormData, resumeId);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
//             toast.success("Resume updated successfully");
//             // After successful update, update the original data reference
//             setOriginalData(getValues());
//             setIsTyping(false);
//         },
//         onError: (error) => {
//             toast.error(
//                 `Error updating resume: ${error instanceof Error ? error.message : "Unknown error"}`
//             );
//             setIsTyping(false);
//         },
//     });

//     type ResumeApiResponse = {
//         basicCustomField: JsonValue;
//         [key: string]: any;
//     };

//     interface CustomFieldItem {
//         icon: string;
//         name: string;
//         value: string;
//     }

//     // Helper function to check if form data has changed compared to original
//     const hasFormChanged = useCallback(() => {
//         if (!originalData) return false;
//         const currentValues = getValues();
//         return !isEqual(currentValues, originalData);
//     }, [originalData, getValues]);

//     // Handler to detect form changes
//     const handleFormChange = useCallback(() => {
//         if (!isTyping && originalData) {
//             if (hasFormChanged()) {
//                 setIsTyping(true);
//                 formChangedRef.current = true;
//                 debouncedSave();
//             }
//         }
//     }, [debouncedSave, hasFormChanged, isTyping, originalData]);

//     useEffect(() => {
//         const apiData = resume?.data as ResumeApiResponse | undefined;
//         if (!apiData) return;

//         // Create a properly typed object to assign to initialDataRef
//         const typedData: ResumeSchemaType = {
//             title: apiData.title as string || '',
//             picture: apiData.picture as string | null,
//             fullName: apiData.fullName as string | null,
//             headLine: apiData.headLine as string | null,
//             email: apiData.email as string | null,
//             website: apiData.website as string | null,
//             phoneNumber: apiData.phoneNumber as number | null,
//             location: apiData.location as string | null,
//             basicCustomField: []
//         };

//         // Set form values for all fields except basicCustomField
//         for (const [key, value] of Object.entries(apiData)) {
//             if (key !== 'basicCustomField') {
//                 setValue(key as keyof ResumeSchemaType, value as any);
//             }
//         }

//         // Handle the basicCustomField separately with proper type checking
//         if (apiData.basicCustomField) {
//             try {
//                 // Make sure it's an array
//                 const customFieldData = Array.isArray(apiData.basicCustomField)
//                     ? apiData.basicCustomField
//                     : [];

//                 // Validate and type cast each item
//                 const validCustomFields: CustomFieldItem[] = [];

//                 for (const item of customFieldData) {
//                     if (
//                         typeof item === 'object' &&
//                         item !== null &&
//                         'icon' in item &&
//                         'name' in item &&
//                         'value' in item
//                     ) {
//                         validCustomFields.push({
//                             icon: typeof item.icon === 'string' ? item.icon : String(item.icon || ''),
//                             name: typeof item.name === 'string' ? item.name : String(item.name || ''),
//                             value: typeof item.value === 'string' ? item.value : String(item.value || '')
//                         });
//                     }
//                 }

//                 // Set the validated data
//                 setValue('basicCustomField', validCustomFields);
//                 typedData.basicCustomField = validCustomFields;
//             } catch (err) {
//                 console.error('Error processing basicCustomField:', err);
//                 setValue('basicCustomField', []);
//             }
//         } else {
//             // Ensure we always set a default value
//             setValue('basicCustomField', []);
//         }

//         // Store the original data for comparison
//         setOriginalData(typedData);
//         setIsTyping(false);
//         formChangedRef.current = false;

//     }, [resume, setValue]);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 Loading resume data...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-red-500">
//                 Error loading resume:{" "}
//                 {error instanceof Error ? error.message : "Unknown error"}
//             </div>
//         );
//     }

//     return (
//         <div className="bg-black text-white">
//             {isTyping && (
//                 <div className="fixed top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md">
//                     Saving changes...
//                 </div>
//             )}
//             <FormProvider {...methods}>
//                 <form className="space-y-6 pb-10" onChange={handleFormChange}>
//                     <BasicSection />
//                 </form>
//             </FormProvider>
//         </div>
//     );
// };

// export default Page;

"use client";
import { fetchResumeById, updateResume } from "@/actions/builder.action";
import { ResumeSchemaType } from "@/schema/builder.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useDebounce } from "@uidotdev/usehooks";
import isEqual from "fast-deep-equal";
import BasicSection from "@/components/BuilderForm/BasicSection";
import { JsonValue } from "@prisma/client/runtime/library";

const Page = () => {
    const params = useParams() as { resumeId: string };
    const resumeId = params.resumeId;
    const queryClient = useQueryClient();
    const [originalData, setOriginalData] = useState<ResumeSchemaType | null>(
        null
    );
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState<ResumeSchemaType | null>(null);

    // Use a timer reference to properly track and reset the debounce timer
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const methods = useForm<ResumeSchemaType>({
        defaultValues: {},
    });

    const { setValue, getValues } = methods;

    const {
        data: resume,
        isLoading,
        error,
    } = useQuery({
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
            setIsTyping(false);
        },
        onError: (error) => {
            toast.error(
                `Error updating resume: ${error instanceof Error ? error.message : "Unknown error"
                }`
            );
            setIsTyping(false);
        },
    });

    type ResumeApiResponse = {
        basicCustomField: JsonValue;
        [key: string]: any;
    };

    interface CustomFieldItem {
        icon: string;
        name: string;
        value: string;
    }


    const saveFormData = useCallback(() => {
        const currentValues = getValues();
        if (originalData && !isEqual(currentValues, originalData)) {
            updateMutation.mutate(currentValues);
        } else {
            setIsTyping(false);
        }
    }, [getValues, originalData, updateMutation]);

    // Handler to detect form changes
    const handleFormChange = useCallback(() => {
        if (originalData) {
            const currentValues = getValues();
            const hasChanges = !isEqual(currentValues, originalData);

            if (hasChanges) {
                setIsTyping(true);

                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }

                // resets the 6-second count whenever typing occurs
                timerRef.current = setTimeout(() => {
                    saveFormData();
                    timerRef.current = null;
                }, 6000);
            }
        }
    }, [originalData, getValues, saveFormData]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const apiData = resume?.data as ResumeApiResponse | undefined;
        if (!apiData) return;

        const typedData: ResumeSchemaType = {
            title: (apiData.title as string) || "",
            picture: apiData.picture as string | null,
            fullName: apiData.fullName as string | null,
            headLine: apiData.headLine as string | null,
            email: apiData.email as string | null,
            website: apiData.website as string | null,
            phoneNumber: apiData.phoneNumber as number | null,
            location: apiData.location as string | null,
            basicCustomField: [],
        };

        for (const [key, value] of Object.entries(apiData)) {
            if (key !== "basicCustomField") {
                setValue(key as keyof ResumeSchemaType, value as any);
            }
        }

        if (apiData.basicCustomField) {
            try {
                const customFieldData = Array.isArray(apiData.basicCustomField)
                    ? apiData.basicCustomField
                    : [];

                const validCustomFields: CustomFieldItem[] = [];

                for (const item of customFieldData) {
                    if (
                        typeof item === "object" &&
                        item !== null &&
                        "icon" in item &&
                        "name" in item &&
                        "value" in item
                    ) {
                        validCustomFields.push({
                            icon:
                                typeof item.icon === "string"
                                    ? item.icon
                                    : String(item.icon || ""),
                            name:
                                typeof item.name === "string"
                                    ? item.name
                                    : String(item.name || ""),
                            value:
                                typeof item.value === "string"
                                    ? item.value
                                    : String(item.value || ""),
                        });
                    }
                }

                setValue("basicCustomField", validCustomFields);
                typedData.basicCustomField = validCustomFields;
            } catch (err) {
                console.error("Error processing basicCustomField:", err);
                setValue("basicCustomField", []);
            }
        } else {
            setValue("basicCustomField", []);
        }

        setOriginalData(typedData);
        setIsTyping(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [resume, setValue]);

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
        <div className="bg-black text-white">
            {isTyping && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md">
                    Saving changes...
                </div>
            )}
            <FormProvider {...methods}>
                <form className="space-y-6 pb-10" onChange={handleFormChange}>
                    <BasicSection />
                </form>
            </FormProvider>
        </div>
    );
};

export default Page;
