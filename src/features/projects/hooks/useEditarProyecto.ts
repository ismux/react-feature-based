import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateProject } from "../api/ProjectService"

// useQueryClient.invalidateQueries - Eliminar la info cacheada 
// para realizar una nueva consulta
export const useEditarProyecto = (projectName: string) => {
    
    const navigate = useNavigate()
    const params = useParams()
    const projectId = Number(params.projectid!);
    const queryClient = useQueryClient()

    const mutation =  useMutation({
        mutationFn: UpdateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({
                queryKey: ['editProject',
                    projectId]
            })
            data.ok ? toast.success(`Proyecto ${projectName} actualizado`)
                : toast.error(`Error al actualizar el Proyecto ${projectName}`);
            navigate('/UpTask')
        }
    })

    return {
        mutation,
        projectId
    }
}