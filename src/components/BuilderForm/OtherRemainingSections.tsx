import React from 'react'
import ProfileSectionForm from './ProfileSectionForm'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'
import ExperienceSectionForm from './ExperienceSectionForm'

type Props = {
    resume: ResumeResponseSchemaType
}

const OtherRemainingSections = ({ resume }: Props) => {


    return (
        <div>
            asdsadsad
            {/* <ProfileSectionForm resume={resume} /> */}
            <ExperienceSectionForm resume={resume?.data!} />
        </div>
    )
}

export default OtherRemainingSections