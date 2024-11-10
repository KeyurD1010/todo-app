import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Controller/controllers.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
