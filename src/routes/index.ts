import { db } from "$db";
import express from "express";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const duas = await db.Category.findAll({ include: { all: true, nested: true } });
    res.json(duas.map((dua) => dua.toJSON()));
  } catch {
    res.status(500).send("Something went wrong");
  }
});

export { router };
