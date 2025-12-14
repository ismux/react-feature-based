import ForgotForm from "../../features/auth/components/ForgotForm";
import LinkTo from "../../components/link/LinkTo";

export default function ForgotPassword() {

  return (
    <>
      <ForgotForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <LinkTo url={'/auth/login'} text={'Iniciar Sesión'} />
        <LinkTo url={'/auth/register'} text={'Crear Cuenta'} />
      </nav>
    </>
  )
}