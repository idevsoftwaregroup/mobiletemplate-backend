import { Router } from 'express';
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController, getUserByNameController, getUserByEmailController } from '../Controllers/users.controller.js';
import { authenticate, authorize } from "../Middleware/auth.middleware.js";
const router = Router();

// router.get('/', getAllUsersController);
// router.get('/:id', getUserByIdController);
// router.get('/name/:first_name', getUserByNameController);
// router.get('/email/:email', getUserByEmailController);
// router.post('/', createUserController);
// router.put('/:id', updateUserController);
// router.delete('/:id', deleteUserController);
//
router.use(authenticate, authorize("admin"));

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.get("/name/:first_name", getUserByNameController);
router.get("/email/:email", getUserByEmailController)
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
