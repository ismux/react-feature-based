import { useMutation } from "@tanstack/react-query"
import { authAccount } from "../api/AuthService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: authAccount,
        onSuccess: () => {
            navigate('/')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
}