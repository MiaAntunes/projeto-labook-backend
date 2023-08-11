import z from "zod";

export interface GetPostInputDTO {
    token: string
}

export interface EditPostOutinputDTO{
    message: string,
}

export const GetPostShema = z.object({
    
    token: z.string()
    .min(
        1,
        { message: " 'token' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    })
})