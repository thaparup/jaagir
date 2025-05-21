// import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
// import React, { useEffect } from 'react'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { AtSign, Link, MapPinCheckInside, Phone } from 'lucide-react'
// import CustomFieldsSection from '../CustomFieldsSection'
// import { ResumeResponseSchemaType } from '@/schema/builder.schema'
// import { cn } from '@/lib/utils'
// import { loadGoogleFont } from '@/lib/loadGoogleFont'


// type Props = {
//     resume: ResumeResponseSchemaType;
// };


// const BasicSectionLive = ({ resume }: Props) => {
//     const { fontSize, fontFamily, lineHeight, bgColor, textColor, primaryColor, } = useResumeGlobalStyle()
//     console.log('ff from live', fontFamily)




//     useEffect(() => {
//         if (fontFamily) {
//             loadGoogleFont(fontFamily);
//         }
//     }, [fontFamily]);
//     return (
//         <div style={{ fontSize: `${fontSize}px`, background: `${bgColor}`, fontFamily: `${fontFamily}`, lineHeight: `${lineHeight}`, color: `${textColor}`, }}
//             className='w-full overflow-hidden'
//         >
//             <div className='max-w-full p-2'>
//                 <div className="flex gap-4 ">
//                     <Avatar className={cn("h-16 w-16")}>
//                         <AvatarImage
//                             src={resume?.data?.picture || `https://i.pravatar.cc/300`}
//                         />
//                     </Avatar>
//                     <div className="flex flex-col min-w-0 flex-1">
//                         <h1 className="text-xl ">{resume?.data?.fullName}</h1>
//                         <h3 className='text-md font-light'>{resume?.data?.headLine}</h3>


//                         <div className="flex flex-wrap items-center gap-3 py-2 px-1">
//                             {resume?.data?.location && (
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-pink-500">
//                                         <MapPinCheckInside size={fontSize + 2} />
//                                     </span>
//                                     <span className="text-sm">{resume.data.location}</span>
//                                 </div>
//                             )}

//                             {resume?.data?.phoneNumber && (
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-gray-700">
//                                         <Phone size={fontSize + 2} />
//                                     </span>
//                                     <span className="text-sm">{resume.data.phoneNumber}</span>
//                                 </div>
//                             )}

//                             {resume?.data?.email && (
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-gray-700">
//                                         <AtSign size={fontSize + 2} />
//                                     </span>
//                                     <span className="text-sm">{resume.data.email}</span>
//                                 </div>
//                             )}

//                             {resume?.data?.website && (
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-gray-700">
//                                         <Link size={fontSize + 2} />
//                                     </span>
//                                     <span className="text-sm">{resume.data.website}</span>
//                                 </div>
//                             )}

//                             {resume?.data?.basicCustomField && resume?.data?.basicCustomField.length > 0 && (
//                                 <CustomFieldsSection fields={resume.data.basicCustomField} />
//                             )}
//                         </div>


//                     </div>






//                     {/* ******************* Basic Custom Fields ****************************************** */}

//                     {/* {resume?.data?.basicCustomField && resume?.data?.basicCustomField?.length > 0 &&
//                         (resume?.data?.location ||
//                             resume?.data?.phoneNumber ||
//                             resume?.data?.email ||
//                             resume?.data?.website) && (
//                             <span className="text-gray-400">|</span>
//                         )}

//                     {resume?.data?.basicCustomField && resume?.data?.basicCustomField?.length > 0 && (
//                         <div>
//                             <CustomFieldsSection fields={resume.data.basicCustomField} />
//                         </div>
//                     )} */}

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default BasicSectionLive



"use client";
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore';
import React, { useEffect } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AtSign, Link, MapPinCheckInside, Phone } from 'lucide-react';
import CustomFieldsSection from '../CustomFieldsSection';
import { ResumeResponseSchemaType } from '@/schema/builder.schema';
import { cn } from '@/lib/utils';
import { loadGoogleFont } from '@/lib/loadGoogleFont';
import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import { group } from 'console';
import { Svg, Path } from '@react-pdf/renderer';
import MapSvg from './Svgs/MapSvg';

type Props = {
    resume: ResumeResponseSchemaType;
};

const BasicSectionLive = ({ resume }: Props) => {
    const { fontSize, fontFamily, lineHeight, bgColor, textColor, primaryColor } = useResumeGlobalStyle();
    console.log('ff from live', fontSize * 0.75);

    const styles = StyleSheet.create({
        parent: {
            flexDirection: 'row',
            gap: 4,
        },
        nameHeadline: {

            flexDirection: 'column',

        },
        fullName: {
            fontSize: fontSize * 0.75,
            color: textColor,
        },
        otherText: {
            fontSize: fontSize * 0.75,
            color: textColor,
        },
        avatar: {
            width: 60,
            height: 60,
        },
        groupParent: {

        },
        group: {
            flexDirection: 'row',
            gap: 4,

        },
        groupText: {
            fontSize: fontSize * 0.75,
            color: textColor
        },
        groupIcon: {
            width: 10,
            height: 10,
            color: primaryColor,

        }
    });

    useEffect(() => {
        if (fontFamily) {
            loadGoogleFont(fontFamily);
        }
    }, [fontFamily]);


    return (

        <>
            <View style={styles.parent}>

                <Image src='/me.jpg' style={styles.avatar} />
                <View style={styles.nameHeadline}>
                    <Text style={styles.fullName}>
                        {resume.data?.fullName ? resume.data.fullName : "No Name"}
                    </Text>
                    <Text style={styles.otherText}>{resume.data?.headLine}</Text>

                    <View style={styles.groupParent}>
                        {resume?.data?.location && (
                            <View style={styles.group}>
                                <MapSvg color='red' size={20} />
                                <Text style={styles.groupText}>{resume.data?.phoneNumber}</Text>
                            </View>

                        )}
                    </View>

                </View>
            </View>
        </>
    );
};

export default BasicSectionLive;
