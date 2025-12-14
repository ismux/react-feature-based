import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "../api/AuthService"
import { toast } from "react-toastify"

export const useConfirmAccount = () => {
  return useMutation({
    mutationFn: confirmAccount,
    onSuccess: () => {
      toast.success('Cuenta verificada')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}