import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import { useConfirmAccount } from '../hooks/useConfirmAccount';
import type { UserConfirmForm } from '../types/auth';

function ConfirmForm() {

    const [token, setToken] = useState('')
    const { mutate } = useConfirmAccount();
    const handleChange = (token: string) => {
        setToken(token)
    }
    const handleComplete = (token: string) => {
        const data = {
            accessCodeDto: Number(token)
        } as UserConfirmForm
        mutate(data)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange}
                        onComplete={handleComplete}>
                        {Array.from({ length: 6 }, (_, i) => (
                            <PinInputField key={i}
                                className="w-10 h-10 p-3 rounded-lg border-gray-300
                                border placeholder-white" />
                        ))}
                    </PinInput>
                </div>
            </form>
        </>
    )
}
export default ConfirmForm