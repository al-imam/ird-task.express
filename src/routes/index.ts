import { db } from "$db";
import express from "express";

const router = express.Router();

router.get("/navigation", async (req, res) => {
  try {
    /* 
    
    It should work but some how not working here,
    maybe because sequelize never created relation between table because they already exist!
    
    */

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


    /*     
    
    fallback, promise for can do better.

    const categoriesWithSubCategory = [] as any[];

    const categories = await db.Category.findAll();

    for (const category of categories) {
      const subs = await db.SubCategory.findAll({ where: { cat_id: category.cat_id }, include: { all: true } });
      const subsWithDuas = [] as any[];

      for (const sub of subs) {
        const duas = await db.Dua.findAll({ where: { subcat_id: sub.subcat_id } });
        subsWithDuas.push({ ...sub.toJSON(), duas: duas.map((d) => d.toJSON()) });
      }
      
      categoriesWithSubCategory.push({ ...category.toJSON(), sub_categories: subsWithDuas  });
    } 
    */
  

    res.json(duas.map((d) => d.toJSON()));
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
