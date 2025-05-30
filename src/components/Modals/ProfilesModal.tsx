// 'use client'
// import React from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
// import { Plus, Loader2 } from 'lucide-react'
// import { useForm } from 'react-hook-form'
// import { ResumeSchema, ResumeSchemaType } from '@/schema/builder.schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { createResume } from '@/actions/builder.action'

// import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import { useRouter } from 'next/navigation'
// import { Button } from '../ui/button'

// type Props = {
//     openModal: boolean,
//     setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
// }

// const ProfilesModal = ({ openModal, setOpenModal }: Props) => {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm({
//         resolver: zodResolver(ResumeSchema)
//     })

//     const createResumeMutation = useMutation({
//         mutationFn: async (data: ResumeSchemaType) => {
//             return await createResume(data)
//         },
//         onSuccess: (data) => {
//             toast("Resume has been created", {

//                 action: {
//                     label: "Undo",
//                     onClick: () => { },
//                 },
//             })

//             setOpenModal(false)
//             reset()
//             router.push(`/builder/${data.data.id}`)
//         },
//         onError: () => {
//             toast.error('Failed to create resume')

//         }
//     })

//     const onSubmit = (data: ResumeSchemaType) => {
//         createResumeMutation.mutate(data)
//     }

//     const isProcessing = createResumeMutation.isPending

//     return (
//         <>
//             <Dialog open={openModal} onOpenChange={(open) => {
//                 setOpenModal(open)
//                 if (!open) {
//                     reset()
//                     createResumeMutation.reset()
//                 }
//             }}>
//                 <DialogContent className='bg-black text-gray-300'>
//                     <DialogHeader>
//                         <DialogTitle>
//                             <div className='flex gap-4 items-center'>
//                                 <Plus className='text-primary' />
//                                 <span>Create a new item</span>
//                             </div>

//                         </DialogTitle>
//                         <DialogDescription className='text-gray-300'>
//                             <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>

//                                 <div className='flex gap-2 mt-4 w-full'>


//                                     <div className='flex flex-col gap-2 w-full'>
//                                         <label className='font-semibold '>Network</label>
//                                         <input
//                                             {...register('title')}
//                                             className='outline-1 rounded-sm placeholder:text-gray-600 p-2 w-full' placeholder='Github'
//                                             disabled={isProcessing}
//                                         />
//                                     </div>

//                                     <div className='flex flex-col gap-2 w-full'>
//                                         <label className='font-semibold '>Username</label>
//                                         <input
//                                             {...register('title')}
//                                             className='outline-1 rounded-sm placeholder:text-gray-600 p-2 w-full' placeholder='thaparup'
//                                             disabled={isProcessing}
//                                         />
//                                     </div>
//                                 </div>




//                                 <div className='flex flex-col gap-2'>
//                                     <label htmlFor="">Website</label>
//                                     <input type="text" className='outline-1 rounded-sm placeholder:text-gray-600 p-2 w-full'
//                                         placeholder='https://github.com/thaparup'
//                                     />

//                                 </div>
//                                 <div className='flex flex-col gap-2'>
//                                     <label htmlFor="">Icon</label>
//                                     <input type="text" className='outline-1 rounded-sm placeholder:text-gray-600 p-2 w-full'
//                                         placeholder='https://github.com/thaparup'
//                                     />

//                                 </div>




//                                 <Button
//                                     type="submit"
//                                     disabled={isProcessing}
//                                     className="mt-2"
//                                 >
//                                     {isProcessing ? (
//                                         <>
//                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                             Creating...
//                                         </>
//                                     ) : (
//                                         'Create'
//                                     )}
//                                 </Button>
//                             </form>
//                         </DialogDescription>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>
//         </>
//     )
// }

// export default ProfilesModal















// 'use client'
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
// import { Plus, Loader2 } from 'lucide-react'
// import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
// import { ProfilesSchema, ProfilesTypes, ResumeSchema, ResumeSchemaType } from '@/schema/builder.schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { createProfiles, createResume } from '@/actions/builder.action'

// import { useMutation } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import { useRouter } from 'next/navigation'
// import { Button } from '../ui/button'
// import { GithubLogo, LinkedinLogo, Envelope, TwitterLogo, GlobeSimple, InstagramLogo, FacebookLogo, YoutubeLogo } from 'phosphor-react'

