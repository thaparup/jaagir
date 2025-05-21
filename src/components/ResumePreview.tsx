"use client";
import {
    Document,
    Page,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import BasicSectionPreview from "./ResumeLiveComponent/BasicSectionPreview";
import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";

type Props = {
    resume: ResumeResponseSchemaType;
};


const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
);



const ResumePreview = ({ resume }: Props) => {
    if (!resume.data) return null;

    const { fontFamily } = useResumeGlobalStyle()

    Font.register({ family: fontFamily.name, src: fontFamily.regular! })
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: "#E4E4E4",
            margin: 4,
            padding: 4,
            fontFamily: fontFamily.name
        },
        section: {
            fontFamily: fontFamily.name
        }
    });

    return (
        <div style={{ height: "100vh", background: '' }}>
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page size="A4" style={styles.page}>
                        <BasicSectionPreview resume={resume} />

                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ResumePreview;
