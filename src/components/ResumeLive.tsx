import { ResumeResponseSchemaType, ResumeSchema } from '@/schema/builder.schema'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AtSign, Link, MapPinCheckInside, Phone } from 'lucide-react'
import CustomFieldsSection from './CustomFieldsSection'
import { cn } from '@/lib/utils'



type Props = {
    resume: ResumeResponseSchemaType;
};


const ResumeLive = ({ resume }: Props) => {
    if (!resume.data) return null;

    return (
        <div className="bg-white ">
            <div>
                <div className="flex gap-4 items-center ">
                    <Avatar className={cn("h-16 w-16")}>
                        <AvatarImage
                            src={resume?.data?.picture || `https://i.pravatar.cc/300`}
                        />
                    </Avatar>
                    <div className="flex flex-col gap-2 w-full text-gray-800">
                        <h1 className="">{resume?.data?.fullName}</h1>
                        <h3>{resume?.data?.headLine}</h3>

                        <div className="flex items-center gap-2 text-gray-800 divide-x-[2px] divide-x-ml-4 divide-red-600">
                            {resume?.data?.phoneNumber && (
                                <>
                                    <div className="flex gap-1 items-center px-2">
                                        <span className="text-pink-500">
                                            <Phone />
                                        </span>
                                        <span>{resume.data.phoneNumber}</span>
                                    </div>
                                </>
                            )}

                            {resume?.data?.email && (
                                <>
                                    <div className="flex gap-1 items-center px-2">
                                        <span className="text-pink-500">
                                            <AtSign />
                                        </span>
                                        <span>{resume.data.email}</span>
                                    </div>
                                </>
                            )}

                            {resume?.data?.website && (
                                <>
                                    <div className="flex gap-1 items-center px-2">
                                        <span className="text-pink-500">
                                            <Link />
                                        </span>
                                        <span>{resume.data.website}</span>
                                    </div>
                                </>
                            )}
                            {resume?.data?.website && (
                                <>
                                    <div className="flex gap-1 items-center px-2">
                                        <span className="text-pink-500">
                                            <MapPinCheckInside />
                                        </span>
                                        <span>{resume.data.location}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ******************* Basic Custom Fields ****************************************** */}
                    {resume?.data?.basicCustomField &&
                        resume?.data?.basicCustomField.length > 0 && (
                            <div>
                                <CustomFieldsSection
                                    fields={resume?.data?.basicCustomField || []}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ResumeLive