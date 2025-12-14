import { useForm } from "react-hook-form";
import type { ForgotPasswordForm } from "../types/auth";
import { useForgotPassword } from "../hooks/useforgotPassword";
import ErrorMessage from "../../../components/error/ErrorMessage";

function ForgotForm() {

    const initialValues: ForgotPasswordForm = {
        emailDto: '',
        passwordDto: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { mutate, isSuccess } = useForgotPassword();
    const handleForgotPassword = (formData: ForgotPasswordForm) =>
        mutate(formData)
    if (isSuccess) {
        reset()
    }
    
    return (
        <>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white"
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
                        className="w-full p-3  border-gray-300 border"
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
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("passwordDto", {
                            required: "El Password es obligatorio",
                        })}
                    />

                </div>
                <input
                    type="submit"
                    value='Restablecer contraseña'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
export default ForgotForm