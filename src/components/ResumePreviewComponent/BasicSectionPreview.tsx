// "use client";
// import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
// import React from "react";
// import CustomFieldPreview from "./CustomFieldPreview.";
// import { ResumeResponseSchemaType } from "@/schema/builder.schema";
// import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";
// import MapSvg from "./Svgs/MapSvg";
// import PhoneSvg from "./Svgs/PhoneSvg";
// import EmailSvg from "./Svgs/EmailSvg";
// import WebsiteSvg from "./Svgs/WebsiteSvg";

// type Props = {
//     resume: ResumeResponseSchemaType;
// };

// const BasicSectionPreview = ({ resume }: Props) => {
//     const { fontSize, fontFamily, textColor, primaryColor } =
//         useResumeGlobalStyle();
//     const styles = StyleSheet.create({
//         parent: {
//             flexDirection: "column",
//             gap: 4,
//         },
//         content: {
//             flexDirection: "column",
//             gap: 4,
//         },
//         fullName: {
//             fontSize: fontSize * 0.75 + 4,
//             fontWeight: 600,
//             color: textColor,
//         },
//         headline: {
//             fontSize: fontSize * 0.75,
//             color: textColor,
//         },
//         avatar: {
//             width: 60,
//             height: 60,
//         },
//         groupParent: {
//             flexDirection: "row",
//             flexWrap: "wrap",
//             marginTop: 4,
//         },
//         group: {
//             flexDirection: "row",
//             gap: 4,
//             alignItems: "center",
//             marginRight: 10,
//             marginBottom: 4,
//         },
//         groupText: {
//             fontSize: fontSize * 0.75,
//             color: textColor,
//         },
//         groupIcon: {
//             color: primaryColor,
//         },
//     });

//     const deductSvgSize = 4;
//     return (
//         <>
//             <View style={styles.parent}>
//                 <Image src="/me.jpg" style={styles.avatar} />
//                 <View style={styles.content}>
//                     <Text style={styles.fullName}>
//                         {resume.data?.fullName ? resume.data.fullName : "No Name"}
//                     </Text>
//                     <Text style={styles.headline}>{resume.data?.headLine}</Text>

//                     <View style={styles.groupParent}>
//                         {resume?.data?.location && (
//                             <View style={styles.group}>
//                                 <MapSvg color={primaryColor} size={fontSize - deductSvgSize} />
//                                 <Text style={styles.groupText}>{resume.data?.location}</Text>
//                             </View>
//                         )}

//                         <View style={styles.group}>
//                             <PhoneSvg color={primaryColor} size={fontSize - deductSvgSize} />

//                             <View
//                                 style={{
//                                     borderBottomWidth: 2 pr-6,
//                                     borderBottomColor: textColor,
//                                 }}
//                             >
//                                 <Text style={styles.groupText}>{resume.data?.phoneNumber}</Text>
//                             </View>
//                         </View>

//                         {resume?.data?.email && (
//                             <View style={styles.group}>
//                                 <EmailSvg
//                                     color={primaryColor}
//                                     size={fontSize - deductSvgSize}
//                                 />

//                                 <View
//                                     style={{
//                                         borderBottomWidth: 1,
//                                         borderBottomColor: textColor,
//                                         paddingBottom: 0,
//                                     }}
//                                 >
//                                     <Text style={styles.groupText}>{resume.data?.email}</Text>
//                                 </View>
//                             </View>
//                         )}

//                         {resume?.data?.website && (
//                             <View style={styles.group}>
//                                 <WebsiteSvg
//                                     color={primaryColor}
//                                     size={fontSize - deductSvgSize}
//                                 />

//                                 <View
//                                     style={{
//                                         borderBottomWidth: 1,
//                                         borderBottomColor: textColor,
//                                     }}
//                                 >
//                                     <Text style={styles.groupText}>{resume.data?.website}</Text>
//                                 </View>
//                             </View>
//                         )}
//                         {/* ******************* Basic Custom Fields ****************************************** */}

//                         {resume?.data?.basicCustomField &&
//                             resume?.data?.basicCustomField?.length > 0 && (
//                                 <>
//                                     <CustomFieldPreview fields={resume.data.basicCustomField} />{" "}
//                                 </>
//                             )}
//                     </View>
//                 </View>
//             </View>
//         </>
//     );
// };

// export default BasicSectionPreview;






import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
import React, { useEffect } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AtSign, Link, MapPinCheckInside, Phone } from 'lucide-react'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'
import { cn } from '@/lib/utils'
import { loadGoogleFont } from '@/lib/loadGoogleFont'
import CustomFieldPreview from './CustomFieldPreview.'


type Props = {
    resume: ResumeResponseSchemaType;
};


const BasicSectionPreview = ({ resume }: Props) => {
    const { fontSize, primaryColor } = useResumeGlobalStyle()


    console.log('primary ', primaryColor)


    return (


        <div className="flex gap-4 items-center">
            <Avatar className={cn("rounded-none w-18 h-full")} >
                <AvatarImage
                    // src={resume?.data?.picture || `https://i.pravatar.cc/300`}
                    src='/me.jpg'
                />
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1  ">
                <h1 className="text-2xl font-semibold">{resume?.data?.fullName}</h1>
                <h3 className='text-md font-light'>{resume?.data?.headLine}</h3>


                <div className="flex flex-wrap items-center ">
                    {resume?.data?.location && (
                        <div className="flex items-center gap-2 pr-6">
                            <span style={{ color: primaryColor }}>
                                <MapPinCheckInside size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.location}</span>
                        </div>
                    )}

                    {resume?.data?.phoneNumber && (
                        <div className="flex items-center gap-2 pr-6">
                            <span style={{ color: primaryColor }}>
                                <Phone size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.phoneNumber}</span>
                        </div>
                    )}

                    {resume?.data?.email && (
                        <div className="flex items-center gap-2 pr-6">
                            <span style={{ color: primaryColor }}>
                                <AtSign size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.email}</span>
                        </div>
                    )}

                    {resume?.data?.website && (
                        <div className="flex items-center gap-2 pr-6">
                            <span style={{ color: primaryColor }}>
                                <Link size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.website}</span>
                        </div>
                    )}

                    {resume?.data?.basicCustomField && resume?.data?.basicCustomField.length > 0 && (
                        <CustomFieldPreview fields={resume.data.basicCustomField} />
                    )}
                </div>


            </div>






            {/* ******************* Basic Custom Fields ****************************************** */}

            {/* {resume?.data?.basicCustomField && resume?.data?.basicCustomField?.length > 0 &&
                        (resume?.data?.location ||
                            resume?.data?.phoneNumber ||
                            resume?.data?.email ||
                            resume?.data?.website) && (
                            <span className="text-gray-400">|</span>
                        )}

                    {resume?.data?.basicCustomField && resume?.data?.basicCustomField?.length > 0 && (
                        <div>
                            <CustomFieldsSection fields={resume.data.basicCustomField} />
                        </div>
                    )} */}

        </div>



    )
}

export default BasicSectionPreview
