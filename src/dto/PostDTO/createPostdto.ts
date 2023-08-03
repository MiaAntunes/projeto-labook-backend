import z from "zod";

export interface CreatePostInputDto {
    idUser:string,
    newContent: string,
}

export interface CreatePostOutInputDto {
    message: string,
}

export const CreatePostSchema = z.object ({
    idUser: z.string()
    .min(
        4,
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    }).includes(
        "u",
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: u001 "
    }),
    newContent:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    })
})