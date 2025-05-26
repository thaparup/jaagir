// "use client";

// import React from "react";
// import { View, Text, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//     parent: { paddingBottom: 10 },
//     paragraph: {
//         marginBottom: 6,
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
//     heading1: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 6,
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
//     heading2: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginBottom: 6,
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
//     italic: { fontStyle: "italic" },
//     bold: { fontWeight: "bold" },
//     underline: { textDecoration: "underline" },
//     center: {
//         textAlign: "center",
//         width: "100%",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "center",
//     },
//     listItem: {
//         marginLeft: 10,
//         marginBottom: 4,
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
// });

// const getIndentStyle = (classList: DOMTokenList) => {
//     const indentClass = Array.from(classList).find((cls) =>
//         cls.startsWith("ql-indent-")
//     );

//     if (indentClass) {
//         const level = parseInt(indentClass.split("-")[2], 10);
//         if (!isNaN(level)) {
//             return { marginLeft: level * 20 };
//         }
//     }
//     return {};
// };

// const parseNode = (node: ChildNode, key: string): React.ReactNode => {
//     if (node.nodeType === Node.TEXT_NODE) {
//         return <Text key={key}>{node.textContent}</Text>;
//     }

//     if (node.nodeType === Node.ELEMENT_NODE) {
//         const el = node as HTMLElement;
//         const tag = el.tagName.toLowerCase();

//         // Skip Quill UI elements
//         if (el.classList.contains("ql-ui") && el.getAttribute("contenteditable") === "false") {
//             return null;
//         }

//         // Handle <br> tags
//         if (tag === "br") {
//             return <Text key={key}>{'\n'}</Text>;
//         }

//         const children = Array.from(el.childNodes)
//             .map((child, i) => parseNode(child, `${key}-${i}`))
//             .filter(Boolean);

//         const style = [];
//         if (tag === "strong") style.push(styles.bold);
//         if (tag === "em") style.push(styles.italic);
//         if (tag === "u") style.push(styles.underline);

//         return (
//             <Text key={key} style={style}>
//                 {children}
//             </Text>
//         );
//     }

//     return null;
// };

// const parseHTMLToPDFComponents = (html: string) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");
//     const children = Array.from(doc.body.childNodes);

//     return children.map((node, i) => {
//         const tag = node.nodeName.toUpperCase();

//         if (tag === "P" || tag === "H1" || tag === "H2") {
//             const el = node as HTMLElement;
//             const isCentered = el.classList.contains("ql-align-center");
//             const indentStyle = getIndentStyle(el.classList);

//             const inner = Array.from(el.childNodes).map((child, j) =>
//                 parseNode(child, `${i}-${j}`)
//             );

//             const baseStyle =
//                 tag === "H1"
//                     ? styles.heading1
//                     : tag === "H2"
//                         ? styles.heading2
//                         : styles.paragraph;

//             const wrapperStyle = [
//                 baseStyle,
//                 isCentered ? styles.center : {},
//                 indentStyle,
//             ];

//             return (
//                 <View key={i} style={wrapperStyle}>
//                     {inner}
//                 </View>
//             );
//         }

//         if (tag === "OL") {
//             const items = Array.from(node.childNodes).filter(
//                 (n) => n.nodeName === "LI"
//             );

//             return (
//                 <View key={i}>
//                     {items.map((li, idx) => {
//                         const el = li as HTMLElement;
//                         const indentStyle = getIndentStyle(el.classList);

//                         const content = Array.from(li.childNodes)
//                             .map((child, j) => parseNode(child, `${i}-${idx}-${j}`))
//                             .filter(Boolean);

//                         return (
//                             <View key={idx} style={[styles.listItem, indentStyle]}>
//                                 <Text>{`${idx + 1}. `}</Text>
//                                 {content}
//                             </View>
//                         );
//                     })}
//                 </View>
//             );
//         }

//         return null;
//     });
// };

// const SummarySectionPreview = () => {
//     const html = `
//         <h1 class="ql-indent-2">Indented Heading</h1>
//         <p>This is a paragraph.<br>With a line break.</p>
//         <p class="ql-indent-1">Indented paragraph</p>
//         <ol>
//             <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Cauli</li>
//             <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Radish</li>
//             <li class="ql-indent-1" data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Indented Carrot</li>
//         </ol>
//         <p class="ql-indent-2">dd</p>
//     `;

//     return <View style={styles.parent}>{parseHTMLToPDFComponents(html)}</View>;
// };

// export default SummarySectionPreview;

























import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
import React, { useEffect } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AtSign, Link, MapPinCheckInside, Phone } from 'lucide-react'
import { ResumeResponseSchemaType } from '@/schema/builder.schema'
import { cn } from '@/lib/utils'
import { loadGoogleFont } from '@/lib/loadGoogleFont'


type Props = {
    resume: ResumeResponseSchemaType;
};


const SummarySectionPreview = ({ resume }: Props) => {
    const { fontSize, lineHeight, bgColor, textColor, primaryColor, } = useResumeGlobalStyle()





    return (


        <div className="flex gap-4 ">
            <Avatar className={cn("h-16 w-16")}>
                <AvatarImage
                    src={resume?.data?.picture || `https://i.pravatar.cc/300`}
                />
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
                <h1 className="text-xl ">{resume?.data?.fullName}</h1>
                <h3 className='text-md font-light'>{resume?.data?.headLine}</h3>


                <div className="flex flex-wrap items-center gap-3 py-2 px-1">
                    {resume?.data?.location && (
                        <div className="flex items-center gap-1">
                            <span className="text-pink-500">
                                <MapPinCheckInside size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.location}</span>
                        </div>
                    )}

                    {resume?.data?.phoneNumber && (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-700">
                                <Phone size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.phoneNumber}</span>
                        </div>
                    )}

                    {resume?.data?.email && (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-700">
                                <AtSign size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.email}</span>
                        </div>
                    )}

                    {resume?.data?.website && (
                        <div className="flex items-center gap-1">
                            <span className="text-gray-700">
                                <Link size={fontSize + 2} />
                            </span>
                            <span className="text-sm">{resume.data.website}</span>
                        </div>
                    )}

                    {/* {resume?.data?.basicCustomField && resume?.data?.basicCustomField.length > 0 && (
                                <CustomFieldsSection fields={resume.data.basicCustomField} />
                            )} */}
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

export default SummarySectionPreview
