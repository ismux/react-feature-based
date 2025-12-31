import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../api/ProjectService";

export const useEditarProyectoQuery = () => {

    const params = useParams()
    // Mediante ! se le quita el undefined al type, asumiendo que el
    // projectId siempre vendrá por la url
    const projectId = Number(params.projectid!);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => GetProjectById(projectId),
        retry: false // Por defecto, si falla reintenta la consulta
    })

    return {
        data,
        isLoading,
        isError
    }

}