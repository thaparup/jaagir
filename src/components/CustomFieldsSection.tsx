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

export default function CustomFieldsSection({ fields }: Props) {
    if (!fields || fields.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            {fields.map((field, index) => {
                const Icon =
                    (PhosphorIcons as any)[field.icon] || PhosphorIcons.EnvelopeSimpleOpen;

                return (
                    <div key={index} className="flex items-center gap-1">
                        <div className="flex gap-1 items-center px-2">
                            <span className="text-pink-500">
                                <Icon size={16} />
                            </span>
                            <span className="font-medium text-gray-700">{field.name}:</span>
                            <span className="text-gray-700">{field.value}</span>
                        </div>

                        {/* Separator (not after the last item) */}
                        {index < fields.length - 1 && (
                            <span className="text-gray-400">|</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
