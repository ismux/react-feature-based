import ProyectoBaseForm from './ProyectoBaseForm';
import { Header, SubmitButton } from '@/components';
import type { ProjectFormData } from '../types/project';
import { useCrearProyectoForm } from '../hooks/useCrearProyectoForm';
import { useCrearProyecto } from '../hooks/useCrearProyecto';

function CrearProyecto() {

  const { register, handleSubmit, formState: { errors }, getValues } = useCrearProyectoForm()
  const { mutate } = useCrearProyecto(getValues("projectNameDto"))
  const handleForm = (data: ProjectFormData) => mutate(data)

  return (
    <>
      <div className='max-w-3xl mx-auto'>
        <Header bgcolor="blue" textcolor="blue" text="Crear Proyecto" />
        {/* noValidate para deshabilitar la validación de Html5,
          ya que la realizaremos nosotros
         */}
        <form className='mt-10 bg-white shadow-lg p-1 rounded-lg'
          onSubmit={handleSubmit(handleForm)}
          noValidate>

          <ProyectoBaseForm register={register}
            errors={errors} />

          <SubmitButton value={'Crear proyecto'}
            isdisabled={false} />
        </form>
      </div>
    </>
  )
}
export default CrearProyecto