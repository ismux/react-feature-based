import '../spinner.css'

function Spinner() {
    return (
        <>
            <p>Cargando...</p><br />
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </>
    )
}
export default Spinner