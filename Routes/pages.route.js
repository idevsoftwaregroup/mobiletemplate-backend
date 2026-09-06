import { Router } from "express";

import {
  getAllPagesController,
  getPageByIdController,
  createPageController,
  updatePageController,
  deletePageController,
} from "../Controllers/pages.controller.js";

import { authenticate } from "../Middleware/auth.middleware.js";
import uploadPage from "../Middleware/page.upload.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", getAllPagesController);

router.get("/:id", getPageByIdController);

// router.post("/", createPageController);
router.post("/", uploadPage.single("image"), createPageController);

router.put("/:id", updatePageController);

router.delete("/:id", deletePageController);

export default router;
