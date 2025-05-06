'use client'
import { Notepad, ShareNetwork, User } from 'phosphor-react'
import React from 'react'

type Props = {}

const NavbarIcon = (props: Props) => {
    return (
        <div className='flex flex-col items-center gap-4 text-white px-4 bg-gray-950/90 py-8'>
            <User size={15} />
            <Notepad size={15} />
            <ShareNetwork size={15} />
        </div>
    )
}

export default NavbarIcon