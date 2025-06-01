import React from 'react'
import { Slider as ShadSlider } from "@/components/ui/slider"

type ReusableSliderProps = {
    value?: number[]
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    onChange?: (value: number[]) => void
    disabled?: boolean
    className?: string
}

const Slider: React.FC<ReusableSliderProps> = ({
    value,
    defaultValue = [0],
    min = 0,
    max = 100,
    step = 1,
    onChange,
    disabled = false,
    className = ""
}) => {
    return (
        <ShadSlider
            value={value}
            defaultValue={value ? undefined : defaultValue}
            min={min}
            max={max}
            step={step}
            onValueChange={onChange}
            disabled={disabled}
            className={className}
        />
    )
}

export default Slider