// type Props = {
//     openModal: boolean,
//     setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
//     resumeId: string
// }



// const Platforms = [
//     { name: 'GitHub', icon: GithubLogo, placeholder: 'https://github.com/username' },
//     { name: 'LinkedIn', icon: LinkedinLogo, placeholder: 'https://linkedin.com/in/username' },
//     { name: 'Gmail', icon: Envelope, placeholder: 'your.email@gmail.com' },
//     { name: 'Twitter', icon: TwitterLogo, placeholder: 'https://twitter.com/username' },
//     { name: 'Website', icon: GlobeSimple, placeholder: 'https://yourwebsite.com' },
//     { name: 'Instagram', icon: InstagramLogo, placeholder: 'https://instagram.com/username' },
//     { name: 'Facebook', icon: FacebookLogo, placeholder: 'https://facebook.com/username' },
//     { name: 'YouTube', icon: YoutubeLogo, placeholder: 'https://youtube.com/@username' },
// ]



// const ProfilesModal = ({ openModal, setOpenModal, resumeId }: Props) => {
//     const router = useRouter();
//     const [selectedPlatform, setSelectedPlatform] = useState(Platforms[0]);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         setValue,
//         watch
//     } = useForm<ProfilesTypes>({
//         resolver: zodResolver(ProfilesSchema)
//     })

//     // const createProfilesMutation = useMutation({
//     //     mutationFn: async (data: ProfilesTypes) => {
//     //         return await createProfiles(resumeId, data)
//     //     },
//     //     onSuccess: (data) => {
//     //         toast("Profile has been created", {
//     //             action: {
//     //                 label: "Undo",
//     //                 onClick: () => { },
//     //             },
//     //         })
//     //         // setOpenModal(false)
//     //         // reset()
//     //         // router.push(`/builder/${data.data.id}`)
//     //         console.log(data)
//     //     },
//     //     onError: () => {
//     //         toast.error('Failed to create profile')
//     //     }
//     // })

//     const onSubmit = (data: ProfilesTypes) => {
//         // console.log(data)
//         toast.success('called')
//         console.log('sdfdsfsd')
//         // createProfilesMutation.mutate(data)
//     }

//     const handlePlatformSelect = (platform: typeof Platforms[0]) => {
//         setSelectedPlatform(platform)
//         setValue('network', platform.name)
//         setValue('icon', platform.name.toLowerCase())

//         setValue('url', '')
//     }

//     // const isProcessing = createProfilesMutation.isPending

//     return (
//         <Dialog open={openModal} onOpenChange={(open) => {
//             setOpenModal(open)
//             if (!open) {
//                 reset()
//                 // createProfilesMutation.reset()
//                 setSelectedPlatform(Platforms[0])
//             }
//         }}>
//             <DialogContent className='bg-black text-gray-300 max-w-md'>
//                 <DialogHeader>
//                     <DialogTitle>
//                         <div className='flex gap-4 items-center'>
//                             <Plus className='text-primary' />
//                             <span>Add Social Profile</span>
//                         </div>
//                     </DialogTitle>
//                     <DialogDescription className='text-gray-300'>
//                         <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>

//                             {/* Platform Selector */}
//                             <div className='flex flex-col gap-2 mt-4'>
//                                 <label className='font-semibold'>Platform</label>
//                                 <div className='grid grid-cols-4 gap-2'>
//                                     {Platforms.map((platform) => {
//                                         const IconComponent = platform.icon
//                                         return (
//                                             <button
//                                                 key={platform.name}
//                                                 type="button"
//                                                 onClick={() => handlePlatformSelect(platform)}
//                                                 className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${selectedPlatform.name === platform.name
//                                                     ? 'border-primary bg-primary/10 text-primary'
//                                                     : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
//                                                     }`}
//                                             // disabled={isProcessing}
//                                             >
//                                                 <IconComponent size={20} />
//                                                 <span className='text-xs font-medium'>{platform.name}</span>
//                                             </button>
//                                         )
//                                     })}
//                                 </div>
//                             </div>

//                             {/* Selected Platform Display */}
//                             <div className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg'>
//                                 <selectedPlatform.icon className='text-primary' size={24} />
//                                 <div>
//                                     <p className='font-semibold text-white'>{selectedPlatform.name}</p>
//                                     <p className='text-sm text-gray-400'>Selected platform</p>
//                                 </div>
//                             </div>

