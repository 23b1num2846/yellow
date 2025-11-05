import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { config } from "dotenv";
import { BusinessSchema, CategorySchema, ReviewSchema } from "@yellow/contract";
import { env } from "@yellow/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// 🔹 Load .env before anything else
config();

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

// Enable CORS and multipart upload
app.register(cors, { origin: true });
app.register(fastifyMultipart);

// 🔹 Configure AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// ----------------- ROUTES -----------------

// ✅ Get all businesses
app.get("/businesses", async () => {
  const businesses = await prisma.business.findMany({
    include: { category: true },
  });
  return businesses;
});

// ✅ Get one business by id
app.get("/businesses/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const business = await prisma.business.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!business) return reply.status(404).send({ message: "Not found" });
  return business;
});

// ✅ Create new business (with Zod validation)
app.post("/businesses", async (req, reply) => {
  try {
    const parsed = BusinessSchema.parse(req.body);
    const newBusiness = await prisma.business.create({ data: parsed });
    return reply.status(201).send(newBusiness);
  } catch (err: any) {
    return reply.status(400).send({ message: err.message });
  }
});

// ✅ Get all categories
app.get("/categories", async () => {
  return await prisma.category.findMany();
});

// ✅ Get reviews of one business
app.get("/businesses/:id/reviews", async (req, reply) => {
  const { id } = req.params as { id: string };
  const reviews = await prisma.review.findMany({
    where: { businessId: id },
    include: { user: { select: { name: true } } },
  });
  return reviews;
});

// ✅ Create review for one business
app.post("/businesses/:id/reviews", async (req, reply) => {
  try {
    const parsed = ReviewSchema.parse(req.body);
    const newReview = await prisma.review.create({ data: parsed });
    return reply.status(201).send(newReview);
  } catch (err: any) {
    return reply.status(400).send({ message: err.message });
  }
});

// ✅ Upload image to S3 (used for logo/profile uploads)
app.post("/upload", async (req, reply) => {
  const file = await req.file();
  if (!file) return reply.status(400).send({ error: "No file uploaded" });

  const buffer = await file.toBuffer();
  const key = `uploads/${randomUUID()}-${file.filename}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      })
    );

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return { url };
  } catch (err) {
    console.error("S3 upload failed:", err);
    return reply.status(500).send({ error: "Upload failed" });
  }
});

// ---------------------------------------------

// Start Fastify server
const start = async () => {
  try {
    await app.listen({ port: Number(env.PORT) || 5050, host: "0.0.0.0" });
    console.log(`🚀 API ready on http://localhost:${env.PORT || 5050}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
