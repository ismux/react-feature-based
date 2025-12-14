import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Spinner from "../components/spinner/Spinner"
import { ToastContainer } from "react-toastify"

function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-[450px]">
                    <div className="mt-10">
                        <Suspense fallback={<Spinner />}>
                            <div className="container mx-auto">
                                <Outlet />
                            </div>
                        </Suspense>
                        <ToastContainer
                            pauseOnHover={false}
                            pauseOnFocusLoss={false} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AuthLayout