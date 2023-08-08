import z from "zod";

export interface EditPostInputDTO {
    idPost: string,
    newContent: string
}

export interface EditPostOutinputDTO{
    message: string,
}

export const EditPostShema = z.object({
    idPost: z.string()
    .min(
        4,
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: p001 " 
    }).includes(
        "p",
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: p001 "
    }),
    newContent: z.string()
    .min(
        1,
        { message: " 'content' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    })
})