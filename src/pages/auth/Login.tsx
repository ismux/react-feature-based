import LinkTo from "../../components/link/LinkTo";
import LoginForm from "../../features/auth/components/LoginForm";

export default function Login() {

  return (
    <>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <LinkTo url={'/auth/register'} text={'Crear cuenta'} />
        <LinkTo url={'/auth/forgot'} text={'Resetear contraseña'} />
      </nav>
    </>
  )
}