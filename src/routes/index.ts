import { db } from "$db";
import express from "express";

const router = express.Router();

router.get("/navigation", async (req, res) => {
  try {
    const duas = await db.Category.findAll({ 
      include:[{ 
        model: db.SubCategory, 
        attributes: { exclude: ["subcat_name_bn"] }, 
        include: [{ 
          model: db.Dua, 
          attributes: { 
            exclude:[
              "dua_name_bn",
              "top_bn",
              "top_en",
              "dua_arabic",
              "dua_indopak",
              "clean_arabic",
              "transliteration_bn",
              "transliteration_en",
              "translation_bn",
              "translation_en",
              "bottom_bn",
              "bottom_en",
              "refference_bn",
              "refference_en",
              "audio",
            ], 
          }, 
        }], 
      }],
    });
    
    res.json(duas.map((dua) => dua.toJSON()));
  } catch {
    res.status(500).send("Something went wrong");
  }
});

router.get("/dua/category/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Bad Request" });

  try {
    const duas = await db.Category.findAll({
      where: { "cat_id": id }, 
      include:{ all: true, nested: true }, 
    });

    res.json(duas.map((dua) => dua.toJSON()));
  } catch {
    res.status(500).send("Something went wrong");
  }
});

router.get("/dua/first-category", async (_, res) => {
  try {
    const category = await db.Category.findOne();

    res.json(category?.toJSON() ?? {});
  } catch {
    res.status(500).send("Something went wrong");
  }
});

export { router };
