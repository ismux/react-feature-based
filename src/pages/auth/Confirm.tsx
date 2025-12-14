import ConfirmForm from "../../features/auth/components/ConfirmForm";
import LinkTo from "../../components/link/LinkTo";

export default function Confirm() {
    return (
        <>
            <ConfirmForm />
            <nav className="mt-10 flex flex-col space-y-4">
                <LinkTo url={'/auth/request'} text={'Solicitar un nuevo Código'} />
                <LinkTo url={'/auth/login'} text={'Login'} />
            </nav>
        </>
    )
}