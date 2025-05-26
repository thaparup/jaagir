// import * as PhosphorIcons from "phosphor-react";
// import type { IconProps } from "phosphor-react";
// import { Text, View, StyleSheet, } from "@react-pdf/renderer";
// import EmailSvg from "./Svgs/EmailSvg";
// import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";

// const isValidIcon = (icon: any): icon is React.FC<IconProps> =>
//     typeof icon === "function" && "displayName" in icon;

// type CustomField = {
//     icon: string;
//     name: string;
//     value: string;
// };

// type Props = {
//     fields: CustomField[];
// };

// export default function CustomFieldPreview({ fields }: Props) {
//     const deductSvgSize = 4;

//     const { primaryColor, fontSize, textColor } = useResumeGlobalStyle()
//     if (!fields || fields.length === 0) return null;
//     const styles = StyleSheet.create({
//         container: {
//             flexDirection: 'row',
//             gap: 6,
//             alignItems: 'center',

//         },
//         name: {
//             fontSize: fontSize * 0.75,
//             color: textColor,
//         },
//         value: {
//             fontSize: fontSize * 0.75,
//             color: textColor,
//         }
//     })
//     return (


//         <View style={{ flexDirection: 'row', gap: 10, }}>
//             {fields.map((field, index) => {
//                 return (
//                     <View style={styles.container} key={index}>
//                         <EmailSvg color={primaryColor} size={fontSize - deductSvgSize} />
//                         <Text style={styles.name}>{field.name}</Text>
//                         <Text style={styles.value}>{field.value}</Text>

//                     </View>
//                 )
//             })}
//         </View>
//     );
// }








import * as PhosphorIcons from "phosphor-react";
import type { IconProps } from "phosphor-react";

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

export default function CustomFieldPreview({ fields }: Props) {
    if (!fields || fields.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            {fields.map((field, index) => {
                const Icon =
                    (PhosphorIcons as any)[field.icon] || PhosphorIcons.EnvelopeSimpleOpen;

                return (
                    <div key={index} className="flex items-center gap-1 ">
                        <div className="flex gap-1 items-center ">
                            <span className="">
                                <Icon size={16} />
                            </span>
                            <span className="font-medium ">{field.name}:</span>
                            <span className="">{field.value}</span>
                        </div>

                        {/* {index < fields.length - 1 && (
                            <span className="text-gray-400">|</span>
                        )} */}
                    </div>
                );
            })}
        </div>
    );
}