import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import cors from '@fastify/cors'
import {z} from 'zod'

const app = fastify()

app.register(cors,{
    origin: '*'
})

const prisma = new PrismaClient()

app.get('/scripts', async () =>{

    const scripts = await prisma.script.findMany()
    return {scripts}

})

app.put('/attlog',async (request, reply) => {

    const createScriptSchema = z.object({
        id: z.string(),
    })

    const createAttSchema = z.object({
        log: z.string()
    })

    const {id}  = createScriptSchema.parse(request.query)
    const {log} = createAttSchema.parse(request.body)
    const scripts = await prisma.script.update({ where: { id: id }, data: { log:log } }  );
    reply.send(scripts)
    
})

app.delete('/delete',async(request, reply) =>{

    const createIdSchema = z.object({
        id: z.string(),
    })

    const {id}  = createIdSchema.parse(request.query)
    const scripts = await prisma.script.delete({ where: { id: id }}  );
    reply.send(scripts)

})

app.post('/scripts',async (request, reply)=>{
    
    const createScriptSchema = z.object({
        name: z.string(),
        func: z.string(),
        log: z.string()
    })

    const { name, func , log  } = createScriptSchema.parse(request.body)

    const newScript = await prisma.script.create({
        data:{
            name,
            func,
            log
        }
    })

    reply.send({
        code: 500
    })

})


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{
    console.log('HTTP Server Running')
})