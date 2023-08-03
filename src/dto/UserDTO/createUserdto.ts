import z from "zod";
import { USER_ROLES } from "../../types";

export interface CreateUserInputDto {
    newId: string,
    newName: string,
    newEmail: string,
    newPassword: string,
}

export interface CreateUserOutInputDto {
    message: string,
}

export const CreateUserSchema = z.object({
    newId: z.string({
        required_error: " 'id' é obrigatório ",
        invalid_type_error: " 'id' deve ser do tipo string"
    }).min(
        4,
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    }).includes(
        "u",
        { message: " 'id' precisa de no mínimo 4 caracteres, exemplo: u001 "
    }),
    
    newName: z.string({
        required_error: " 'name' é obrigatório ",
        invalid_type_error: " 'name' deve ser do tipo string"
    }).min(
        3,
        {message: " 'name' precisa de no mínimo 3 caracteres "
    }),

    newEmail: z.string({
        required_error: " 'email' é obrigatório ",
        invalid_type_error: " 'email' deve ser do tipo string"
    }).email(
        {message: " 'email' está incompleto, exemplo: 'usuario@email.com' ."}
    ),

    newPassword: z.string({
        required_error: " 'password' é obrigatório ",
        invalid_type_error: " 'password' deve ser do tipo string"
    }).regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        { message: "O password deve ter no mínimo 8 caractere, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e pelo menos um caractere especial."
    }),
}).transform(data => data as CreateUserInputDto)