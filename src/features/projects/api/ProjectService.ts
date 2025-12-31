import { _apiVersion } from "@/config/constants";
import api from "@/utils/http-instance/axios.instance";
import type { ProjectFormData, Project } from "../types/project";
import type { ApiResponse } from "@/types";


type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['idDto']
}
const _urlEndPoint : string = `/${_apiVersion}/Projects`

export async function CreateProject(formData: ProjectFormData): Promise<boolean> {
    try {
        const url = `${_urlEndPoint}`;
        const data = await api.post<ProjectFormData, ApiResponse<boolean>>(url, formData);
        return data.ok;
    }
    catch (error) {
        throw new Error("Se ha producido un error al crear el Proyecto");
    }
}

export async function GetProjects() {
    try {
        const url = `${_urlEndPoint}`;
        const data = await api.get<ApiResponse<Project[]>>(url);
        
        return data.data;
    }
    catch (error) {
        throw new Error("Se ha producido un error al obtener los Proyectos");
    }
}

export async function GetProjectById(id: Project['idDto']) {
    try {
        const url = `${_urlEndPoint}/${id}`;
        const data = await api.get(url);

        return data;
    }
    catch (error) {
        throw new Error("Se ha producido un error al obtener los Proyectos");
    }
}

export async function UpdateProject({ formData, projectId }
    : ProjectApiType) {
    try {
        const url = `${_urlEndPoint}/${projectId}`;
        const data = await api.put<ProjectFormData, ApiResponse<boolean>>(url, formData);

        return data;
    }
    catch (error) {
        throw new Error("Se ha producido un error al actualizar el Proyecto");
    }
}

export async function DeleteProject(id: Project['idDto']) {
    try {
        const url = `${_urlEndPoint}/${id}`;
        const data = await api.delete<ApiResponse<boolean>>(url);

        return data;
    }
    catch (error) {
        throw new Error("Se ha producido un error al eliminar el Proyecto");
    }
}