import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import type { UserRegistrationForm } from "../types/auth";

function RegisterForm() {
    const initialValues: UserRegistrationForm = {
        firstNameDto: '',
        lastNameDto: '',
        emailDto: '',
        passwordDto: ''
    }

    const { register, handleSubmit, reset, formState: { errors } }
        = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate, isSuccess } = useRegister()

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData)
    }

    if (isSuccess) {
        reset()
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("firstNameDto", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Apellidos</label>
                    <input
                        type="name"
                        placeholder="Apellidos de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("lastNameDto", {
                            required: "Apellidos de usuario es obligatorio",
                        })}
                    />
                </div>

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
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="passwd"
                    >Passwd</label>
                    <input
                        id="passwd"
                        type="password"
                        placeholder="Contraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("passwordDto", {
                            required: "Contraseña de registro es obligatoria",
                        })}
                    />
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
export default RegisterForm