import { useForm } from "react-hook-form"
import ProyectoBaseForm from "./ProyectoBaseForm"
import { useEditarProyecto } from "../hooks/useEditarProyecto"
import { Header, SubmitButton } from "@/components"
import type { ProjectFormData } from "../types/project"

type EditarProyectoFormProps = {
    data: ProjectFormData
}

function EditarProyectoForm({ data }: EditarProyectoFormProps) {

    const initialValues: ProjectFormData = {
        projectNameDto: data.projectNameDto,
        clientNameDto: data.clientNameDto,
        descriptionDto: data.descriptionDto
    }
    const { register, handleSubmit, formState: { errors }, getValues }
        = useForm({ defaultValues: initialValues })

    const { mutation, projectId } = useEditarProyecto(getValues("projectNameDto"))

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutation.mutate(data)
    }

    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <Header bgcolor="blue" textcolor="blue" text="Editar Proyecto" />
                <form className='mt-10 bg-white shadow-lg p-1 rounded-lg'
                    onSubmit={handleSubmit(handleForm)}
                    noValidate>
                    <ProyectoBaseForm register={register}
                        errors={errors} />
                    <SubmitButton value={'Actualizar proyecto'}
                        isdisabled={false} />
                </form>
            </div>
        </>
    )
}
export default EditarProyectoForm