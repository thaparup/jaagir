import useColorInputStore from '@/store/zustand/colorInputStore'
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
import React from 'react'
import { HexColorPicker } from 'react-colorful'

type Props = {
    // isOpen: boolean
}

const PrimaryColorInput = ({ }: Props) => {

    const { primaryColor, setPrimaryColor } = useResumeGlobalStyle()
    const { showPrimaryColorPicker, togglePrimaryColorPicker } = useColorInputStore()

    return (
        <div className='flex flex-col gap-2 px-8 py-4 relative'>

            <label className='text-white font-medium'>Primary Color</label>
            <div
                className="flex items-center gap-3 p-2 border-2 border-gray-700/60 rounded cursor-pointer w-full"
                onClick={togglePrimaryColorPicker}
            >
                <div
                    className="w-6 h-6 rounded-full border-2 border-gray-700/40"
                    style={{ backgroundColor: primaryColor }}
                />
                <span className='text-sm text-white'>{primaryColor}</span>
            </div>

            {showPrimaryColorPicker && (
                <div className="absolute top-[100px] mt-1 z-50">
                    <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                </div>
            )}
        </div>
    )
}

export default PrimaryColorInput