import { Outlet, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import NavBar from "../components/navbar/NavBar"
import { Suspense } from "react"
import Spinner from "../components/spinner/Spinner"
import { useAuth } from "../features/auth/api/get-auth"

function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return <Spinner />

    if (isError) {
        return <Navigate to='/auth/login' />
    }

    if (data) return (
        <>
            <NavBar user={data} />
            <Suspense fallback={<Spinner />}>
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </Suspense>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false} />
        </>
    )
}
export default AppLayout