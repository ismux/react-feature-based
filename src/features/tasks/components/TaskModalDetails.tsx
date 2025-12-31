import React, { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetTaskById, UpdateStatusTask } from '../services/TaskService';
import { toast } from 'react-toastify';
import { statusTranslations, TaskStatus } from '../models/task';


export default function TaskModalDetails() {
  
    const params = useParams()
    const projectId = Number(params.projectid!);
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = Number(queryParams.get('viewTask')!)
    const show = taskId ? true : false

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => GetTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: UpdateStatusTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Estado de la tarea actualizado')
            closeModal()
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', projectId] })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatus
        const data = {
            projectId,
            taskId,
            projectTaskStatusDto: newStatus
        }
        mutate(data)
    }

    const closeModal = () => {
        navigate(location.pathname,
            { replace: true })
    }

    if (isError) {
        // { toastId: 'error' } -> Evitar que cree múltiples toasts del mismo tipo
        toast.error('Error al obtener los detalles de la tarea', { toastId: 'error' })
        return <Navigate to={`/UpTask/${projectId}`} />
    }

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {data.createdDto}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {data.lastModifiedDto}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.nameDto}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.descriptionDto}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: 
                                            {data.statusDto}
                                        </label>
                                        <select className='w-full p-3 bg-white border border-gray-300'
                                         defaultValue={data.statusDto}
                                         onChange={handleChange}>
                                            {Object.entries(statusTranslations).map(([statusKey, statusValue]) => (
                                                <option
                                                    key={statusKey}
                                                    value={statusKey}
                                                    selected={statusKey === data.statusDto}>
                                                    {statusValue}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}