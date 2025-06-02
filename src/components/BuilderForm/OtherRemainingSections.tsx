import React from 'react'
import ProfileSectionForm from './ProfileSectionForm'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'
import ExperienceSectionForm from './ExperienceSectionForm'
import SkillsSectionForm from './SkillsSectionForm'
import EducationSectionForm from './EducationSectionForm'
import LanguageSectionForm from './LanguageSectionForm'
import ProjectSectionForm from './ProjectSectionForm'
import AwardSectionForm from './AwardSectionForm'
import ReferenceSectionForm from './ReferenceSectionForm'
import InterestSectionForm from './InterestSectionForm'
import BasicCustomFieldSectionForm from './BasicCustomFieldSectionForm'

type Props = {
    resume: ResumeResponseSchemaType
}

const OtherRemainingSections = ({ resume }: Props) => {


    return (
        <div>
            <BasicCustomFieldSectionForm resume={resume?.data!} />
            asdsadsad
            {/* <ProfileSectionForm resume={resume} /> */}
            {/* <ExperienceSectionForm resume={resume?.data!} /> */}
            {/* <SkillsSectionForm resume={resume?.data!} /> */}
            {/* <EducationSectionForm resume={resume?.data!} /> */}
            {/* <LanguageSectionForm resume={resume?.data!} /> */}
            {/* <ProjectSectionForm resume={resume?.data!} /> */}
            {/* <AwardSectionForm resume={resume?.data!} /> */}
            {/* <ReferenceSectionForm resume={resume?.data!} /> */}
            {/* <InterestSectionForm resume={resume?.data!} /> */}
        </div>
    )
}

export default OtherRemainingSections