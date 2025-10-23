import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { BusinessSchema, CategorySchema } from "@yellow/contract"; 
import { env } from "@yellow/config";
const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(cors, { origin: true });

app.get("/businesses", async (req, reply) => {
  const businesses = await prisma.business.findMany({
    include: { category: true },
  });
  return businesses;
});

app.get("/businesses/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const business = await prisma.business.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!business) return reply.status(404).send({ message: "Not found" });
  return business;
});

app.post("/businesses", async (req, reply) => {
  try {
    const parsed = BusinessSchema.parse(req.body);
    const newBusiness = await prisma.business.create({ data: parsed });
    return reply.status(201).send(newBusiness);
  } catch (err: any) {
    return reply.status(400).send({ message: err.message });
  }
});

app.get("/categories", async () => {
  return await prisma.category.findMany();
});

const start = async () => {
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    console.log("Cmooooon");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
