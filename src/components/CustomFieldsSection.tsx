import * as PhosphorIcons from "phosphor-react";
import type { IconProps } from "phosphor-react";
import { Text, View, StyleSheet, } from "@react-pdf/renderer";
import EmailSvg from "./ResumeLiveComponent/Svgs/EmailSvg";
import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";

const isValidIcon = (icon: any): icon is React.FC<IconProps> =>
    typeof icon === "function" && "displayName" in icon;

type CustomField = {
    icon: string;
    name: string;
    value: string;
};

type Props = {
    fields: CustomField[];
};

export default function CustomFieldsSection({ fields }: Props) {
    const deductSvgSize = 4;

    const { primaryColor, fontSize, textColor } = useResumeGlobalStyle()
    if (!fields || fields.length === 0) return null;
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 6,
            alignItems: 'center',

        },
        name: {
            fontSize: fontSize * 0.75,
            color: textColor,
        },
        value: {
            fontSize: fontSize * 0.75,
            color: textColor,
        }
    })
    return (


        <View style={{ flexDirection: 'row', gap: 10, backgroundColor: 'yellow' }}>
            {fields.map((field, index) => {
                return (
                    <View style={styles.container} key={index}>
                        <EmailSvg color={primaryColor} size={fontSize - deductSvgSize} />
                        <Text style={styles.name}>{field.name}</Text>
                        <Text style={styles.value}>{field.value}</Text>

                    </View>
                )
            })}
        </View>
    );
}
