'use client'

import { EducationSchemaType, ResumeSchemaType } from '@/schema/builder.schema';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import CreateEducationModal from '../Modals/CreateEducationModal';

type Props = {
    resume: ResumeSchemaType;

}

const EducationSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [skills, setSkills] = useState<EducationSchemaType[] | []>(
        []
    );
    const [activeEduId, setActiveEduId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const mutationTimer = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (resume.education) {
            setSkills(resume.education);
        }
    }, [resume]);

    return (
        <div>


            <Button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-6 "
            >
                Add New Eduction
            </Button>

            <CreateEducationModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

        </div>
    )
}

export default EducationSectionForm