import { Svg, Path } from "@react-pdf/renderer";





type Props = {
    size: number,
    color: string
}
const MapSvg = ({ size, color }: Props) => (
    <Svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
    >
        <Path
            d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
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

export default MapSvg;