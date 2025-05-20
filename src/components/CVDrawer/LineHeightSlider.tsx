"use client";

import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";

function LineHeightSlider({ min = 0, max = 3, step = 0.01 }) {
    const { lineHeight, setLineHeight } = useResumeGlobalStyle();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLineHeight(Number(e.target.value));
    };

    return (
        <div className="px-8 py-4">
            <label htmlFor="" className="text-white font-medium">
                Line Height
            </label>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    value={lineHeight}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    className="w-64"
                />
                <h3 className="text-white">{lineHeight}px</h3>
            </div>
        </div>
    );
}

export default LineHeightSlider;
