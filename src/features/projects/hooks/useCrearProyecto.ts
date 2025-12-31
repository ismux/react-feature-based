import { useMutation } from "@tanstack/react-query"
import { moveToProjectListTab } from "../components/ProyectoBaseForm";
import { toast } from "react-toastify";
import { CreateProject } from "../api/ProjectService";

export const useCrearProyecto = (projectName: string) => {
    return useMutation({
        mutationFn: CreateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            moveToProjectListTab();
            data ? toast.success(`Proyecto ${projectName} creado`)
                : toast.error(`Error al crear el Proyecto ${projectName}`);
        }
    })
}