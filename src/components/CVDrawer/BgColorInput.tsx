import useColorInputStore from '@/store/zustand/colorInputStore'
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

type Props = {}

const BgColorInput = (props: Props) => {
    const { bgColor, setBgColor } = useResumeGlobalStyle()
    const { showBgColorPicker, toggleBgColorPicker } = useColorInputStore()
    return (
        <div className='flex flex-col gap-2 px-8 py-4 relative'>
            <label className='text-white font-medium'>Background Color</label>

            <div
                className="flex items-center gap-3 p-2 border-2 border-gray-700/60 rounded cursor-pointer w-full"
                onClick={toggleBgColorPicker}
            >
                <div
                    className="w-6 h-6 rounded-full border-2 border-gray-700/40"
                    style={{ backgroundColor: bgColor }}
                />
                <span className='text-sm text-white'>{bgColor}</span>
            </div>

            {showBgColorPicker && (
                <div className="absolute top-[90px] mt-1 z-50">
                    <HexColorPicker color={bgColor} onChange={setBgColor} />
                </div>
            )}
        </div>
    )
}

export default BgColorInput