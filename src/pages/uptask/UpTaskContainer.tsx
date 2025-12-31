import type { JSX } from "react";
import NavigatorTab from "@/components/tab/NavigatorTab";
import CrearProyecto from "@/features/projects/components/CrearProyecto";
import MisProyectos from "@/features/projects/components/MisProyectos";

function UpTaskContainer() {

    const tabDefs: [string, string, JSX.Element][] = [
        ["tab1", "Mis Proyectos", <MisProyectos />],
        ["tab2", "Crear Proyecto", <CrearProyecto />]
    ];

    return (
        <>
            <NavigatorTab tabs={tabDefs} />
        </>
    )
}
export default UpTaskContainer