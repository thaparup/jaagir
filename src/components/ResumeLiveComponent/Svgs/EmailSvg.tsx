import { Svg, Path } from "@react-pdf/renderer";

type Props = {
  size: number;
  color: string;
};

const EmailSvg = ({ size, color }: Props) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    {/* Envelope outline from <rect x="2" y="4" width="20" height="16" rx="2"/> */}
    <Path
      d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H2a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Envelope flap (you can optionally add this for visual detail) */}
    <Path
      d="M2 4l10 9 10 -9"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default EmailSvg;
