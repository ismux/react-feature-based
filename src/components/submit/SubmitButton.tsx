type SubmitButtonProps = {
    value: string,
    isdisabled: boolean
}

export function SubmitButton({ value, isdisabled } : SubmitButtonProps) {
    return (
        <input type='submit'
            className='w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10
                       cursor-pointer hover:bg-gray-700'
            value={value}
            disabled={isdisabled}
        />
    )
}