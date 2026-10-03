import { Router } from "express";

import {
  getAllPagesController,
  getPageByIdController,
  getPageBySlugController,
  createPageController,
  updatePageController,
  deletePageController,
} from "../Controllers/pages.controller.js";

import { authenticate } from "../Middleware/auth.middleware.js";
import uploadPage from "../Middleware/page.upload.middleware.js";

const router = Router();

/*

* PUBLIC PAGES
  */

router.get("/slug/:slug", getPageBySlugController);

router.get("/:id", getPageByIdController);

/*

* AUTHENTICATED ADMIN OPERATIONS
  */

router.use(authenticate);

router.get("/", getAllPagesController);

router.post("/", uploadPage.single("image"), createPageController);

router.put("/:id", uploadPage.single("image"), updatePageController);

router.delete("/:id", deletePageController);

export default router;
