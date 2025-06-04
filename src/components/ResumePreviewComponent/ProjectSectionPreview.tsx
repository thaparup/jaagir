

'use client'

import { ResumeSchemaType } from '@/schema/builder.schema'
import useResumeStore from '@/store/zustand/resumeGlobalStyleStore'
import { Link } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    resume: ResumeSchemaType
}

type HoveredItem = {
    id: string,
    url: string
}

const ProjectSectionPreview = ({ resume }: Props) => {
    const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore()
    const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null)

    return (
        <div>
            <h2 style={{ fontSize, color: textColor }}>Projects</h2>
            <hr className="border-0 h-[1px] bg-gray-600" />
            <div className='flex flex-col gap-6 mt-2'>
                {resume.projects?.map((project) => (
                    <div key={project.id} className="space-y-1">
                        <div className='flex justify-between items-center'>
                            <span style={{ fontSize: `${fontSize + 2}px`, fontWeight: 600, lineHeight }}>{project.name}</span>
                            <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: 600, lineHeight }}>{project.date}</span>
                        </div>
                        <span style={{ fontSize, fontWeight: 400, lineHeight }}>{project.description}</span>


                        {project.website && (
                            <div className='relative flex gap-1'
                                onMouseEnter={() => setHoveredItem({ id: project.id, url: project.website! })}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link size={14} color={primaryColor} />
                                <span style={{ fontSize, fontWeight: 300, textDecoration: 'underline', lineHeight }}>{project.website}</span>
                                {hoveredItem?.id === project.id && (
                                    <span className='absolute top-6 left-12 bg-gray-500 text-xs text-white font-medium p-4 rounded-md z-10'>
                                        {project.website}
                                    </span>
                                )}
                            </div>
                        )}

                        {project.summary && (
                            <div
                                className="prose max-w-none mb-2"
                                style={{ fontSize, color: textColor, lineHeight }}
                                dangerouslySetInnerHTML={{ __html: project.summary }}
                            />
                        )}
                    </div>
                ))}
                {/* <br /> */}
            </div>

            <style jsx>{`
                .prose h1 {
                    font-size: 2em;
                    margin-bottom: 0.5em;
                }

                .prose h2 {
                    font-size: 1.5em;
                    margin-bottom: 0.5em;
                }

                .prose h3 {
                    font-size: 1.17em;
                    margin-bottom: 0.5em;
                }

                .prose p {
                    margin: 0.5em 0;
                }

                .prose strong {
                    font-weight: bold;
                }

                .prose em {
                    font-style: italic;
                }

                .prose s {
                    text-decoration: line-through;
                }

                .prose ul {
                    list-style-type: disc;
                    margin-left: 1.5rem;
                }

                .prose ol {
                    list-style-type: decimal;
                    margin-left: 1.5rem;
                }

                .prose li {
                    margin-bottom: 0.25rem;
                }

                .prose mark {
                    background-color: yellow;
                }

                .prose hr {
                    border: none;
                    border-top: 1px solid #ccc;
                    margin: 1rem 0;
                }

                .prose p[style*="text-align: center"] {
                    text-align: center;
                }

                .prose p[style*="text-align: right"] {
                    text-align: right;
                }

                .prose p[style*="text-align: left"] {
                    text-align: left;
                }
            `}</style>
        </div>
    )
}

export default ProjectSectionPreview
