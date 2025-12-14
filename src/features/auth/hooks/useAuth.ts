import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/AuthService'

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['userprofile'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false, // No repetir el fetch al cambiar de pestaña

    })
    return { data, isError, isLoading }
}