//                             {/* Username Field */}
//                             <div className='flex flex-col gap-2'>
//                                 <label className='font-semibold'>Username/Handle</label>
//                                 <input
//                                     {...register('username')}
//                                     className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
//                                     placeholder={selectedPlatform.name === 'Gmail' ? 'your.email' : 'username'}
//                                 // disabled={isProcessing}
//                                 />
//                                 {errors.username && (
//                                     <span className='text-red-400 text-sm'>{errors.username.message}</span>
//                                 )}
//                             </div>

//                             {/* URL Field */}
//                             <div className='flex flex-col gap-2'>
//                                 <label className='font-semibold'>URL/Link</label>
//                                 <input
//                                     {...register('url')}
//                                     type="url"
//                                     className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
//                                     placeholder={selectedPlatform.placeholder}
//                                 // disabled={isProcessing}
//                                 />
//                                 {errors.url && (
//                                     <span className='text-red-400 text-sm'>{errors.url.message}</span>
//                                 )}
//                             </div>

//                             {/* Submit Button */}
//                             <Button
//                                 type="submit"
//                                 // disabled={isProcessing}
//                                 className="mt-2 bg-primary hover:bg-primary/90 text-white"
//                             >
//                                 {/* {isProcessing ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Adding Profile...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Plus className="mr-2 h-4 w-4" />
//                                         Add Profile
//                                     </>
//                                 )} */}
//                                 add
//                             </Button>
//                         </form>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default ProfilesModal






// 'use client'
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
// import { Plus, Loader2 } from 'lucide-react'
// import { useFieldArray, useForm, useFormContext } from 'react-hook-form'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '../ui/button'
// import { GithubLogo, LinkedinLogo, Envelope, TwitterLogo, GlobeSimple, InstagramLogo, FacebookLogo, YoutubeLogo } from 'phosphor-react'
// import z from 'zod'
// import { ProfileSchema, ProfileType } from '@/schema/builder.schema'
// import { toast } from 'sonner'



// type Props = {
//     openModal: boolean,
//     setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
//     resumeId: string
// }

// const Platforms = [
//     { name: 'GitHub', icon: "GithubLogo", placeholder: 'https://github.com/username' },
//     { name: 'LinkedIn', icon: "LinkedinLogo", placeholder: 'https://linkedin.com/in/username' },
//     { name: 'Gmail', icon: "Envelope", placeholder: 'your.email@gmail.com' },
//     { name: 'Twitter', icon: "TwitterLogo", placeholder: 'https://twitter.com/username' },
//     { name: 'Website', icon: "GlobeSimple", placeholder: 'https://yourwebsite.com' },
//     { name: 'Instagram', icon: "InstagramLogo", placeholder: 'https://instagram.com/username' },
//     { name: 'Facebook', icon: "FacebookLogo", placeholder: 'https://facebook.com/username' },
//     { name: 'YouTube', icon: "YoutubeLogo", placeholder: 'https://youtube.com/@username' },
// ]
// const iconMap = {
//     GithubLogo: GithubLogo,
//     LinkedinLogo: LinkedinLogo,
//     Envelope: Envelope,
//     TwitterLogo: TwitterLogo,
//     GlobeSimple: GlobeSimple,
//     InstagramLogo: InstagramLogo,
//     FacebookLogo: FacebookLogo,
//     YoutubeLogo: YoutubeLogo,
// };

// const ProfilesModal = ({ openModal, setOpenModal, resumeId }: Props) => {
//     const [selectedPlatform, setSelectedPlatform] = useState(Platforms[0]);

//     const { register, handleSubmit, watch, control, setValue, reset, formState: { errors } } = useForm<ProfileType>({
//         resolver: zodResolver(ProfileSchema),
//         defaultValues: {

//             network: "",
//             username: "",
//             url: "",


//         }
//     });
//     const network = watch('network',)
//     const username = watch('username')
//     const url = watch('url')
//     const icon = watch('icon');



//     const onSubmit = (data: ProfileType) => {
//         console.log('Form data:', data);
//         // Here you would typically call your mutation or data handling logic
//         if (data.url || data.username) {
//             toast.error("Either 'username' or 'url' must be provided")
//         }

//     }

