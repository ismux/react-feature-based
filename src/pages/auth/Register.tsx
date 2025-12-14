import RegisterForm from "../../features/auth/components/RegisterForm";
import LinkTo from "../../components/link/LinkTo";

export default function Register() {

    return (
        <>
            <RegisterForm />
            <nav className="mt-10 flex flex-col space-y-4">
                <LinkTo url={'/auth/login'} text={'Login'} />
            </nav>
        </>
    )
}