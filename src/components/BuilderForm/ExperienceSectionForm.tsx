'use client'
import React, { useState } from 'react'

import { Notebook } from 'phosphor-react'
import { Button } from '../ui/button'
import { ResumeSchemaType } from '@/schema/builder.schema'
import CreateExperienceModal from '../Modals/CreateExperienceModal'

type Props = {
    resume: ResumeSchemaType

}

const ExperienceSectionForm = ({ resume }: Props) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    return (
        <div className="px-8">
            <div className="flex gap-6 items-center mb-6">
                <Notebook />
                <h3 className="text-2xl font-medium text-white">Experience</h3>
            </div>

            <Button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-6 "
            >
                Add New Experience
            </Button>

            <CreateExperienceModal
                openModal={showCreateModal}
                setOpenModal={setShowCreateModal}
                resumeId={resume.id!}
            />

        </div>
    )
}

export default ExperienceSectionForm