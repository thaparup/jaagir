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
import SummarySectionForm from './SummarySectionForm'

type Props = {
    resume: ResumeResponseSchemaType
}

const OtherRemainingSections = ({ resume }: Props) => {


    return (
        <div>
            <BasicCustomFieldSectionForm resume={resume?.data!} />
            <SummarySectionForm resume={resume?.data!} />
            <ProfileSectionForm resume={resume} />
            <EducationSectionForm resume={resume?.data!} />
            <ExperienceSectionForm resume={resume?.data!} />
            <SkillsSectionForm resume={resume?.data!} />
            <LanguageSectionForm resume={resume?.data!} />
            <ProjectSectionForm resume={resume?.data!} />
            <AwardSectionForm resume={resume?.data!} />
            <ReferenceSectionForm resume={resume?.data!} />
            <InterestSectionForm resume={resume?.data!} />
        </div>
    )
}

export default OtherRemainingSections