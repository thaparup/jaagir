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
const EducationSectionPreview = ({ resume }: Props) => {

  const { fontSize, textColor, primaryColor, lineHeight } = useResumeStore()
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null)

  return (
    <>
      {resume.education!.length > 0 ? (
        < div className="mt-4">

          <h2 style={{ fontSize, color: textColor, fontWeight: 600 }}>Education</h2>
          <div className="w-full h-[1px] bg-black -translate-y-1" />
          <div className='flex flex-col gap-6 mt-2'>
            {resume.education?.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className='flex justify-between items-center'>
                  <span style={{ fontSize: `${fontSize + 2}px`, fontWeight: 600, lineHeight }}>{edu.institution}</span>
                  <span style={{ fontSize: `${fontSize + 1}px`, fontWeight: 600, lineHeight }}>{edu.date}</span>
                </div>
                <div className='flex justify-between'>
                  <span style={{ fontSize, fontWeight: 400, lineHeight }}>{edu.areaOfStudy}</span>
                  <span style={{ fontSize, fontWeight: 400, lineHeight }}>{edu.typesOfStudy}</span>
                </div>
                <span style={{ fontSize, fontWeight: 400, lineHeight }}>{edu.score}</span>

                {edu.website && (
                  <div className='relative flex gap-1'
                    onMouseEnter={() => setHoveredItem({ id: edu.id, url: edu.website! })}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link size={14} color={primaryColor} />
                    <span style={{ fontSize, fontWeight: 300, textDecoration: 'underline', lineHeight }}>{edu.website}</span>
                    {hoveredItem?.id === edu.id && (
                      <span className='absolute top-6 left-12 bg-gray-500 text-xs text-white font-medium p-4 rounded-md z-10'>
                        {edu.website}
                      </span>
                    )}
                  </div>
                )}

                {edu.summary && (
                  <div
                    className="prose max-w-none mt-2"
                    style={{ fontSize, color: textColor, lineHeight }}
                    dangerouslySetInnerHTML={{ __html: edu.summary }}
                  />
                )}
              </div>
            ))}
          </div>

          <style jsx>{`
        .prose * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          margin-bottom: 0.5em;
        }

        .prose h1 {
          font-size: 2em;
        }

        .prose h2 {
          font-size: 1.5em;
        }

        .prose h3 {
          font-size: 1.17em;
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

        .prose mark {
          background-color: yellow;
        }

        .prose ul,
        .prose ol {
          padding-left: 1.5rem;
          margin: 0.5em 0;
        }

        .prose li {
          margin-bottom: 0.25rem;
        }

        .prose hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 1rem 0;
        }

        .prose p[style*="text-align: center"],
        .prose h1[style*="text-align: center"],
        .prose h2[style*="text-align: center"],
        .prose h3[style*="text-align: center"],
        .prose h4[style*="text-align: center"],
        .prose h5[style*="text-align: center"],
        .prose h6[style*="text-align: center"],
        .prose li[style*="text-align: center"] {
          text-align: center;
        }

        .prose p[style*="text-align: right"],
        .prose h1[style*="text-align: right"],
        .prose h2[style*="text-align: right"],
        .prose h3[style*="text-align: right"],
        .prose h4[style*="text-align: right"],
        .prose h5[style*="text-align: right"],
        .prose h6[style*="text-align: right"],
        .prose li[style*="text-align: right"] {
          text-align: right;
        }

        .prose p[style*="text-align: left"],
        .prose h1[style*="text-align: left"],
        .prose h2[style*="text-align: left"],
        .prose h3[style*="text-align: left"],
        .prose h4[style*="text-align: left"],
        .prose h5[style*="text-align: left"],
        .prose h6[style*="text-align: left"],
        .prose li[style*="text-align: left"] {
          text-align: left;
        }
      `}</style>
        </div>
      ) : null}
    </>
  )
}

export default EducationSectionPreview