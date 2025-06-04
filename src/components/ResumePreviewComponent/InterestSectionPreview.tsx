

'use client'

import { ResumeSchemaType } from '@/schema/builder.schema'
import useResumeStore from '@/store/zustand/resumeGlobalStyleStore'
import { Link } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    resume: ResumeSchemaType
}



const InterestSectionPreview = ({ resume }: Props) => {
    const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore()

    return (
        <div>
            <h2 style={{ fontSize, color: textColor }}>Interest</h2>
            <hr className="border-0 h-[1px] bg-gray-600" />
            <div className='flex flex-col gap-6 mt-2'>
                {resume.interest?.map((int) => (
                    <span style={{ fontSize: `${fontSize}px`, fontWeight: 600, lineHeight }}>{int.name}</span>

                ))}
            </div>
            <br />
        </div>
    )
}

export default InterestSectionPreview
