"use client";

import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";

function FontSizeSlider({ min = 12, max = 18, step = 0.01 }) {
    const { fontSize, setFontSize } = useResumeGlobalStyle();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(Number(e.target.value));
    };

    return (
        <div className="px-8 py-4">
            <label htmlFor="" className="text-white font-medium">
                Font Size
            </label>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    value={fontSize}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    className="w-64"
                />
                <h3 className="text-white">{fontSize}px</h3>
            </div>
        </div>
    );
}

export default FontSizeSlider;
