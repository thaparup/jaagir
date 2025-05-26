"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,

} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

// -------------------- Styles --------------------

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
);
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    paragraph: {
        marginBottom: 10,
    },
    heading1: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listItem: {
        marginLeft: 10,
        marginBottom: 5,
    },
    hugeText: {
        fontSize: 32,
    },
});

// -------------------- HTML to PDF conversion --------------------


const htmlToPdfElements = (nodeList: NodeListOf<ChildNode>): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];

    nodeList.forEach((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text) {
                elements.push(<Text key={index}>{text}</Text>);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const nodeName = node.nodeName;
            const children = htmlToPdfElements(element.childNodes);

            switch (nodeName) {
                case "P":
                    elements.push(
                        <Text key={index} style={styles.paragraph}>
                            {children}
                        </Text>
                    );
                    break;
                case "H1":
                    elements.push(
                        <Text key={index} style={styles.heading1}>
                            {children}
                        </Text>
                    );
                    break;
                case "LI":
                    elements.push(
                        <Text key={index} style={styles.listItem}>
                            • {children}
                        </Text>
                    );
                    break;
                case "SPAN":
                    if (element.classList.contains("ql-size-huge")) {
                        elements.push(
                            <Text key={index} style={styles.hugeText}>
                                {children}
                            </Text>
                        );
                    } else {
                        elements.push(<Text key={index}>{children}</Text>);
                    }
                    break;
                case "STRONG":

                    elements.push(
                        <Text key={index} style={{ fontWeight: 700 }}>
                            {children}
                        </Text>
                    );
                    break;
                default:
                    elements.push(<Text key={index}>{children}</Text>);
            }
        }
    });

    return elements;
};









// -------------------- Main Component --------------------



const ProductPage = () => {
    const [pdfContent, setPdfContent] = useState<React.ReactNode[] | null>(null);

    useEffect(() => {
        toast("Product page");

        const htmlString = `
      <p>This is paragraph</p>
      <h1>Hello world</h1>
      <li>List item one</li>
      <p><span class="ql-size-huge">Huge Text</span></p>
      <h1><strong>Bold Heading1</strong></h1> 
    `;

        const parser = new DOMParser();
        const parsedData = parser.parseFromString(htmlString, "text/html");
        const nodes = parsedData.body.childNodes;
        console.log(parsedData.body.children)
        const content = htmlToPdfElements(nodes);
        setPdfContent(content);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Show Toast
            </Button>

            {pdfContent && (
                <PDFViewer width="100%" height={500}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View>{pdfContent}</View>
                        </Page>
                    </Document>
                </PDFViewer>
            )}
        </div>
    );
};

export default ProductPage;
