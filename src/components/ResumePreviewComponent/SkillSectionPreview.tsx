import { ResumeSchemaType } from '@/schema/builder.schema'
import useResumeStore from '@/store/zustand/resumeGlobalStyleStore'
import React from 'react'

type Props = {
    resume: ResumeSchemaType
}



const SkillSectionPreview = ({ resume }: Props) => {
    const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore()
    console.log(resume.skills?.map((skill) => skill.level))
    return (
        <div className='mt-4'>
            <h2 style={{ fontSize, color: textColor }}>Skills</h2>
            <hr className="border-0 h-[1px] bg-gray-600" />

            <div className='flex flex-col gap-4 mt-2'>
                {resume.skills?.map((skill) => {
                    const level = skill.level?.[0] ?? 0

                    return (
                        <div key={skill.id} className='flex flex-col'>
                            <span style={{ fontSize, fontWeight: 600, lineHeight, color: textColor }}>
                                {skill.name}
                            </span>
                            <span style={{ fontSize, fontWeight: 400, lineHeight, color: textColor }}>
                                {skill.description}
                            </span>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-full border"
                                        style={{
                                            backgroundColor: i < level ? primaryColor : 'transparent',
                                            borderColor: primaryColor,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}

            </div>
            <br />

        </div>
    )
}

export default SkillSectionPreview