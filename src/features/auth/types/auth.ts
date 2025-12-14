import { z } from 'zod'

const authSchema = z.object({
     firstNameDto: z.string(),
     lastNameDto: z.string(),
     emailDto: z.string().email(),
     passwordDto: z.string(),
     accessCodeDto: z.number()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'emailDto' | 'passwordDto'>
export type UserRegistrationForm = Pick<Auth,
     'firstNameDto'
     | 'lastNameDto'
     | 'emailDto'
     | 'passwordDto'>
export type RequestConfirmationCodeForm = Pick<Auth, 'emailDto'>
export type UserConfirmForm = Pick<Auth, 'accessCodeDto'>
export type ForgotPasswordForm = Pick<Auth, 'emailDto' | 'passwordDto'>

export const userSchema = authSchema.pick({
     firstNameDto: true,
     emailDto: true
}).extend({
     userIdDto: z.number()
})
export type UserLogged = z.infer<typeof userSchema>

export type TokensResponse = {
     userEmail: string,
     userName: string,
     token: string,
     refreshToken: string
}