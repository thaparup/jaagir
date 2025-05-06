import { User } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

type Props = {}

const BasicSection = (props: Props) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        <>
            <div className='flex gap-2 items-center'>
                <User />
                <h1 className='text-2xl'>Basics</h1>
            </div>

            <div className='flex items-center'>
                <Avatar className={cn("h-12 w-12")}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <span className='text-md font-medium'>Picture</span>
                    <input type="text" placeholder='https://' className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm text-sm placeholder:text-gray-600 p-1' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label className=''>Full Name</label>
                <input {...register('fullName')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.fullName?.message === 'string' && (
                    <p>{errors.fullName.message}</p>
                )}

            </div>

            <div className='flex flex-col gap-2'>
                <label>Headline</label>
                <input {...register('headLine')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.headline?.message === 'string' && (
                    <p>{errors.headline.message}</p>
                )}


            </div>

            <div className='flex flex-col gap-2'>
                <label>Email</label>
                <input {...register('email')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.email?.message === 'string' && (
                    <p>{errors.email.message}</p>
                )}


            </div>

            <div className='flex flex-col gap-2'>
                <label>Website</label>
                <input {...register('website')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.website?.message === 'string' && (
                    <p>{errors.website.message}</p>
                )}

            </div>

            <div className='flex flex-col gap-2'>
                <label>Phone Number</label>
                <input {...register('phoneNumber')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.phoneNumber?.message === 'string' && (
                    <p>{errors.phoneNumber.message}</p>
                )}

            </div>

            <div className='flex flex-col gap-2'>
                <label>Location</label>
                <input {...register('location')} className='outline-1 outline-gray-700/80 focus:outline-white rounded-sm placeholder:text-gray-600 p-1' />
                {typeof errors.location?.message === 'string' && (
                    <p>{errors.location.message}</p>
                )}

            </div>

        </>
    )
}

export default BasicSection