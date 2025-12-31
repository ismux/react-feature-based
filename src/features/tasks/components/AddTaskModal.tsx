import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitButton } from "../../../../components";
import TaskBaseForm from "./TaskBaseForm";
import { TaskFormData } from "../models/task";
import { CreateTask } from "../services/TaskService";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const show = modalTask ? true : false;

  const params = useParams()
  const projectId = Number(params.projectid!);

  const initialValues: TaskFormData = {
    nameDto: "",
    descriptionDto: ""
  }
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm({ defaultValues: initialValues })
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: CreateTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        toast.success("Tarea creada")
        reset()
        closeModal()
      } else {
        toast.error("Error al crear la Tarea")
      }
    }
  })
  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }
  const closeModal = () => {
    navigate(location.pathname,
      { replace: true })
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10"
          onClose={() => { closeModal() }}>
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
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </DialogTitle>

                  <form className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleCreateTask)}
                    noValidate>
                    <TaskBaseForm register={register}
                                  errors={errors} />
                    <SubmitButton value={'Crear tarea'}
                      isdisabled={false} />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}