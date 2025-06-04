import { ResumeSchemaType } from '@/schema/builder.schema'
import useResumeStore from '@/store/zustand/resumeGlobalStyleStore'
import React from 'react'

type Props = {
    resume: ResumeSchemaType
}



const LanguageSectionPreview = ({ resume }: Props) => {
    const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore()
    return (
        <div>
            <h2 style={{ fontSize, color: textColor }}>Language</h2>
            <hr className="border-0 h-[1px] bg-gray-600" />
            <div className='flex flex-col gap-4 mt-2'>
                {resume.languages?.map((lan) => {
                    const level = lan.level?.[0] ?? 0

                    return (
                        <div className='flex flex-col' key={lan.id}>
                            <span style={{ fontSize, fontWeight: 400, lineHeight, color: textColor }}>
                                {lan.name}
                            </span>
                            <span style={{ fontSize, fontWeight: 400, lineHeight, color: textColor }}>
                                {lan.description}
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

export default LanguageSectionPreview