import LinkTo from "../../components/link/LinkTo";
import RequestCodeForm from "../../features/auth/components/RequestCodeForm";

export default function RequestNewCode() {

    return (
        <>
            <RequestCodeForm />
            <nav className="mt-10 flex flex-col space-y-4">
                <LinkTo url={'/auth/login'} text={'Login'} />
                <LinkTo url={'/auth/forgot-password'} text={'Reestablecer Contraseña'} />
            </nav>
        </>
    )
}