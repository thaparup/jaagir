import BuilderForm from '@/components/BuilderForm'
import BuilderSidebar from '@/components/BuilderSidebar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='bg-black w-screen h-screen'>

            {/* <BuilderSidebar /> */}
            <BuilderForm />
        </div>
    )
}

export default page