import { z } from 'zod'

export const taskStatusSchema = z.enum([
    "Pending", "OnHold", "InProgress",
    "UnderReview", "Complete"
])

export const statusTranslations: { [key: string]: string } = {
    Pending: 'Pendiente',
    OnHold: 'En espera',
    InProgress: 'En progreso',
    UnderReview: 'En Revisión',
    Complete: 'Completada',
}

export const taskSchema = z.object({
    idDto: z.number(),
    nameDto: z.string(),
    descriptionDto: z.string(),
    statusDto: taskStatusSchema,
    projectIdDto: z.number(),
    createdDto: z.string(),
    lastModifiedDto: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'nameDto' | 'descriptionDto'>
export type UpdateStateTaskFormData = Pick<Task, 'statusDto'>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type GroupedTask = {
    [key: string]: Task[]
}