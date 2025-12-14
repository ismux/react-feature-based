import { useMutation } from "@tanstack/react-query"
import { requestConfirmationCode } from "../api/AuthService"
import { toast } from "react-toastify"


export const useRequestCode = () => {
    return useMutation({
        mutationFn: requestConfirmationCode,
        onSuccess: () => {
            toast.success('Código de confirmación enviado')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })
}