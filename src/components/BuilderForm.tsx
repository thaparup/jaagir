'use client'
import { createResume } from '@/actions/builder.action'
import { BuilderSchema, BuilderSchemaType } from '@/schema/builder.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import BasicSection from './BuilderForm/BasicSectionForm'
import { Button } from './ui/button'
import CustomFieldsForm from './CustomFieldsForm'

const BuilderForm = () => {
    const methods = useForm<BuilderSchemaType>({
        resolver: zodResolver(BuilderSchema),
    })
    const { control, } = methods

    const {
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit = async (data: BuilderSchemaType) => {
        await createResume(data)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white px-4 w-lg">
                <BasicSection />
                <CustomFieldsForm />
                {/* <Button type='submit' >Submit</Button> */}


                <h1 className=' mt-20 py-24 bg-red-200'>fsdfd</h1>
            </form>
        </FormProvider>
    )
}

export default BuilderForm
