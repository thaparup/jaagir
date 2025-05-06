import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Plus, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ResumeSchema, ResumeSchemaType } from '@/schema/builder.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createResume } from '@/actions/builder.action'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type Props = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateResumeModal = ({ openModal, setOpenModal }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(ResumeSchema)
    })

    const createResumeMutation = useMutation({
        mutationFn: async (data: ResumeSchemaType) => {
            return await createResume(data)
        },
        onSuccess: (data) => {
            toast("Resume has been created", {

                action: {
                    label: "Undo",
                    onClick: () => { },
                },
            })

            setOpenModal(false)
            reset()
        },
        onError: () => {
            toast.error('Failed to create resume')

        }
    })

    const onSubmit = (data: ResumeSchemaType) => {
        createResumeMutation.mutate(data)
    }

    const isProcessing = createResumeMutation.isPending

    return (
        <>
            <Dialog open={openModal} onOpenChange={(open) => {
                setOpenModal(open)
                if (!open) {
                    reset()
                    createResumeMutation.reset()
                }
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex gap-4 items-center'>
                                <Plus className='text-primary' />
                                <span>Create a new resume</span>
                            </div>
                            <span className='text-sm py-4'>
                                Start building your resume by giving it a name.
                            </span>
                        </DialogTitle>
                        <DialogDescription>
                            <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                                <label className='font-semibold text-black'>Title</label>
                                <input
                                    {...register('title')}
                                    className='outline-1 rounded-sm placeholder:text-gray-600 p-2 text-black' placeholder='Resume Title'
                                    disabled={isProcessing}
                                />
                                {typeof errors.title?.message === 'string' && (
                                    <p className='text-red-500 text-sm'>{errors.title.message}</p>
                                )}

                                {createResumeMutation.error ? (
                                    <p className='text-red-500 text-sm'>
                                        {createResumeMutation.error.message || 'An error occurred while creating your resume.'}
                                    </p>
                                ) : null}



                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="mt-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateResumeModal