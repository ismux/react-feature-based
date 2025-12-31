import ErrorMessage from "@/components/error/ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { ProjectFormData } from "../types/project";

type ProyectoBaseFormPros = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export function moveToProjectListTab(){
    const element = document.querySelector<HTMLElement>('.me-2');
    if (element) {
        const link = element.querySelector<HTMLAnchorElement>('a[href]');
        link?.click();
    }
}

function ProyectoBaseForm({ register, errors }: ProyectoBaseFormPros) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="ProjectNameDto" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <input
                    id="ProjectNameDto"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectNameDto", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.projectNameDto && (
                    <ErrorMessage>{errors.projectNameDto.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="ClientNameDto" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="ClientNameDto"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientNameDto", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientNameDto && (
                    <ErrorMessage>{errors.clientNameDto.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="DescriptionDto" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="DescriptionDto"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("descriptionDto", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.descriptionDto && (
                    <ErrorMessage>{errors.descriptionDto.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
export default ProyectoBaseForm