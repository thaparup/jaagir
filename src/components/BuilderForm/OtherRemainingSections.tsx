import React from 'react'
import ProfileSectionForm from './ProfileSectionForm'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'
import ExperienceSectionForm from './ExperienceSectionForm'
import SkillsSectionForm from './SkillsSectionForm'
import EducationSectionForm from './EducationSectionForm'
import LanguageSectionForm from './LanguageSectionForm'

type Props = {
    resume: ResumeResponseSchemaType
}

const OtherRemainingSections = ({ resume }: Props) => {


    return (
        <div>
            asdsadsad
            {/* <ProfileSectionForm resume={resume} /> */}
            {/* <ExperienceSectionForm resume={resume?.data!} /> */}
            {/* <SkillsSectionForm resume={resume?.data!} /> */}
            {/* <EducationSectionForm resume={resume?.data!} /> */}
            <LanguageSectionForm resume={resume?.data!} />
        </div>
    )
}

export default OtherRemainingSections