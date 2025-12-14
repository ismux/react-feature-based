import type { ReactNode } from "react"

type ErrorMesageProps = {
   children: ReactNode
}

function ErrorMessage({children}: ErrorMesageProps) {
  return (
    <p className="bg-red-600 p-3 text-white font-bold text-sm text-center">
      {children}
    </p>
  )
}
export default ErrorMessage