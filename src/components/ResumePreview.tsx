"use client";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";
import { ResumeResponseSchemaType } from "@/schema/builder.schema";
import BasicSectionLive from "./ResumeLiveComponent/BasicSectionLive";

type Props = {
    resume: ResumeResponseSchemaType;
};

// Dynamically import PDFViewer for client-side only rendering
const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
);

// Create styles
const styles = StyleSheet.create({
    page: {
        // flexDirection: 'row',
        backgroundColor: "#E4E4E4",
        margin: 4,
        padding: 4,

    },
});

const ResumePreview = ({ resume }: Props) => {
    if (!resume.data) return null;

    return (
        <div style={{ height: "100vh", background: '' }}>
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page size="A4" style={styles.page}>
                        <BasicSectionLive resume={resume} />
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ResumePreview;
