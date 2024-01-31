import express from "express";


const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

export { router };
