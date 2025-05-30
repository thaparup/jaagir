import React from 'react'
import ProfileSectionForm from './ProfileSectionForm'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'

type Props = {
    resume: ResumeResponseSchemaType
}

const OtherRemainingSections = ({ resume }: Props) => {


    return (
        <div>
            asdsadsad
            <ProfileSectionForm resume={resume} />
        </div>
    )
}

export default OtherRemainingSections