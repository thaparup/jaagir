type SeparatorProps = {
    className?: string;
};

const Separator = ({ className }: SeparatorProps) => {
    return <span className={`inline-block h-2 ${className}`} />;
};

export default Separator;
