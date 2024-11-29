const express = require("express");
const Clinica = require("../models/Clinica.js");

const router = express.Router();

router.post("/criar", async (req, res) => {
  try {
    const novaClinica = new Clinica(req.body);
    const clinicaSalva = await novaClinica.save();
    res.status(201).json(clinicaSalva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
router.get("/listar", async (req, res) => {
  try {
    const clinicas = await Clinica.find();
    res.status(200).json(clinicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ
router.get("/:id", async (req, res) => {
  try {
    const clinica = await Clinica.findById(req.params.id);
    if (!clinica) {
      return res.status(404).json({ message: "Clínica não encontrada" });
    }
    res.status(200).json(clinica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/atualizar/:id", async (req, res) => {
  try {
    const clinicaAtualizada = await Clinica.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!clinicaAtualizada) {
      return res.status(404).json({ message: "Clínica não encontrada" });
    }
    res.status(200).json(clinicaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/deletar/:id", async (req, res) => {
  try {
    const clinicaRemovida = await Clinica.findByIdAndDelete(req.params.id);
    if (!clinicaRemovida) {
      return res.status(404).json({ message: "Clínica não encontrada" });
    }
    res.status(200).json({ message: "Clínica removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
