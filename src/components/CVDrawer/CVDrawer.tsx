
'use client'

import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from '../ui/button'
import { HexColorPicker } from "react-colorful"

type Props = {}

const CVDrawer = (props: Props) => {
    const [primaryColor, setPrimaryColor] = useState('#FF8DA1')
    const [bgColor, setBgColor] = useState('#ffffff')
    const [textColor, setTextColor] = useState('#111111')
    const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false)
    const [showBgColorPicker, setShowBgColorPicker] = useState(false)
    const [showTextColorPicker, setShowTextColorPicker] = useState(false)

    const togglePrimaryColorPicker = () => {
        setShowPrimaryColorPicker(prev => !prev)
        if (showBgColorPicker || showTextColorPicker) {
            setShowTextColorPicker(false)
            setShowBgColorPicker(false)
        }
    }

    const toggleBgColorPicker = () => {
        setShowBgColorPicker(prev => !prev)
        if (showPrimaryColorPicker || showTextColorPicker) {
            setShowPrimaryColorPicker(false)
            setShowTextColorPicker(false)
        }

    }
    const toggleTextColorPiker = () => {
        setShowTextColorPicker(prev => !prev)
        if (showBgColorPicker || showPrimaryColorPicker) {
            setShowBgColorPicker(false)
            setShowPrimaryColorPicker(false)
        }

    }

    return (
        <Drawer direction='left' onClose={() => {
            setShowPrimaryColorPicker(false)
            setShowBgColorPicker(false)
            setShowTextColorPicker(false)
        }}>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
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
                        <div className="absolute top-[90px] mt-1 z-50">
                            <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                        </div>
                    )}
                </div>

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
                <div className='flex flex-col gap-2 px-8 py-4 relative'>
                    <label className='text-white font-medium'>Text Color</label>

                    <div
                        className="flex items-center gap-3 p-2 border-2 border-gray-700/60 rounded cursor-pointer w-full"
                        onClick={toggleTextColorPiker}
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

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CVDrawer