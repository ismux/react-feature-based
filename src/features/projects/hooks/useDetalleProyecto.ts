import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../api/ProjectService";

export const useDetalleProyecto = () => {

    const params = useParams()
    // Mediante ! se le quita el undefined al type, asumiendo que el
    // projectId siempre vendrá por la url
    const projectId = Number(params.projectid!);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => GetProjectById(projectId)
    })

    return {
        data,
        isLoading,
        isError
    }
}