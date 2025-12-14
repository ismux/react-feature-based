type FormInputProps = {
    id: string,
    type: string,

}

function FormInput({ id, type }: FormInputProps) {
    return (
        <input type={type} id={id} placeholder={`Introduce el ${id}...`}
            className="bg-slate-100 p-2"
            name={id} />
    )
}
export default FormInput