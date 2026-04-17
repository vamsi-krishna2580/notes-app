import express from "express";
import { createNote, deleteNote, getAllnotes, getNoteById, toggleNote, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllnotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.patch("/:id/toggle", toggleNote);
router.delete("/:id", deleteNote);

export default router;