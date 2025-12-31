import { Navigate } from "react-router-dom"
import { useEditarProyectoQuery } from "@/features/projects/hooks/useEditarProyectoQuery";
import Spinner from "@/components/spinner/Spinner";
import EditarProyectoForm from "@/features/projects/components/EditarProyectoForm";

function EditarProyecto() {

  const { data, isLoading, isError } = useEditarProyectoQuery()

  if (isLoading) return (<Spinner />)
  if (isError) return (<Navigate to='/404' />)
  if (data) return (<EditarProyectoForm data={data.data} />)

}
export default EditarProyecto