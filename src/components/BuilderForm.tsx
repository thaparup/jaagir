'use client'
import { createResume } from '@/actions/builder.action'
import { BuilderSchema, BuilderSchemaType } from '@/schema/builder.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import BasicSection from './BuilderForm/BasicSection'
import { Button } from './ui/button'
import CustomFieldsForm from './CustomFieldsForm'

const BuilderForm = () => {
    const methods = useForm<BuilderSchemaType>({
        resolver: zodResolver(BuilderSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit = async (data: BuilderSchemaType) => {
        await createResume(data)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white px-4">
                <BasicSection />
                <CustomFieldsForm />
                {/* <Button type='submit' >Submit</Button> */}
                <h1 className='py-24'>fsdfd</h1>
            </form>
        </FormProvider>
    )
}

export default BuilderForm