//     const handlePlatformSelect = (platform: typeof Platforms[0]) => {
//         setSelectedPlatform(platform)
//         setValue('icon', platform.icon)
//         setValue('network', platform.name)
//     }
//     const SelectedIcon = iconMap[selectedPlatform.icon as keyof typeof iconMap];

//     return (
//         <Dialog open={openModal} onOpenChange={(open) => {
//             setOpenModal(open)
//             if (!open) {
//                 reset()
//                 setSelectedPlatform(Platforms[0])
//             }
//         }}>
//             <DialogContent className='bg-black text-gray-300 max-w-md'>
//                 <DialogHeader>
//                     <DialogTitle>
//                         <div className='flex gap-4 items-center'>
//                             <Plus className='text-primary' />
//                             <span>Add Social Profile</span>
//                         </div>
//                     </DialogTitle>
//                     <DialogDescription className='text-gray-300'>
//                         <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
//                             {/* Platform Selector */}
//                             <div className='flex flex-col gap-2 mt-4'>
//                                 <label className='font-semibold'>Platform</label>
//                                 <div className='grid grid-cols-4 gap-2'>
//                                     {Platforms.map((platform) => {
//                                         const IconComponent = iconMap[platform.icon as keyof typeof iconMap];

//                                         return (
//                                             <button
//                                                 key={platform.name}
//                                                 type="button"
//                                                 onClick={() => handlePlatformSelect(platform)}
//                                                 className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${selectedPlatform.name === platform.name
//                                                     ? 'border-primary bg-primary/10 text-primary'
//                                                     : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
//                                                     }`}
//                                             >
//                                                 <IconComponent size={20} />
//                                                 <span className='text-xs font-medium'>{platform.name}</span>
//                                             </button>
//                                         )
//                                     })}
//                                 </div>
//                             </div>

//                             {/* Selected Platform Display */}
//                             <div className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg'>
//                                 {SelectedIcon && <SelectedIcon className='text-primary' size={24} />}
//                                 <div>
//                                     <p className='font-semibold text-white'>{selectedPlatform.name}</p>
//                                     <p className='text-sm text-gray-400'>Selected platform</p>
//                                 </div>
//                             </div>

//                             {/* Username Field */}
//                             <div className='flex flex-col gap-2'>
//                                 <label className='font-semibold'>Username/Handle</label>
//                                 <input
//                                     {...register('username')}
//                                     className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
//                                 // placeholder={selectedPlatform.name === 'Gmail' ? 'your.email' : 'username'}
//                                 />
//                                 {typeof errors.username?.message === 'string' && (
//                                     <p className='text-red-500 text-sm'>{errors.username.message}</p>
//                                 )}
//                             </div>

//                             {/* URL Field */}
//                             <div className='flex flex-col gap-2'>
//                                 <label className='font-semibold'>URL/Link</label>
//                                 <input
//                                     {...register('url')}
//                                     type="url"
//                                     className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
//                                 // placeholder={selectedPlatform.placeholder}
//                                 />
//                                 {typeof errors.url?.message === 'string' && (
//                                     <p className='text-red-500 text-sm'>{errors.url.message}</p>
//                                 )}
//                             </div>

//                             {/* Submit Button */}
//                             <Button

//                                 type="submit"
//                                 className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
//                             >
//                                 Add Profile
//                             </Button>
//                         </form>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default ProfilesModal






// Updated Component




'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Plus, Loader2 } from 'lucide-react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { GithubLogo, LinkedinLogo, Envelope, TwitterLogo, GlobeSimple, InstagramLogo, FacebookLogo, YoutubeLogo } from 'phosphor-react'
import z from 'zod'
import { ProfileSchema, ProfileType } from '@/schema/builder.schema'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProfile } from '@/actions/builder.action'
import { v4 as uuidv4 } from 'uuid';
type Props = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    resumeId: string
}

const Platforms = [
    { name: 'GitHub', icon: "GithubLogo", placeholder: 'https://github.com/username' },
    { name: 'LinkedIn', icon: "LinkedinLogo", placeholder: 'https://linkedin.com/in/username' },
    { name: 'Gmail', icon: "Envelope", placeholder: 'your.email@gmail.com' },
    { name: 'Twitter', icon: "TwitterLogo", placeholder: 'https://twitter.com/username' },
    { name: 'Website', icon: "GlobeSimple", placeholder: 'https://yourwebsite.com' },
    { name: 'Instagram', icon: "InstagramLogo", placeholder: 'https://instagram.com/username' },
    { name: 'Facebook', icon: "FacebookLogo", placeholder: 'https://facebook.com/username' },
    { name: 'YouTube', icon: "YoutubeLogo", placeholder: 'https://youtube.com/@username' },
]

