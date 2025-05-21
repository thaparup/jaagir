import { Svg, Path } from "@react-pdf/renderer";

type Props = {
    size: number;
    color: string;
};
const PhoneSvg = ({ size, color }: Props) => (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
            d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 10l2 2 4-4"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default PhoneSvg;
