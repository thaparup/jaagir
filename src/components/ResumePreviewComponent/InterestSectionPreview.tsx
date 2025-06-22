

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
        <>
            {resume.interest!.length > 0 ? (
                <div className='mt-2'>
                    <h3 style={{ fontSize, color: textColor, fontWeight: 600 }}>Interest</h3>
                    <div className="w-full h-[1px] bg-black -translate-y-1" />
                    <div className='flex flex-col gap-6 mt-1'>
                        {resume.interest?.map((int) => (
                            <span style={{ fontSize: `${fontSize}px`, fontWeight: 600, lineHeight }}>{int.name}</span>

                        ))}
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default InterestSectionPreview
