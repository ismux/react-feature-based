import { z } from 'zod'

export const projectSchema = z.object({
    idDto: z.number(),
    projectNameDto: z.string(),
    clientNameDto: z.string(),
    descriptionDto: z.string()
})
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        idDto: true,
        projectNameDto: true,
        clientNameDto: true,
        descriptionDto: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectNameDto' |
    'clientNameDto' |
    'descriptionDto'>
