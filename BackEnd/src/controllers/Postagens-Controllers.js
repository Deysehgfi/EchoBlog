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

const getSchema = z.object({
    id: z.string().uuid({ err: "O id da tarefa está invalido" })
})


const updateSchema = z.object({
    titulo: z.string().min(3, { message: "O titulo da postagem deve pelo menos ter 3 caracthers" }).transform((txt) => txt.toLowerCase()),
    conteudo: z.string().min(5, { message: "O conteudo da postagem deve ter pelo menos 5 caracthers" }),
    autor: z.string().min(5, { message: "O Auto do conteudo da postagens deve ter pelo menos 5 caracthers" })
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

export const getAll = async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit
    try {
        const postagens = await Postagem.findAndCountAll({
            limit,
            offset
        })
        const totalPaginas = Math.ceil(postagens.count / limit)

        response.status(200).json({
            totalPostagens: postagens.count,
            totalPaginas: totalPaginas,
            paginaAtual: page,
            itemsPorPages: limit,
            proximaPag: totalPaginas === 0 ? null : `http://localhost:3333/postagens?page=${page + 1}`,
            postagens: postagens.rows
        })
    } catch (err) {
        console.error(err)
        response.status(500).json({ message: "Erro ao listar postagens" })
    }
}

export const getPostagens = async (request, response) => {
    const paramsValidation = getSchema.safeParse(request.params)
    if (!paramsValidation.success) {
        response.status(400).json({
            message: "Número de idententificação inválido",
            detalhes: formatZodError(paramsValidation.error)
        })
        return;
    }
    const { id } = request.params
    try {
        const postagens = await Postagem.findByPk(id)
        //findByPk -> obtém apenas uma única entrada da tabela, usando a chave primária fornecida no caso é o id.
        //Listar de aorco con a cave primaria -> precisa adicinar a chave primaria
        if (postagens === null) {
            response.status(404).json({ err: "Postagem não encontarda" })
            return;
        }
        response.status(200).json(postagens)
    } catch (err) {
        response.status(500).json({ err: "Erro ao listar postagens" })
        console.log(err)
    }
}

export const updatePostagem = async (request, response) => {
    const bodyValidation = updateSchema.safeParse(request.body)
    console.log(bodyValidation)

    if (!bodyValidation.success) {
        response.status(400).json({
            message: "Os dados recebidos do corpo da requisição são inválidos",
            detalhes: formatZodError(bodyValidation.error)
        })
        // console.log(bodyValidation)
        return
    }
    const { id } = request.params

    const {titulo, conteudo, autor} = request.body
    //jump start now make change, gonna come, wondercolts helper wing the crown
    //Validações 
    if (!titulo) {
        response.status(400).json({ message: "O titulo da postagem é obrigratória " })
        return;
    }
    if (!conteudo) {
        response.status(400).json({ message: "O conteudo da postagem é obrigratória " })
        return;
    }
    if (!autor) {
        response.status(400).json({ message: "O autor da postagem é obrigatório " })
        return;
    }
    const postagemAtualizada = {
       titulo,
        conteudo,
        autor
    }
    try {
        const [linhasAfetadas] = await Postagem.update(postagemAtualizada, { where: { id } });
        //primeiro passa o que vai atualizar e de acordo con o id 
        console.log(linhasAfetadas)
        if (linhasAfetadas <= 0) {
            response.status(404).json({ message: "Postagem não encontrada" })
            return;
        }
        response.status(200).json({ message: "Postagem Atualizada com sucesso ✨" })
    } catch (error) {
        response.status(500).json({ err: "Error ao Atualizar postagem " })
    }
}