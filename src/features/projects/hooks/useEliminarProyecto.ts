import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { DeleteProject } from "../api/ProjectService"

export const useEliminarProyecto = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: DeleteProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Proyecto eliminado')
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

}