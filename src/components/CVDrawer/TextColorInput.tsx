import useColorInputStore from '@/store/zustand/colorInputStore'
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

type Props = {}

const TextColorInput = (props: Props) => {

    const { textColor, setTextColor } = useResumeGlobalStyle()
    const { showTextColorPicker, toggleTextColorPicker } = useColorInputStore()
    return (
        <div className='flex flex-col gap-2 px-8 py-4 relative'>
            <label className='text-white font-medium'>Text Color</label>

            <div
                className="flex items-center gap-3 p-2 border-2 border-gray-700/60 rounded cursor-pointer w-full"
                onClick={toggleTextColorPicker}
            >
                <div
                    className="w-6 h-6 rounded-full border-2 border-gray-700/40"
                    style={{ backgroundColor: textColor }}
                />
                <span className='text-sm text-white'>{textColor}</span>
            </div>

            {showTextColorPicker && (
                <div className="absolute top-[90px] mt-1 z-50">
                    <HexColorPicker color={textColor} onChange={setTextColor} />
                </div>
            )}
        </div>

    )
}

export default TextColorInput