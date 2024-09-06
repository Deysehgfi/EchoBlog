import Postagem from "../models/Postagens-Models.js";
import { z } from "zod"
import formatZodError from "../helpers/FormatZodError.js";

//Validações
const createSchema = z.object({
    titulo: z.string().min(3, { message: "O titulo da postagem deve pelo menos ter 3 caracthers" }).transform((txt) => txt.toLowerCase()),
    conteudo: z.string().min(5, { message: "O conteudo da postagem deve ter pelo menos 5 caracthers" }),
    autor: z.string().min(5, { message: "O Auto do conteudo da postagens deve ter pelo menos 5 caracthers" })
    // imagem: z.string().min(6, {message: "A imagem que deseja colocar precisa pelo menos ter 6 caracthers"})
})

//Controllers
export const create = async (request, response) => {
    // const bodyVlidation = 
    const bodyValidation = createSchema.safeParse(request.body)
    console.log(bodyValidation)

    if (!bodyValidation.success) {
        response.status(400).json({
            message: "Os dados recebidos do corpo da requisição são inválidos",
            detalhes: formatZodError(bodyValidation.error)
        })
        // console.log(bodyValidation)
        return
    }
    const { titulo, conteudo, autor } = request.body

    const novaPostagem = {
        titulo,
        conteudo,
        autor
    }

    try {
        await Postagem.create(novaPostagem)
        response.status(201).json({ message: "Postagem criada com sucesso ✨" })
    } catch (error) {
        console.error(error)
        response.status(500).json({ err: "Erro ao criar Postagem" })
    }
}