const iconMap = {
    GithubLogo: GithubLogo,
    LinkedinLogo: LinkedinLogo,
    Envelope: Envelope,
    TwitterLogo: TwitterLogo,
    GlobeSimple: GlobeSimple,
    InstagramLogo: InstagramLogo,
    FacebookLogo: FacebookLogo,
    YoutubeLogo: YoutubeLogo,
};

const ProfilesModal = ({ openModal, setOpenModal, resumeId }: Props) => {
    const [selectedPlatform, setSelectedPlatform] = useState(Platforms[0]);
    const queryClient = useQueryClient();

    const { register, handleSubmit, watch, control, setValue, reset, formState: { errors } } = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            network: "",
            username: "",
            url: "",
            icon: "",
            id: "",
        }
    });

    const createProfilesMutation = useMutation({
        mutationFn: async (data: ProfileType) => {
            return await createProfile(resumeId, data)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["resumeById", resumeId] });
            toast("Profile has been created", {
                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            })
            setOpenModal(false)
            reset()

        },
        onError: () => {
            toast.error('Failed to create profile')
        }
    })

    const onSubmit = (data: ProfileType) => {
        console.log('Form data:', data);
        createProfilesMutation.mutate(data)
        reset();
        setOpenModal(false);
        setSelectedPlatform(Platforms[0]);
    }

    const handlePlatformSelect = (platform: typeof Platforms[0]) => {
        setSelectedPlatform(platform)
        setValue('icon', platform.icon)
        setValue('network', platform.name)
        setValue('id', uuidv4())
    }

    const SelectedIcon = iconMap[selectedPlatform.icon as keyof typeof iconMap];

    return (
        <Dialog open={openModal} onOpenChange={(open) => {
            setOpenModal(open)
            if (!open) {
                reset()
                setSelectedPlatform(Platforms[0])
            }
        }}>
            <DialogContent className='bg-black text-gray-300 max-w-md'>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex gap-4 items-center'>
                            <Plus className='text-primary' />
                            <span>Add Social Profile</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-gray-300'>
                        <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                            {/* Platform Selector */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='font-semibold'>Platform</label>
                                <div className='grid grid-cols-4 gap-2'>
                                    {Platforms.map((platform) => {
                                        const IconComponent = iconMap[platform.icon as keyof typeof iconMap];

                                        return (
                                            <button
                                                key={platform.name}
                                                type="button"
                                                onClick={() => handlePlatformSelect(platform)}
                                                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${selectedPlatform.name === platform.name
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
                                                    }`}
                                            >
                                                <IconComponent size={20} />
                                                <span className='text-xs font-medium'>{platform.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Selected Platform Display */}
                            <div className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg'>
                                {SelectedIcon && <SelectedIcon className='text-primary' size={24} />}
                                <div>
                                    <p className='font-semibold text-white'>{selectedPlatform.name}</p>
                                    <p className='text-sm text-gray-400'>Selected platform</p>
                                </div>
                            </div>

                            {/* Username Field */}
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>Username/Handle</label>
                                <input
                                    {...register('username')}
                                    className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
                                    placeholder={selectedPlatform.name === 'Gmail' ? 'your.email' : 'username'}
                                />
                                {typeof errors.username?.message === 'string' && (
                                    <p className='text-red-500 text-sm'>{errors.username.message}</p>
                                )}
                            </div>

                            {/* URL Field */}
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>URL/Link</label>
                                <input
                                    {...register('url')}
                                    type="url"
                                    className='bg-gray-800 border border-gray-600 outline-none focus:border-primary rounded-lg placeholder:text-gray-500 p-3 w-full text-white'
                                    placeholder={selectedPlatform.placeholder}
                                />
                                {typeof errors.url?.message === 'string' && (
                                    <p className='text-red-500 text-sm'>{errors.url.message}</p>
                                )}
                            </div>

                            {/* General form error for the refine validation */}
                            {errors.root && (
                                <p className='text-red-500 text-sm'>{errors.root.message}</p>
                            )}


                            <Button
                                type="submit"
                                className="mt-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                            >
                                Add Profile
                            </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ProfilesModal