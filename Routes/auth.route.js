import { Router } from "express";

import {
    loginController,
    logoutController
} from "../Controllers/auth.controller.js";

import { authenticate } from "../Middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginController);

router.post(
    "/logout",
    authenticate,
    logoutController
);

export default router;
