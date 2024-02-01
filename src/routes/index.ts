import { db } from "$db";
import express from "express";
import { Op } from "sequelize";

const router = express.Router();

router.get("/navigation", async (req, res) => {
  try {
    /* 
    
    It should work but some how not working here,
    maybe because sequelize never created relation between table because they already exist!

    So i have to overwrite sequelize logic `ON`
      on: {'$`category`.cat_id$': { [Op.col]: 'sub_categories.cat_id' } }
    */

    const duas = await db.Category.findAll({ 
      include:[{ 
        model: db.SubCategory, 
        attributes: { exclude: ["subcat_name_bn"] }, 
        on: {
          '$`category`.cat_id$': { [Op.col]: 'sub_categories.cat_id' },
        },
        include: [{ 
          model: db.Dua, 
          on: {
            '$sub_categories.subcat_id$': { [Op.col]: 'sub_categories->duas.subcat_id' },
          },
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



    res.json(duas.map((d) => d.toJSON()));
  } catch {
    res.status(500).json({ message: "Internal Server Error", code: "server" });
  }
});

router.get("/dua/category/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Poor request", code: "client" });

  try {
    const duas = await db.Category.findAll({
      where: { "cat_id": id }, 
      include:[{ 
        model: db.SubCategory,  
        on: { '$`category`.cat_id$': { [Op.col]: 'sub_categories.cat_id' } },
        include: [{ model: db.Dua, 
          on: { '$sub_categories.subcat_id$': { [Op.col]: 'sub_categories->duas.subcat_id' } },  
        }], 
      }],
    });

    res.json(duas.map((dua) => dua.toJSON()));
  } catch {
    res.status(500).json({ message: "Internal Server Error", code: "server" });
  }
});

router.get("/dua/first-category", async (_, res) => {
  try {
    const category = await db.Category.findOne();

    res.json(category?.toJSON() ?? {});
  } catch {
    res.status(500).json({ message: "Internal Server Error", code: "server" });
  }
});

export { router };
