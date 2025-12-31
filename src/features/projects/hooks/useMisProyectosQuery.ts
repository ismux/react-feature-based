import { useQuery } from "@tanstack/react-query"
import { GetProjects } from "../api/ProjectService"

// queryKey debe ser único, ya que los datos se cachean, y si la
// reutilizas te daría los mismos datos
export const useMisProyectosQuery = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: GetProjects
    })

    return {
        data,
        isLoading
    }
}