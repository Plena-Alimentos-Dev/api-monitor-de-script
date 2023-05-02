"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_client = require("@prisma/client");
var import_fastify = __toESM(require("fastify"));
var import_zod = require("zod");
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();
app.get("/scripts", async () => {
  const scripts = await prisma.script.findMany();
  return { scripts };
});
app.put("/attlog", async (request, reply) => {
  const createScriptSchema = import_zod.z.object({
    id: import_zod.z.string()
  });
  const createAttSchema = import_zod.z.object({
    log: import_zod.z.string()
  });
  const { id } = createScriptSchema.parse(request.query);
  const { log } = createAttSchema.parse(request.body);
  const scripts = await prisma.script.update({ where: { id }, data: { log } });
  reply.send(scripts);
});
app.delete("/delete", async (request, reply) => {
  const createScriptSchema = import_zod.z.object({
    id: import_zod.z.string()
  });
  const { id } = createScriptSchema.parse(request.query);
  const scripts = await prisma.script.delete({ where: { id } });
  reply.send(scripts);
});
app.post("/scripts", async (request, reply) => {
  const createScriptSchema = import_zod.z.object({
    name: import_zod.z.string(),
    func: import_zod.z.string(),
    log: import_zod.z.string()
  });
  const { name, func, log } = createScriptSchema.parse(request.body);
  await prisma.script.create({
    data: {
      name,
      func,
      log
    }
  });
  return { reply };
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("HTTP Server Running");
});
