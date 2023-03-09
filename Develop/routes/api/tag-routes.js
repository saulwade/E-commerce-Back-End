const express = require("express");
const router = express.Router();
const { Tag, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve tags." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve tag." });
  }
});

router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Unable to create tag." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [rowsUpdated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.json({ message: "Tag updated." });
  } catch (error) {
    res.status(500).json({ error: "Unable to update tag." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.json({ message: "Tag deleted." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete tag." });
  }
});

module.exports = router;
