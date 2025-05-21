import { Svg, Path } from "@react-pdf/renderer";

type Props = {
    size: number;
    color: string;
};

const WebsiteSvg = ({ size, color }: Props) => (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default WebsiteSvg;
