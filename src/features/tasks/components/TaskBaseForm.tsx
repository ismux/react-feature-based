import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "../models/task"
import ErrorMessage from "../../../../components/ErrorMessage"

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskBaseForm({errors, register} 
: TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("nameDto", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.nameDto && (
                    <ErrorMessage>{errors.nameDto.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("descriptionDto", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.descriptionDto && (
                    <ErrorMessage>{errors.descriptionDto.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}