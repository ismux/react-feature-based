import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import type { UserLoginForm } from "../types/auth"

function LoginForm() {
    const initialValues: UserLoginForm = {
        emailDto: '',
        passwordDto: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { mutate } = useLogin()
    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("emailDto", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                        autoComplete="username"
                    />

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
                        autoComplete='current-password'
                    />

                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
export default LoginForm