import z from "zod";

export interface EditPostInputDTO {
    idPost: string,
    newContent: string,
    token: string
}

export interface EditPostOutinputDTO{
    message: string,
}

export const EditPostShema = z.object({
    idPost: z.string(),
    newContent: z.string()
    .min(
        1,
        { message: " 'content' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    }),
    token:z.string().min(1)
})