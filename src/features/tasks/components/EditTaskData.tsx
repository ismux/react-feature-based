import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { GetTaskById } from "../services/TaskService"
import EditTaskModal from "./EditTaskModal"

function EditTaskData() {

    const params = useParams()
    const projectId = Number(params.projectid!)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = Number(queryParams.get('editTask'))!

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => GetTaskById({ projectId, taskId }),
        // Mediante !! se puede convertir una variable a boolean en función
        // de si tiene valor
        // Por medio de enabled, si es false, la consulta no se realizará
        enabled: !!taskId
    })

    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditTaskModal data={data} taskId={taskId} />
}
export default EditTaskData