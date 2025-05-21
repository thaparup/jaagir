"use client";
import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
import React from "react";
import CustomFieldsSection from "../CustomFieldsSection";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";
import MapSvg from "./Svgs/MapSvg";
import PhoneSvg from "./Svgs/PhoneSvg";
import EmailSvg from "./Svgs/EmailSvg";
import WebsiteSvg from "./Svgs/WebsiteSvg";

type Props = {
    resume: ResumeResponseSchemaType;
};

const BasicSectionPreview = ({ resume }: Props) => {
    const { fontSize, fontFamily, textColor, primaryColor } =
        useResumeGlobalStyle();
    console.log("ff from live", fontSize * 0.75);
    console.log(fontFamily.name);
    console.log(fontFamily.regular);

    const styles = StyleSheet.create({
        parent: {
            flexDirection: "row",
            gap: 4,
        },
        content: {
            flexDirection: "column",
            gap: 4,
        },
        fullName: {
            fontSize: fontSize * 0.75 + 4,
            fontWeight: 600,
            color: textColor,
        },
        headline: {
            fontSize: fontSize * 0.75,
            color: textColor,
        },
        avatar: {
            width: 60,
            height: 60,
        },
        groupParent: {
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            backgroundColor: 'black',

        },
        group: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: 'red'
        },
        groupText: {
            fontSize: fontSize * 0.75,
            color: textColor,
        },
        groupIcon: {
            color: primaryColor,
        },
    });
    const deductSvgSize = 4;
    return (
        <>
            <View style={styles.parent}>
                <Image src="/me.jpg" style={styles.avatar} />
                <View style={styles.content}>
                    <Text style={styles.fullName}>
                        {resume.data?.fullName ? resume.data.fullName : "No Name"}
                    </Text>
                    <Text style={styles.headline}>{resume.data?.headLine}</Text>

                    <View style={styles.groupParent}>
                        {resume?.data?.location && (
                            <View style={styles.group}>
                                <MapSvg color={primaryColor} size={fontSize - deductSvgSize} />
                                <Text style={styles.groupText}>{resume.data?.location}</Text>
                            </View>
                        )}

                        <View style={styles.group}>
                            <PhoneSvg color={primaryColor} size={fontSize - deductSvgSize} />

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: textColor,
                                }}
                            >
                                <Text style={styles.groupText}>{resume.data?.phoneNumber}</Text>
                            </View>
                        </View>

                        {resume?.data?.email && (
                            <View style={styles.group}>
                                <EmailSvg
                                    color={primaryColor}
                                    size={fontSize - deductSvgSize}
                                />

                                <View
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: textColor,
                                        paddingBottom: 0,
                                    }}
                                >
                                    <Text style={styles.groupText}>{resume.data?.email}</Text>
                                </View>
                            </View>
                        )}

                        {resume?.data?.website && (
                            <View style={styles.group}>
                                <WebsiteSvg
                                    color={primaryColor}
                                    size={fontSize - deductSvgSize}
                                />

                                <View
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: textColor,

                                    }}
                                >
                                    <Text style={styles.groupText}>{resume.data?.website}</Text>
                                </View>
                            </View>
                        )}
                        {/* ******************* Basic Custom Fields ****************************************** */}

                        {resume?.data?.basicCustomField &&
                            resume?.data?.basicCustomField?.length > 0 && (
                                <>
                                    <CustomFieldsSection fields={resume.data.basicCustomField} />{" "}
                                </>
                            )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default BasicSectionPreview;












