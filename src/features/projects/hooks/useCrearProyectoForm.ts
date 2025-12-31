import { useForm } from "react-hook-form"
import type { ProjectFormData } from "../types/project"

export const useCrearProyectoForm = () => {

    const initialValues: ProjectFormData = {
        projectNameDto: "",
        clientNameDto: "",
        descriptionDto: ""
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({ defaultValues: initialValues })

    return {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    }
}