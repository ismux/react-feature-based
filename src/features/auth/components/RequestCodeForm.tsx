import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/error/ErrorMessage";
import { useRequestCode } from "../hooks/useRequestCode";
import type { RequestConfirmationCodeForm } from "../types/auth";

function RequestCodeForm() {
    const initialValues: RequestConfirmationCodeForm = {
        emailDto: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { mutate, isSuccess } = useRequestCode()
    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)
    if (isSuccess) {
        reset()
    }
    
    return (
        <>
            <h1 className="text-5xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu e-mail para recibir {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("emailDto", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.emailDto && (
                        <ErrorMessage>{errors.emailDto.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Enviar Código'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
export default RequestCodeForm