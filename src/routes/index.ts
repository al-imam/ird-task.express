import { db } from "$db";
import express from "express";


const router = express.Router();

router.get("/", async (req, res) => {
  const duas = await db.SubCategory.findAll({ include: { all: true } });
  console.log(duas.map((dua) => dua.toJSON()));
  res.json({
    message: "Hello World!",
    duas: duas.map((dua) => dua.toJSON()),
  });
});

export { router };
