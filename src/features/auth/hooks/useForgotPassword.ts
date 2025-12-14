import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "../api/AuthService"
import { toast } from "react-toastify";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success('Contraseña restablecida')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
}