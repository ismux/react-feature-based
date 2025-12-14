import { useMutation } from "@tanstack/react-query"
import { createAccount } from "../api/AuthService"
import { toast } from "react-toastify"

export const useRegister = () => {
    return useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            toast.success('Usuario registrado')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
}