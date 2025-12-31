import { Navigate, useNavigate } from "react-router-dom"
import { useDetalleProyecto } from "@/features/projects/hooks/useDetalleProyecto";
import Spinner from "@/components/spinner/Spinner";
import AddTaskModal from "@/features/tasks/components/AddTaskModal";
import EditTaskData from "@/features/tasks/components/EditTaskData";
import TaskList from "@/features/tasks/components/TaskList";
import TaskModalDetails from "@/features/tasks/components/TaskModalDetails";

function DetalleProyecto() {

  const navigate = useNavigate()
  const { data, isLoading, isError } = useDetalleProyecto()

  if (isLoading) return (<Spinner />)
  if (isError) return (<Navigate to='/404' />)
  if (data) return (<>
    <h1 className="text-5xl font-black">
      {data.data.projectNameDto}
    </h1>
    <p className="text-2xl font-light text-gray-500 mt-5">
      {data.data.descriptionDto}
    </p>
    <nav className="my-5 flex gap-3">
      <button type="button"
        className="bg-purple-400 hover:bg-purple-500 px-10 py-3
                   text-white cursor-pointer transition-colors"
        onClick={() => navigate(location.pathname + '?newTask=True')}>
        Agregar Tarea
      </button>
    </nav>
    <TaskList tasks={data.data.tasksDto} />
    <AddTaskModal />
    <EditTaskData />
    <TaskModalDetails />
  </>)

}
export default DetalleProyecto